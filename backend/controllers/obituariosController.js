import Obituarios from "../models/obituariosSchema.js"

const obtenerObituarios = async (req, res) => {
    try {
        const obituarios = await Obituarios.find();
        res.status(200).json(obituarios);
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener los datos' });
      }
}

const guardarObituarios = async (req, res) =>{
    try {
        // Crear una nueva instancia de Obituarios con los datos de req.body
        const nuevoObituario = new Obituarios(req.body);
        // Guardar el obituario en la base de datos
        await nuevoObituario.save();
        // Enviar una respuesta exitosa
        res.status(201).json(nuevoObituario);
      } catch (error) {
        // Manejar cualquier error que ocurra durante el guardado
        console.error(error);
        res.status(500).json({ error: 'Error al guardar el obituario' });
      }
}

export {obtenerObituarios, guardarObituarios} ;