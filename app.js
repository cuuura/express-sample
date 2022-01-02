const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const app = express();
const http = require("http");
const bodyParser = require("body-parser");

const host = "0.0.0.0";
const port = 3000;

// 템플릿 엔진
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views")); // 디폴트 view 경로세팅 app.use(expressLayouts);
app.set(expressLayouts);
// const posts = [

//     {
//         id: 1,
//         author: 'John',
//         title: 'Templating with pug',
//         body: 'Blog post 1'
//     },

//     {
//         id: 2,
//         author: 'Peter',
//         title: 'React: Starting from the Bottom',
//         body: 'Blog post 2'
//     },

//     {
//         id: 3,
//         author: 'Violet',
//         title: 'Node.js Streams',
//         body: 'Blog post 3'
//     },

//     {
//         id: 4,
//         author: 'Condy',
//         title: 'Node.js Events',
//         body: 'Blog post 4'
//     }

// ]

app.get("/", (req, res) => {
    res.render("index", {title: "Express"});
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

// var birds = require('./routes/birds');

app.use("/", require("./routes"));

// app.use(function (err, req, res, next) {...});
app.use((err, req, res, next) => {
    // 오류 핸들러
});

http.createServer(app).listen(port, host, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
