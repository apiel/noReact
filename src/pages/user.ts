import { db } from '../db';
import { layout } from './layout';
import { html } from '../utils';

export function user(nameParam: string, csr: boolean) {
    const user = db.find(({ name }) => name === nameParam);

    const content = !user
        ? html`<div>user not found or 404?</div>`
        : html`<div>
              <b>${user.name}</b> (${user.age}) ${user.gender}
          </div>`;
    return layout(content, csr);
}
