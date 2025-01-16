import { movieModel } from "../models/movie.js";
import { validatePartialMovie, validateMovie } from "../zod.js";
export class controllMovies{
    static async getAll (req,res){
        const { genre } = req.query;
        const movies = await movieModel.getAll({ genre });
        res.json(movies)
    }
    static async getById (req,res){
        const {id} = req.params
        const movie =  await movieModel.getById({id})
        if(movie) return res.json(movie)
        res.status(404).json({message: "movie not found"})
    }
    static async create (req,res){
    const result = validateMovie(req.body) 
    if (result.error) return res.status(400).json({error: JSON.parse(result.error.message)})
    const newMovie = await movieModel.createOne({data: result.data})
    res.status(201).json(newMovie)
    }
    static async update (req,res){
        const result = validatePartialMovie(req.body)
        if (result.error) return res.status(400).json ({ error: JSON.parse(result.error.message)})
        const {id} = req.params
        const updatedMovie = await movieModel.update({id, data: result.data})
        return res.json(updatedMovie)
    }
    static async remove (req,res){
        const { id } = req.params;
        const result = await movieModel.delete({id})
        if(!result) return res.status(404).json({message: "movie not found"})
        return res.json({ message: "movie deleted" })
    }
    static async options (req,res){
        const origin = req.header(`origin`)
        if(ACCEPTED_ORIGINS.includes(origin) || !origin){
            res.header(`Access-Control-Allow-Origin`, origin)
            res.header(`Access-Control-Allow-Methods`, `GET, POST, PUT, PATCH, DELETE`)
        }
        res.sendStatus(200)
    }
}