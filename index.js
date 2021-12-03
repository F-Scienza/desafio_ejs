const express = require ("express")
const app = express()

//  establecemos el motor de plantilla ejs
//  y la carpeta que contiene los .ejs
app.set("view engine", "ejs")
app.set("views", __dirname + "/views")


//  establecemos las rutas y el 404
//  le pasamos un objeto a los archivos
app.get("/", (req, res) => {
    res.render("index", { titulo: "inicio ejs" })
})  

app.get("/personas", (req, res) => {
    res.render("personas", { titulo: "personas ejs" })
})  

app.use((req, res, next ) =>{
    res.status(404).render("404", {tutulo: "pagina 404"})
})

app.listen(3000)