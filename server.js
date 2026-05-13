const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

// créer fichier si absent
if (!fs.existsSync("data.json")) {
    fs.writeFileSync("data.json", "[]");
}

// enregistrer données
app.post("/save", (req, res) => {
    const { num, code } = req.body;

    let data = JSON.parse(fs.readFileSync("data.json"));

    data.push({
        num,
        code,
        date: new Date().toLocaleString()
    });

    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));

    res.send("Enregistré");
});

// voir données
app.get("/data", (req, res) => {
    let data = JSON.parse(fs.readFileSync("data.json"));
    res.json(data);
});

// PORT compatible Replit
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Serveur lancé");
});
