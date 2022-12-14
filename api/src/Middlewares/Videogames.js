const express = require("express")
const { Videogame, Genre } = require('../db');
const { getGameByName, getGamebyID, createGame, AllJoinGenres, joinGenre, getDescription } = require("../Funciones.js")
const { Op } = require("sequelize")
const router = express.Router()

router.get("/", async (req,res) => {
    const { name } = req.query
        if(name) {
            const games = await Videogame.findAll({
                    where: {
                        name: { [Op.iLike]: `%${name}%` }
                    },
                    include: {
                        model: Genre,
                        attributes: ["name"],
                    },
                    limit: 15
                })

                const gamesName = AllJoinGenres(games)
        
                games.length
                ? res.json(gamesName)
                : res.status(400).json(`No se encontro un juego con el nombre = ${req.query.name}`)
        } else {
            try {
                const allVideogames = await Videogame.findAll({
                    include: {
                        model: Genre,
                        attributes: ['name'],
                    },
                })

                const game = AllJoinGenres(allVideogames)

                res.json(game)
            } catch (e) {
                res.status(404).json("Juegos no encontrados")
            }
        }

})


router.get("/:id", async (req,res) => {
    try {
        const { id } = req.params
        // const game = await getGamebyID(id)
        await getDescription(id)

        const game = await Videogame.findByPk(id,{
            include: {
                model: Genre,
                attributes: ["name"],
            },
        })

        const finalgame = joinGenre(game)
    
        !finalgame
        ? res.status(400).json(`No se encontro el id: ${req.params.id}`)
        : res.json(finalgame)
    } catch (error) {
        res.status(400).json(`No se encontro el id: ${req.params.id}`)
    }
})



router.post("/", async (req,res) => {
    try {
        const newGame = await createGame(req.body)
        ? res.json(newGame)
        : res.status(400).json("Faltan completar datos")
    } catch (error) {
        res.status(404).json("No se pudo cargar el juego ):")
    }
})

module.exports = router
