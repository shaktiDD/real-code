const express = require('express');
const cors = require('cors')
const connectdb = require("./config/db");
const authRoute = require("./routes/authRoute");
const runRoute = require("./routes/runRoute");
const app = express();
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.send("backend running successfully");
})

app.use("/api/auth", authRoute);
app.use("/api/v1/",runRoute)

const runserver = ()=>{
    app.listen(3000, () => console.log("Server is running on port 3000"));
    connectdb()
}
// app.listen(3001, () => console.log("Server is running on port 3001"));
// connectdb()
module.exports = runserver;

