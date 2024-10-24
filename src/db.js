import mongoose from "mongoose";
import configObject from "./config/dotenv.config.js";
const { mongo_url } = configObject

class DataBase {
        static #instancia;

        constructor() {
                mongoose.connect(mongo_url)
                        .then(() => {
                                console.log("Conectado a la base de datos con éxito.");
                        })
                        .catch((error) => {
                                console.error("Error al conectar con la base de datos:", error);
                        });
        }

        static getInstancia() {
                if (this.#instancia) {
                        //Si ya tenemos una instancia, la retornamos: 
                        return this.#instancia;
                }
                //Caso contrario, la creamos: 
                this.#instancia = new DataBase();
                return this.#instancia;
        }
}

export default DataBase;

