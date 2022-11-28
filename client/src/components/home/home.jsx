import React from "react";
import "./home.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getVideogames } from "../../redux/actions/index.js";
import CardGames from "../cardGame/cardGame";


const Home = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getVideogames())
    },[dispatch])
    
    const games = useSelector(state => state.games)

    return(
        <div className="home">
            <h1>Juegos</h1>
            <div>
                {games?.map( g => (
                    <CardGames
                    id={g.id}
                    key={g.id}
                    image={g.image}
                    name={g.name}
                    platforms={g.platforms}
                    />
                ))}
            </div>
        </div>
    )
}

export default Home