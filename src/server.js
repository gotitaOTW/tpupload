import express from 'express';
import cors from 'cors';
import router from './controllers/UserController.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('', (req, res) => {
  res.send('API funcionando');
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
