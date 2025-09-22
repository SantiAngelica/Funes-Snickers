import dotenv from "dotenv"; 
import program from "../utils/commander.utils.js";

const { mode } = program.opts(); 

dotenv.config({
    path: mode === "produccion" ? "./.env.produccion":"./.env.desarrollo"
})

const configObject = {
    puerto: process.env.PUERTO,
    mongo_url: process.env.MONGO_URL,
    jwt_decoder: process.env.JWT_DECODER
}

export default configObject; 