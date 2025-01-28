import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import fs from "fs";

const filePath = "persons.json";

// Read the JSON file - https://betterstack.com/community/questions/using-node-how-to-read-json/
fs.readFile(filePath, "utf8", (err, data: string) => {
  if (err) {
    console.error("Error reading JSON file:", err);
    return;
  }
  // Parse the JSON data
  try {
    const jsonData: any = JSON.parse(data);
    // Now you have the JSON data in memory
    console.log("JSON Data:", jsonData);
  } catch (parseError) {
    console.error("Error parsing JSON:", parseError);
  }
});

const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/api/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello, World!" });
});
