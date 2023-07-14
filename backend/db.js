const mongoose = require("mongoose");

module.exports = () =>{
    const connectionParams = {
        useNewUrlParser : true,
        useUnifiedTopology: true,
    };
    try {
        mongoose.connect(process.env.DB,connectionParams)
        console.log("MongoDB Connected");
        console.log(`${process.env.DB}`);
    } catch (error) {
        console.log(error);

    }
}