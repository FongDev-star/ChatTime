import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import messagesRoutes from './routes/message.route.js';
import path from "path"

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();


app.use("/api/auth/", authRoutes);
app.use("/api/message/", messagesRoutes);

// make ready for deployment
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")))
  app.get("*", (req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
  })

}



app.listen(PORT,() => {
  console.log('Server is running on port: ' + PORT);
});