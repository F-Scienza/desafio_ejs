const express = require ("express")
const app = express()

//  establecemos el motor de plantilla ejs
//  y la carpeta que contiene los .ejs
app.set("views", __dirname + "/views")
app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({
    extended : true
}))

const prodcutos = []

//  establecemos las rutas y el 404
//  le pasamos un objeto a los archivos
app.get("/", (req, res) => {
    res.render("index", { prodcutos })
})  

app.post("/productos", (req, res) => {
    prodcutos.push(req.body)
    res.render("index", { prodcutos })
})  

app.use((req, res, next ) =>{
    res.status(404).render("404", {tutulo: "pagina 404"})
})

app.listen(3000)