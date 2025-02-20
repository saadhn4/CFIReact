import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5001;

app.use(express.static(path.join(__dirname, "dist"))); //iske upar dusre backend routes nai likhna

app.get("/", (req, res) => {
  try {
    res.status(200).json({ msg: "Hello world!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

app.get("/saad", (req, res) => {
  try {
    res.status(200).json({ msg: "Hello Saad!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

app.get("/*", (req, res) => {
  //iske niche nai
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Running at ${PORT}`);
});
