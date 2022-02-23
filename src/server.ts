import express from 'express';
import { home } from './pages/home';
import { user } from './pages/user';

(async function createServer() {
    const app = express();
    app.use(express.json());

    app.get('/', (req, res) => {
        const { csr } = req.query;
        res.send(home(!!csr));
    });

    app.get('/user/:name', (req, res) => {
        const { csr } = req.query;
        const { name } = req.params;
        res.send(user(name, !!csr));
    });

    app.listen(3000, () => {
        console.info(`Ready to accept connections on port: 3000`);
    });
})();
