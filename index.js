const express = require('express');
const Contenedor = require('./contenedor');
const multer = require('multer')
const { Router } = express;

const app = express();
app.use(express.json())
app.use(express.urlencoded({
	extended: true
}))

// 	seteamos la carpeta views y el engine 
app.set('views', './views')
app.set('view engine', 'ejs')

const router = Router();
const productos = new Contenedor(__dirname + "/data/productos.json")
productos.init()

// seteamos el file con multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })
app.use('/files', express.static('uploads'))

router.get("/", (req, res)=>{
    return res.json(productos.productList);
})
router.get("/:id", async (req, res) => {
    let id = req.params.id //leemos lo que pasó por url el usuario
	return res.json(await productos.getById(id));
});	

//	usamos multer para guardar las imagenes 
router.post("/", upload.single('thumbnail') ,async(req, res) => {
	let obj = req.body;	
	obj.thumbnail = "/files/" + req.file.filename 
	await productos.addProduct(obj) // usamos el metodo save
	return res.redirect("/productList"); //redireccionamos a lista
});

router.put("/:id", (req, res) => {
	let obj = req.body;
	let id = req.params.id;
	return res.json(productos.update(id, obj));
});

app.use("/api/productos/", router)

//	mostramos el formulario
app.get("/", (req, res)=> {
    return res.render('form')
})

// 	publicamos la carpeta upload
app.use(express.static('uploads'))
app.use(express.static(__dirname + '/public'))

app.get("/productList", (req, res)=> {
    return res.render('productList.ejs', {
		productos: productos.productList
	})
})

app.listen(8080)