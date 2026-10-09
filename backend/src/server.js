import app from './app.js';

const port = 4000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});