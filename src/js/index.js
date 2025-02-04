import { createParser } from "./generate-dom2.js";
import { measure, runAfterFramePaint } from "./measure.js";

let openFirstChunks;
let throttleTimer;
let finished = false;
const textDecoder = new TextDecoder();
const parser = createParser();
const fileNameBlock = document.getElementById("filename");
const image = new Image();
image.src = "./tae.gif";
let height = window.innerHeight;
const worker = new Worker(new URL("./worker.js", import.meta.url), {
  type: "module",
});

const throttle = (callback, time) => {
  if (throttleTimer) return;
  throttleTimer = true;
  setTimeout(() => {
    callback();
    throttleTimer = false;
  }, time);
};

const handleInfiniteScroll = (callback) => {
  const endOfPage =
    window.innerHeight + window.scrollY >= document.body.offsetHeight;

  if (endOfPage) {
    throttle(() => callback(), 10);
  }
};

document.addEventListener("resize", () => {
  height = window.innerHeight;
});

document.addEventListener("DOMContentLoaded", function () {
  const errorBlock = document.getElementById("error");
  if (this.location.hash === "#error") {
    errorBlock.style.display = "block";
    this.location.hash = "";
  }

  const inputFile = document.getElementById("arquivo");

  inputFile.addEventListener("change", function (e) {
    openFirstChunks = measure("Time to paint first chunk", {
      willAlert: false,
    });

    /** @type {File} */
    let file = e.target.files[0];

    streamToText(file);
  });

  async function readOne(stream, length = 3000) {
    const { done, value } = await stream.read(new Uint8Array(length));
    const text = textDecoder.decode(value);
    parser(text, done, height);
    return done;
  }

  const streamToText = async (file) => {
    const blob = file.stream();
    const readableStream = await blob.getReader({ mode: "byob" });
    const { done, value } = await readableStream.read(new Uint8Array(1500));
    const text = textDecoder.decode(value);

    fileNameBlock.appendChild(document.createTextNode(file.name));
    parser(text, done, height);

    runAfterFramePaint(async () => {
      openFirstChunks.finish();
      window.addEventListener("scroll", () =>
        handleInfiniteScroll(async () => {
          if (!finished) {
            let done = await readOne(readableStream);
            finished = done;
          }
        })
      );

      worker.postMessage(file);
      worker.onmessage = function (e) {
        if (e.data === false) {
          location.hash = "error";
          location.reload();
        }
      };
    });
  };
});
