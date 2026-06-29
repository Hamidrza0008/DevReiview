require("dotenv").config();
const cors = require("cors")
const connectDB = require("./config/db");
const express = require("express");
const authRoutes = require("./routes/auth.routes");


const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", authRoutes);

app.get("/" , (req , res) => {
    res.send("DevReview Backend Running 🚀");
})



app.listen(PORT , () => console.log(`Server running on port ${PORT}`));