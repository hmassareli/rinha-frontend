(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))f(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&f(o)}).observe(document,{childList:!0,subtree:!0});function l(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function f(i){if(i.ep)return;i.ep=!0;const s=l(i);fetch(i.href,s)}})();const p=(e,n)=>{const l=document.createElement("span");return l.classList.add(n),l.innerText=e,l},c=e=>p(e,"string"),D=e=>p(e,"key"),m=e=>p(e,"array-key"),N=p("[","orange"),P=p("]","orange"),j=p(":","colon");p("","tab");const O=p(`
`,"break");p("null","string");const H=document.createElement("div");H.className="tab-img";function U(e,{willAlert:n=!1}){const l=performance.now();return{finish:()=>{const f=performance.now()-l;console.log(`${e}: ${f}ms`)}}}function L(e){requestAnimationFrame(()=>{const n=new MessageChannel;n.port1.onmessage=e,n.port2.postMessage(void 0)})}const M=()=>{let e={partialValue:"",isAfterColon:!1,isInsideUnicode:!1,isInsideEscape:!1,isInsideString:!1,isInsideNumber:!1,isInsideBooleanOrNull:!1,accumulatedUnicode:"",accumulatedString:"",accumulatedNumber:"",accumulatedBooleanOrNull:"",scopes:[],isFirstChunk:!0},n=document.createDocumentFragment();const l=document.getElementById("output"),f=document.getElementById("index"),i=document.getElementById("error"),s=[];function o(){const a=document.createElement("div");a.className="line",a.appendChild(n),n=document.createDocumentFragment();const d=h(e.scopes)*20;return a.style.gridTemplateColumns=`${d}px auto`,s.push(a),a}function r(a){const d=a.cloneNode(!0);n.appendChild(d)}function h(a){var u;const y=((u=a[0])==null?void 0:u.type)==="object"?1:0;return a.length-y}return(a,d,y)=>{var S,B,w;let u=0,v=y/30;for(a=e.partialValue+a;u<a.length;){let t=a[u];if(e.isInsideEscape){t==="\\"||t==='"'?(e.isInsideEscape=!1,e.accumulatedString+=t):t==="u"?(e.isInsideEscape=!1,e.isInsideUnicode=!0,e.accumulatedUnicode=""):(e.isInsideEscape=!1,e.accumulatedString+="\\"+t),u++;continue}if(e.isInsideUnicode){const g=t.charCodeAt(0);if(g>=48&&g<=57||g>=65&&g<=70||g>=97&&g<=102){e.accumulatedUnicode+=t,e.accumulatedUnicode.length===4&&(e.isInsideUnicode=!1,e.accumulatedString+=String.fromCharCode(parseInt(e.accumulatedUnicode,16))),u++;continue}else e.isInsideUnicode=!1,e.accumulatedString+="\\u"+e.accumulatedUnicode}if(t==="{"?e.isInsideString||(e.isAfterColon=!1,((S=e.scopes.at(-1))==null?void 0:S.type)==="array"&&n.appendChild(m(e.scopes.at(-1).index+": ")),o(),e.scopes.push({type:"object",index:0})):t==="["?(e.isInsideString||(e.scopes.length===0?r(N):((B=e.scopes.at(-1))==null?void 0:B.type)==="object"?(r(N),r(O)):((w=e.scopes.at(-1))==null?void 0:w.type)==="array"&&(n.appendChild(m(e.scopes.at(-1).index+": ")),r(N),r(O)),o()),e.scopes.push({type:"array",index:0})):t==="}"?e.isInsideString||(e.isAfterColon=!1,e.isInsideNumber&&(n.appendChild(c(e.accumulatedNumber)),e.accumulatedNumber="",e.isInsideNumber=!1),e.isInsideBooleanOrNull&&(n.appendChild(c(e.accumulatedBooleanOrNull)),e.accumulatedBooleanOrNull="",e.isInsideBooleanOrNull=!1),o(),e.scopes.pop()):t==="]"?e.isInsideString||(e.isAfterColon=!1,e.isInsideBooleanOrNull&&(n.appendChild(m(e.scopes.at(-1).index+": ")),n.appendChild(c(e.accumulatedBooleanOrNull)),e.accumulatedBooleanOrNull="",e.isInsideBooleanOrNull=!1),e.isInsideNumber&&(n.appendChild(m(e.scopes.at(-1).index+": ")),n.appendChild(c(e.accumulatedNumber)),e.accumulatedNumber="",e.isInsideNumber=!1),o(),r(P),e.scopes.pop()):t==="\\"?e.isInsideEscape=!0:t===":"?(e.isAfterColon=!0,e.isInsideString||r(j)):t===","?e.isInsideString?e.accumulatedString+=t:(e.isAfterColon=!1,e.isInsideNumber&&(e.scopes.at(-1).type==="array"?(n.appendChild(m(e.scopes.at(-1).index+": ")),n.appendChild(c(e.accumulatedNumber))):e.scopes.at(-1).type==="object"&&n.appendChild(c(e.accumulatedNumber)),e.accumulatedNumber="",e.isInsideNumber=!1),e.isInsideBooleanOrNull&&(e.scopes.at(-1).type==="array"&&n.appendChild(m(e.scopes.at(-1).index+": ")),n.appendChild(c(e.accumulatedBooleanOrNull)),e.accumulatedBooleanOrNull="",e.isInsideBooleanOrNull=!1),e.scopes.at(-1).type==="array"&&e.scopes.at(-1).index++,o()):t==='"'?(e.isInsideString=!e.isInsideString,e.isInsideString?e.accumulatedString="":e.isInsideString||(e.scopes.at(-1).type==="object"&&(e.isAfterColon?n.appendChild(c('"'+e.accumulatedString+'"')):n.appendChild(D(e.accumulatedString))),e.scopes.at(-1).type==="array"&&(n.appendChild(m(e.scopes.at(-1).index+": ")),n.appendChild(c('"'+e.accumulatedString+'"'))),e.accumulatedString="")):t===" "||t===`
`||t==="\r"||t==="	"?e.isInsideString&&(e.accumulatedString+=t):e.isInsideString?e.accumulatedString+=t:!isNaN(Number(t))||t==="-"||t==="."||t==="+"||t==="e"||t==="E"?!e.isInsideString&&!e.isInsideBooleanOrNull?(e.isInsideNumber=!0,e.accumulatedNumber+=t):e.isInsideBooleanOrNull&&(e.accumulatedBooleanOrNull+=t):!e.isInsideNumber&&!e.isInsideString&&(e.isInsideBooleanOrNull=!0,e.accumulatedBooleanOrNull+=t),s.length>=v+5&&e.isFirstChunk){e.partialValue=a.slice(u+1);break}else e.partialValue="";u++}e.isFirstChunk&&(f.style.display="none",i.style.display="none"),e.isFirstChunk=!1;const F=U("tempo pra jogar na tela:",{willAlert:!1}),C=document.createDocumentFragment();for(let t=0;t<s.length;t++)C.appendChild(s[t]);if(l.appendChild(C),s.length=0,d){o();for(let t=0;t<s.length;t++)l.appendChild(s[t])}L(()=>{F.finish()})}};let E,I,A=!1;const T=new TextDecoder,k=M(),V=document.getElementById("filename"),q=new Image;q.src="./tae.gif";let b=window.innerHeight;const x=new Worker(new URL(""+new URL("worker-971688e3.js",import.meta.url).href,self.location),{type:"module"}),K=(e,n)=>{I||(I=!0,setTimeout(()=>{e(),I=!1},n))},R=e=>{window.innerHeight+window.scrollY>=document.body.offsetHeight&&K(()=>e(),10)};document.addEventListener("resize",()=>{b=window.innerHeight});document.addEventListener("DOMContentLoaded",function(){const e=document.getElementById("error");this.location.hash==="#error"&&(e.style.display="block",this.location.hash=""),document.getElementById("arquivo").addEventListener("change",function(i){E=U("Time to paint first chunk",{willAlert:!1});let s=i.target.files[0];f(s)});async function l(i,s=3e3){const{done:o,value:r}=await i.read(new Uint8Array(s)),h=T.decode(r);return k(h,o,b),o}const f=async i=>{const o=await i.stream().getReader({mode:"byob"}),{done:r,value:h}=await o.read(new Uint8Array(1500)),a=T.decode(h);V.appendChild(document.createTextNode(i.name)),k(a,r,b),L(async()=>{E.finish(),window.addEventListener("scroll",()=>R(async()=>{A||(A=await l(o))})),x.postMessage(i),x.onmessage=function(d){d.data===!1&&(location.hash="error",location.reload())}})}});
