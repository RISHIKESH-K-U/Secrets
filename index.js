import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

var check = false;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

function checker(req, res, next) {
  //Middleware to check password
  const p = req.body["password"];
  if (p == "secrets") {
    check = true;
  }
  next();
}

app.use(checker);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  //Checking whether password is correct
  if (check) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.sendFile(__dirname + "/public/index.html");
  }
});

app.listen(3000, () => {
  //Running program on port 3000
  console.log("Port 3000 running");
});
