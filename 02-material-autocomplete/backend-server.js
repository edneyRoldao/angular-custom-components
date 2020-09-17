const LIST = [
    { name: 'dracoo', lastName: 'Potter'},
    { name: 'Thor', lastName: 'Asgard'},
    { name: 'Iron', lastName: 'Man'},
    { name: 'Doctor', lastName: 'Strange'},
    { name: 'Spider', lastName: 'Man'},
    { name: 'draco', lastName: 'Potter'},
    { name: 'Thor', lastName: 'Asgard'},
    { name: 'Iron', lastName: 'Man'},
    { name: 'Doctor', lastName: 'Strange'},
    { name: 'Spider', lastName: 'Man'},
    { name: 'dracoo', lastName: 'Potter'},
    { name: 'Thor', lastName: 'Asgard'},
    { name: 'Iron', lastName: 'Man'},
    { name: 'Doctor', lastName: 'Strange'},
    { name: 'Spider', lastName: 'Man'},
    { name: 'draco', lastName: 'Potter'},
    { name: 'Thor', lastName: 'Asgard'},
    { name: 'Iron', lastName: 'Man'},
    { name: 'Doctor', lastName: 'Strange'},
    { name: 'Spider', lastName: 'Man'},
    { name: 'dracoo', lastName: 'Potter'},
    { name: 'Thor', lastName: 'Asgard'},
    { name: 'Iron', lastName: 'Man'},
    { name: 'Doctor', lastName: 'Strange'},
    { name: 'Spider', lastName: 'Man'},
    { name: 'dracoo', lastName: 'Potter'},
    { name: 'Thor', lastName: 'Asgard'},
    { name: 'Iron', lastName: 'Man'},
    { name: 'Doctor', lastName: 'Strange'},
    { name: 'Spider', lastName: 'Man'},
    { name: 'draco', lastName: 'Potter'},
    { name: 'Thor', lastName: 'Asgard'},
    { name: 'Iron', lastName: 'Man'},
    { name: 'Doctor', lastName: 'Strange'},
    { name: 'Spider', lastName: 'Man'}
];

const express = require("express");

const app = express();

app.use(express.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", '*');
    next();
})

app.get("/animais", (req, res) => {
    const field = req.query.field;
    const value = req.query.value;

    if (!!field && !!value) {
        const filtered = LIST.filter(a => a[field].toLowerCase().includes(value.toLowerCase()));
        return res.status(200).json(filtered);
    }

    res.status(200).json(LIST);
});

app.listen(3030, () => {
    console.log('pedidos api executando na  porta: 3030');
});
