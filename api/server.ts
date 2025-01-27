import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello, World!' });
});
