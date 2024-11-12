const express = require("express");
const app = express();
app.use(express.json());
const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3307,
    user: "root",
    password: "",
    database: "pizza"
});


connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("Kapcsolódva az adatbázishoz.");
});


app.get("/pizza", (req, res) => {
    let sql = "SELECT pazon,pnev,par FROM pizza";
    connection.query(sql, function(err, rows) {
        if (err) {
            console.error(err);
            res.status(500).send("Adatbázis hiba történt.");
            return;
        }
        res.send(rows);
    }); 
});


app.get("/pizza/:id", (req, res) => {
    let id = req.params.id;
    let sql = "SELECT pazon,pnev,par FROM pizza WHERE pazon = ?";
    let sqlParams = [id];
    connection.query(sql, sqlParams, function(err, rows) {
        if (err) {
            console.error(err);
            res.status(500).send("Adatbázis hiba történt.");
            retur
        }
        res.send(rows);
    });
})


app.post("/pizza", (req, res) => {
    let uj = req.body;
    let sql = "INSERT INTO pizza (pazon, pnev, par) VALUES (NULL,?,?)";
    let sqlParams = [uj.pnev, uj.par];
    connection.query(sql, sqlParams, function(err, rows) {
        if (err) {
            console.error(err);
            res.status(500).send("Adatbázis hiba történt.");
            retur
        }
        let lastInsertId = rows.insertId;
        res.status(201).send(lastInsertId, rows.pnev, rows.par);
    });
});


app.put("/pizza/:id", (req, res) => {
    let id = req.params.id;
    let uj = req.body;
    let sql = "UPDATE pizza SET pnev = ?, par = ? WHERE pazon = ?";
    let sqlParams = [uj.pnev, uj.par, id];
    connection.query(sql, sqlParams, function(err, rows) {
        if (err) {
            console.error(err);
            res.status(500).send("Adatbázis hiba történt.");
            retu
        }
        res.status(201).send(rows);
    });
});




app.delete("/pizza/:id", (req, res) => {
    let id = req.params.id;
    let sql = "DELETE FROM pizza WHERE pazon = ?";
    let sqlParams = [id];
    connection.query(sql, sqlParams, function(err, rows) {
        if (err) {
            console.error(err);
            res.status(500).send("Adatbázis hiba történt.");
            retu
        }
        res.status(201).send(rows);
    });
});
app.listen(3000, () => {
    console.log("A Szerver elindult");
});