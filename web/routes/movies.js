import {Router} from 'express'
// import { validatePartialMovie, validateMovie } from "../../zod.js"
// import { movieModel} from "../../models/movie.js"
import { controllMovies } from '../../controllers/movies.js'

export const moviesRouter = Router()

moviesRouter.get("/", controllMovies.getAll)
moviesRouter.get("/:id", controllMovies.getById) 
moviesRouter.post("/", controllMovies.create)
moviesRouter.patch("/:id", controllMovies.update)
moviesRouter.delete("/:id", controllMovies.remove);
moviesRouter.options(`/:id`, controllMovies.options)