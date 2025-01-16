import { z } from "zod"
// const z = require("zod")
const movieSchema = z.object({
    title: z.string({
        invalid_type_error: "el nombre de la pelicula tiene que ser un string",
        required_error:"es requerido el titulo de la pelicula"
    }),
    year: z.number().int().min(1900).max(2024),
    director: z.string(),
    duration: z.number().min(2).max(300),
    rate: z.number().min(0).max(10),
    poster: z.string().url({
        message: "tiene que ser una url valida"
    }),
    genre: z.array(
        z.enum(["Action", "Adventure", "Sci-Fi"])
    ),
})
export const validateMovie = (object)=>{
    return movieSchema.safeParse(object)
}
export const validatePartialMovie =(object) =>{
    return movieSchema.partial().safeParse(object)
}
// export {validateMovie, validatePartialMovie}
// exports.validateMovie = validateMovie
// exports.validatePartialMovie = validatePartialMovie
// module.exports = {
//     validateMovie,
//     validatePartialMovie
// }