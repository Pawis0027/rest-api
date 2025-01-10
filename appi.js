const express = require("express")
const app = express()
app.disable("x-powered-by")     
app.use(express.json())
const movies = require("./movies.json")
const crypto = require("node:crypto")
const { error } = require("node:console")
const {validateMovie} = require("./zod")
const {validatePartialMovie} = require("./zod")
const ACCEPTED_ORIGINS =[
    "http://localhost:8080",
    "http://localhost:1234"
]
app.use((req, res, next) => {
    const origin = req.header("origin");
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header("Access-Control-Allow-Origin", origin);
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }
    if (req.method === "OPTIONS") {
        return res.sendStatus(200); // Responde a las solicitudes preflight
    }
    next();
});

app.get("/", (req,res)=>{
    res.json({message: "hola mundo"})
}) 
// todos los recursos que sean movies 
app.get("/movies", (req, res) => {
    const { genre } = req.query;
    if (genre) {
        const filteredMovies = movies.filter(movie =>
            movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        );
        return res.json(filteredMovies);
    }
    res.json(movies);
});

app.get("/movies/:id", (req,res)=>{ //path-to-regexp
    const {id} = req.params
    const movie = movies.find(movie => movie.id == id)
    if(movie) return res.json(movie)
    res.status(404).json({message: "movie not found"})
}) 

app.post("/movies", (req,res) =>{
    const result = validateMovie(req.body) 
    if (result.error) return res.status(400).json({error: JSON.parse(result.error.message)})
    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    }
    movies.push(newMovie)
    res.status(201).json(newMovie)
})
app.patch("/movies/:id", (req,res)=>{
    const result = validatePartialMovie(req.body)
    if (result.error) {
        return res.status(400).json ({ error: JSON.parse(result.error.message)})
    }
    const {id} = req.params
    const movieIndex = movies.findIndex(movie => movie.id == id)
    if (movieIndex == -1){
        return res.status(404).json({message: "la pelicula no se encontró"})
    }
    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }
    movies[movieIndex] = updateMovie
    return res.json(updateMovie)
})
app.delete("/movies/:id", (req, res) => {
    const { id } = req.params;
    const movieIndex = movies.findIndex(movie => movie.id === id);

    if (movieIndex === -1) {
        return res.status(404).json({ message: "movie not found" });
    }
    movies.splice(movieIndex, 1);

    return res.json({ message: "movie deleted" });
});

app.options(`/movies/:id`, (req,res)=>{
    const origin = req.header(`origin`)
    if(ACCEPTED_ORIGINS.includes(origin) || !origin){
        res.header(`Access-Control-Allow-Origin`, origin)
        res.header(`Access-Control-Allow-Methods`, `GET, POST, PUT, PATCH, DELETE`)
    }
    res.sendStatus(200)
})

app.use((req,res)=>{
    res.status(404).send("<h1>Error 404 por no encontrar la url</h1>")
})
const PORT = process.env.PORT ?? 1234
app.listen(PORT, ()=>{
    console.log(`escuchando en puerto http://localhost:${PORT}`)
})