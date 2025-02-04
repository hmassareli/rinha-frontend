onmessage = async function (e) {
  try {
    /** @type {File}  */
    const file = e.data;

    const stream = file.stream();
    const reader = stream.getReader();
    let acc = "";

    while (true) {
      const { done, value } = await reader.read();
      const text = new TextDecoder().decode(value);

      acc += text;

      if (done) break;
    }

    JSON.parse(acc);

    postMessage(true);
  } catch (e) {
    postMessage(false);
  }
};
