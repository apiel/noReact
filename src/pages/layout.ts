import { html } from '../utils';

export function layout(content: string, csr: boolean) {
    return csr
        ? content
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
                          function linker() {
                              [...document.getElementsByTagName('a')].forEach(
                                  (el) =>
                                      (el.onclick = async (ev) => {
                                          ev.preventDefault();
                                          window.history.pushState({}, '', el.href);
                                          const res = await fetch(\`\${el.href}?csr=1\`);
                                          document.getElementById('content').innerHTML =
                                              await res.text();
                                          linker();
                                      }),
                              );
                          }
                          linker();

                          window.onpopstate = async (event) => {
                              const res = await fetch(\`\${document.location}?csr=1\`);
                              document.getElementById('content').innerHTML = await res.text();
                              linker();
                          };
                      </script>
                  </body>
              </html>
          `;
}
