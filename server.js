const express = require("express");
const path = require("path");
const  favicon = require('serve-favicon');
const app = express();

app.use('/public', express.static(path.resolve(__dirname, "public")));
app.use('/src', express.static(path.resolve(__dirname, "src")));
app.use(favicon(path.join(__dirname,'public','favicon.ico')))

app.get('/*', (req,res) => {
    res.sendFile(path.resolve("public", "index.html"))
});

app.listen(process.env.PORT || 8060, () => console.log("Server started"));