import fs from "fs";

function createFolder(folder) {
    if (!folderExists(folder)) {
        fs.mkdirSync(`./${folder}`, (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
}

function folderExists(folder) {
    if (fs.existsSync(`./${folder}`)) {
        return true;
    } else {
        return false;
    }
}

function readFile(folder, file) {
    const data = fs.readFileSync(`./${folder}/${file}.json`, (err) => {
        if (err) {
            console.log(err);
        }
    });
    return data;

}

function writeToFile(folder, data) {
    const files = fs.readdirSync(`./${folder}`);
    const latest = files.length
    fs.writeFileSync(`./${folder}/${latest}.json`, JSON.stringify(data), (err) => {
        if (err) {
            console.log(err);
        }
    });
}

function authentication(req, AUTH) {
    const auth = req.headers.authorization;
    if (auth === AUTH) {
        return true;
    } else {
        throw new Error("Authentication failed!");
    }
}

export {
    createFolder,
    writeToFile,
    authentication,
    readFile
}