import app from "./app.js";

const port = process.env.PORT || 3000;

// listener
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
