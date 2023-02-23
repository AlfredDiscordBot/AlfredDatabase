import express from "express";
import dotenv from "dotenv";
import fs from "fs";


const app = express();
const AUTH = process.env.AUTH;
app.use(express.json());
dotenv.config()

app.get("/", (req, res) => {
    res.send({"message": "Alfred's database is up and running!"})
});

app.post("/update/:folder", (req, res) => {
    if (req.body.auth === AUTH) {
        const folder = req.params.folder;
        if (!(fs.existsSync(`./${folder}`))) {
            fs.mkdirSync(`./${folder}`, { recursive: true }, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
        data = {
            'content': req.body.content,
            'created_at': new Date().getUTCSeconds(),
        }
        const files = fs.readdirSync(`./${folder}`);
        const latest = files.length
        fs.writeFileSync(`./${folder}/${latest}.json`, JSON.stringify(data), (err) => {
            if (err) {
                console.log(err);
            }
        });
        res.send({"message": "Data updated!"})
    } else {
        res.send({"message": "Authentication failed!"})
    }

});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});