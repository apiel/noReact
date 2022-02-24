import { escapeStr, html, js } from '../utils';

export function layout(content: string, csr: boolean) {
    return csr
        ? js`document.getElementById('content').innerHTML = ${escapeStr(content)}`
        : html`
              <!DOCTYPE html>
              <html lang="en">
                  <head>
                      <meta charset="utf-8" />
                      <meta name="viewport" content="width=device-width, initial-scale=1" />
                  </head>

                  <body>
                      <h1>No React / CSR / SSR</h1>
                      <div id="content">${content}</div>
                      <script>
                          // here we could also use webpack or parcel to load a ts script!!
                          // see:
                          // https://github.com/reactivestack/parcel-react-ssr
                          // https://github.com/brillout/parcel-ssr
                          async function getLink(url) {
                            const res = await fetch(\`\${url}?csr=1\`);
                            eval(await res.text());
                            linker();
                          }
                          function linker() {
                              [...document.getElementsByTagName('a')].forEach(
                                  (el) =>
                                      (el.onclick = (ev) => {
                                          ev.preventDefault();
                                          window.history.pushState({}, '', el.href);
                                          getLink(el.href);
                                      }),
                              );
                          }
                          linker();
                          window.onpopstate = () => getLink(document.location);
                      </script>
                  </body>
              </html>
          `;
}
