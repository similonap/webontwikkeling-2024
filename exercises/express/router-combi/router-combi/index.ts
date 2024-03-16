import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import { newspaperRouter } from "./routers/newspaperRouter";
import { mathRouter } from "./routers/mathRouter";
import { contactRouter } from "./routers/contactRouter";
dotenv.config();

const app : Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.set("port", process.env.PORT || 3000);

app.use("/newspaper", newspaperRouter());
app.use("/math", mathRouter());
app.use("/contact", contactRouter());

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(app.get("port"), () => {
    console.log("Server started on http://localhost:" + app.get('port'));
});