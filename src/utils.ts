// Define fake html lit-html
// import { html } from 'lit-html';
// https://lit.dev/docs/libraries/standalone-templates/
// or could use /* html */
export const html = (strings: TemplateStringsArray, ...values: any[]) => {
    return strings.flatMap((str, i) => [str, values[i] ?? '']).join('');
};

export const js = html;

export const escapeStr = (value: string) => '`' + value.replace(/(["'`])/g, "\\$1") + '`';
