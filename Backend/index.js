const express = require("express");
const { connection } = require("mongoose");
const { userRouter } = require("./Routes/UserRoutes");
const app = express();
app.use(express.json())
const cors = require('cors')
app.use(cors())

app.get("/", (req, res) => {
    res.send("welcome to homepage")
})


app.use("/user", userRouter)









app.listen(8080, async()=> {
try {
    await connection
    console.log("connect to dataBase")
} catch (error) {
console.log("something went wrong")
    }
    console.log("server running on port 8080")
})