import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Deu bom' });
});

app.listen(3333, () => {
  console.log('server start in port 33333');
});
