import mongoose from "mongoose";

mongoose.connect("mongodb+srv://santiang:0304@cluster0.8clbd.mongodb.net/coder-back-end-santi?retryWrites=true&w=majority&appName=Cluster0")
        .then(() => console.log("BD conectada"))
        .catch((error) => console.log("Error al conectar BD", error))


