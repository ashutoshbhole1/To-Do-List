const app = require("./Src/app");
const connectDB = require("./Src/db/db");

connectDB();
app.listen(3000,()=>{
    console.log("Server is running in port 3000");
})

