// usage: node grab.mjs <port> <outfile> <needle>
// needle（自分のプロンプトの一部）を含む ChatGPT タブだけを対象に、最後の Generated image を保存する。
// 同じ Chrome を別セッションが使っていても、相手の画像を取り違えない。
import fs from 'node:fs';
const [port, out, needle] = process.argv.slice(2);
const tabs = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).filter(t => t.type === 'page' && t.url.includes('chatgpt.com'));
const evalIn = async (tab, expression) => {
  const ws = new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener('open', r));
  ws.send(JSON.stringify({ id: 1, method: 'Runtime.evaluate', params: { expression, awaitPromise: true, returnByValue: true } }));
  const msg = await new Promise(r => ws.addEventListener('message', e => r(JSON.parse(e.data))));
  ws.close();
  return msg.result?.result?.value;
};
const N = JSON.stringify(needle);
for (const tab of tabs) {
  const v = await evalIn(tab, `(async () => {
    const norm = t => t.replace(/\s+/g, ' ');
    if (!norm(document.body.innerText).includes(norm(${N}))) return 'NOTMINE';
    if (document.querySelector('[data-testid="stop-button"]')) return 'BUSY';
    const imgs = [...document.querySelectorAll('img[alt^="Generated image"]')].filter(i => i.complete && i.naturalWidth > 500);
    if (!imgs.length) return 'NONE';
    const b = await (await fetch(imgs[imgs.length-1].src)).blob();
    const buf = new Uint8Array(await b.arrayBuffer());
    let s = ''; for (let i = 0; i < buf.length; i += 0x8000) s += String.fromCharCode(...buf.subarray(i, i + 0x8000));
    return btoa(s);
  })()`);
  if (v === 'NOTMINE') continue;
  if (!v || v === 'BUSY' || v === 'NONE') { console.log(v || 'ERR'); process.exit(1); }
  fs.writeFileSync(out, Buffer.from(v, 'base64')); console.log('saved', out); process.exit(0);
}
console.log('NOTFOUND'); process.exit(1);
