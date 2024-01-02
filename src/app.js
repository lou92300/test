import express from "express"
import path from "path"

const app = express()
const PORT = 3000;
app.use(express.urlencoded({ extended: true }));


app.set("view engine","ejs")
app.set("views",path.join(process.cwd(),"/src/views"))
console.log(path.join(process.cwd()))



app.get("/home", (req,res)=>{
    res.render("pages/home")
});
app.post("/blog", (req, res) => {
    console.log(req.body.author); 
    res.render("pages/blog")   

})

app.listen(PORT,()=>{
    console.log(`the serveur is running on port http://localhost:${PORT}`)
});



