import express from "express";
import dotenv from "dotenv";

import { 
    writeToFile, 
    authentication, 
    createFolder 
} from "./utilities/functions.js";


const app = express();
app.use(express.json());
dotenv.config()

app.get("/", (req, res) => {
    res.send({"message": "Alfred's database is up and running!"})
});

app.post("/update/:folder", (req, res) => {
    try {
        const folder = req.params.folder;
        authentication();
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

app.get("/get/:folder", (req, res) => {
    try {
        authentication();
        const folder = req.params.folder;
        const files = fs.readdirSync(`./${folder}`);
        const latest = files.length - 1;
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