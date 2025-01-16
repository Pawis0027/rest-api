import { readJSON } from "../utils.js"
const movies = readJSON("./movies.json")
import { randomUUID } from "crypto"

export class movieModel{
    static getAll = async({genre})=>{
        if (genre) {
            return movies.filter(movie =>
                movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
            );
        }
        return movies;
    }
    static async getById({id}){
        const movie = movies.find(movie => movie.id == id)
        if(movie) return movie
    }
    static async createOne({data}){
        const newMovie = {
            id: randomUUID(),
            ...data
        }
        movies.push(newMovie)
        return newMovie
    }
    static async delete({id}){
        const movieIndex = movies.findIndex(movie => movie.id === id);
        if (movieIndex === -1) return false
        movies.splice(movieIndex, 1);
        return true
    }
    static async update({id, data}){
        const movieIndex = movies.findIndex(movie => movie.id === id);
        if (movieIndex === -1) return false
        const updatedMovie = {
            ...movies[movieIndex],
            ...data
        }
        movies[movieIndex] = updatedMovie
        return updatedMovie
    }
}