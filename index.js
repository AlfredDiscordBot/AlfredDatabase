import express from "express";
import dotenv from "dotenv";

import { 
    writeToFile, 
    authentication, 
    createFolder 
} from "./utilities/functions.js";

dotenv.config()
const AUTH = process.env.AUTH;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send({"message": "Alfred's database is up and running!"})
});

app.post("/update/:folder", (req, res) => {
    try {
        const folder = "folder_" + req.params.folder;
        authentication(req, AUTH);
        createFolder(folder);
        data = {
            'content': req.body.content,
            'created_at': new Date().getUTCSeconds(),
        }
        writeToFile(folder, data)
        res.send({"message": "Data updated!"})
    } catch (err) {
        res.send({"message": err.message})
    }

});

app.get("/create/:folder/", (req, res) => {
    try {
        authentication(req, AUTH);
        const folder = "folder_" + req.params.folder;
        createFolder(folder);
        res.send({"message": "Folder created!"});
    } catch (err) {
        res.send({"message": err.message})
    }
});

app.get("/get/:folder/:index", (req, res) => {
    try {
        authentication(req, AUTH);
        const folder = "folder_" + req.params.folder;
        const files = fs.readdirSync(`./${folder}`);
        const latest = (index === undefined) ? files.length - 1: index;
        if (latest < 0) {
            throw new Error("No data found!");
        } else if (!folderExists(folder)) {
            throw new Error("Folder not found!");
        }
        const data = readFile(folder, latest);
        res.send(data);

    } catch (err) {
        res.send({"message": err.message})
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});