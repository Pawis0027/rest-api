import express, { json } from "express"
import { moviesRouter } from "./web/routes/movies.js"
import { corsMiddleware } from "./middlewares/cors.js"
const app = express()
app.disable("x-powered-by")     
app.use(json())
// ---------------------------------------------
app.use(corsMiddleware({acceptedOrigins: ["http://localhost:8080", "http://localhost:1234", "http://localhost:10000"]}));
// app.use(corsMiddleware());
app.get("/", (req,res)=>{
    res.json({message: "hola mundo"})
}) 
app.use("/movies", moviesRouter)
app.use((req,res)=>{
    res.status(404).send("<h1>Error 404 por no encontrar la url</h1>")
})
const PORT = process.env.PORT ?? 1234
app.listen(PORT, ()=>{
    console.log(`escuchando en puerto http://localhost:${PORT}`)
})