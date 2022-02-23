import { db } from '../db';
import { layout } from './layout';
import { html } from '../utils';

export function home(csr: boolean) {
    const content = db
        .map(
            ({ name }) => html`<div>
                <a href="/user/${name}">${name}</a>
            </div>`,
        )
        .join('');
    return layout(content, csr);
}
