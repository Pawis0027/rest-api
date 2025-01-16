const ACCEPTED_ORIGINS =[
    "http://localhost:8080",
    "http://localhost:1234",
    "http://localhost:10000"
]

import cors from "cors"
export const corsMiddleware = ({acceptedOrigins = ACCEPTED_ORIGINS} = {})=>cors({
    origin: (origin, cb)=>{
        if (acceptedOrigins.includes(origin) || !origin){
            cb(null, true)
        } else {
            cb(new Error("Not allowed by CORS"))
        }
    }
})