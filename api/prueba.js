require('dotenv').config();
const { default: axios } = require("axios");
const { API_KEY } = process.env

const name = "Tomb Raider (2013)"

const pedido = async (name) => {
    const pedido = await 
    axios(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`)

    const games = await pedido.data.results


    const game = games.map( gm => (
        {
            id: "api " + gm.id,
            name: gm.name,
            image: gm.background_image,
            released: gm.released,
            rating: gm.rating,
            platforms: gm.platforms.map( p => p.platform.name).join(", "),
            genre: gm.genres.map( p => p.name).join(", ")
        }))

    console.log(game);
}

// pedido(name) 



const id = "3498"

const getGamebyID = async (id) => {
    const pedidoId = await
    axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    const game = await pedidoId.data

    const gameid = {
            id: "api " + game.id,
            name: game.name,
            description: game.description_raw,
            image: game.background_image,
            released: game.released,
            rating: game.rating,
            platforms: game.platforms.map( p => p.platform.name).join(", "),
            genre: game.genres.map( p => p.name).join(", ")
        }
        
    return gameid;
    
}



const pedidogames = async () => {
    let videogames = [];

	for (let i = 1; i <= 5; i++) {
		const apiGames = await 
        axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`);
		const listGames = await apiGames.data.results;
		videogames = videogames.concat(listGames);
		console.log(`${videogames.length} Juegos cargados`);
	}   

    const games = videogames.map( gm => ({
            id: gm.id,
            name: gm.name,
            description: gm.description,
            image: gm.background_image,
            released: gm.released,
            rating: gm.rating,
            platforms: gm.platforms && gm.platforms.map( p => p.platform.name).join(", "),
            genre: gm.genres && gm.genres.map((g) => g.name)
        }
    ))

    const filtro = games.forEach( g => (g.name === "auto"))
    
    console.log(filtro);
}


