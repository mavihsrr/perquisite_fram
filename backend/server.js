const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const bookRoutes = require("./routes/book")
require("dotenv").config()
const app = express()

//db connect
const connectionParams = { useNewUrlParser: true }
mongoose.connect(process.env.DB, connectionParams)

mongoose.connection.on("connected", () => {
    console.log("connected to database")
})

mongoose.connection.on("error", (err) => {
    console.log("error while connecting to DB");
})

mongoose.connection.on("disconnected", ()=>{
    console.log("Mongodb disconnected")
})

app.use(express.json())
app.use(cors())

app.use("/api", bookRoutes)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listending on port ${port}`))