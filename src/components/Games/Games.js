import React, {useState, useEffect} from 'react';
import api from '../../api';
import {Link} from 'react-router-dom';

function Games() {

    const [games,setGames] = useState([])

    useEffect(()=> {
        const fetchData = async () => {
            const result = await api.get('https://api.twitch.tv/helix/games/top')

            let dataArray = result.data.data;
            let finalArray = dataArray.map (game => {
                let newUrl = game.box_art_url
                .replace ("{width}", "250")
                .replace ("{height}", "300");
            game.box_art_url = newUrl;
            return game;  
            });
            // console.log(result)
            setGames(finalArray);
        }

        fetchData();

    },[])

    return (
        <div>
            <h1 className="titreGames"> Jeux les plus populaires</h1>
            <div className="flexAccueil">

                {games.map ((game,index) => (

                    <div className="carteGames" key={index}>
                        <img src={game.box_art_url} alt="Jeu profil pic" className="imgCarte"/>

                        <div className="cardBodyGames">
                            <h5 className="titreCartesGames">{game.name}</h5>
                            <Link
                            className= "lien"
                            to ={{
                               pathname: "game/" + game.name,
                               state : {
                                   gameID: game.id
                               } 
                            }}>
                            <div className="btnCarte">Regarder {game.name}</div>
                            </Link>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Games;
