import React, {useState, useEffect} from 'react';
import api from '../../api';
import {Link, useLocation, useParams} from 'react-router-dom';

export default function GameStreams(){

    let location = useLocation();
        console.log(location);

    let {slug} = useParams();   
    


    const [streamData,setStreamData] = useState([]);
    const [viewers, setViewers] = useState(0);

    useEffect(() => {

        const fetchData = async () => {
            const result = await api.get(
                `https://api.twitch.tv/helix/streams?game_id=${location.state.gameID}`
            );
            let dataArray = result.data.data;

            let finalArray = dataArray.map(stream => {
                let newURL = stream.thumbnail_url
                .replace('{width}', "320")
                .replace('{height}', "180");
                stream.thumbnail_url = newURL;
                return stream;
            })

            // Algo Sum Viewers
            let totalViewers = finalArray.reduce((acc, val) => {
                return acc + val.viewer_count;
            }, 0);

            let userIDs = dataArray.map(stream => {
                return stream.user_id;
            })

            let baseUrl = "https://api.twitch.tv/helix/users?";
            let queryParamsUsers = "";

            userIDs.map(id => {
                return (queryParamsUsers = queryParamsUsers + `id=${id}&`)
            })
            let finalUrl = baseUrl + queryParamsUsers;

            let getUsersLogin = await api.get(finalUrl);
            
            let userLoginArray = getUsersLogin.data.data;

            finalArray = dataArray.map(stream => {

                stream.login = "";

                userLoginArray.forEach(login => {
                    if(stream.user_id === login.id) {
                        stream.login = login.login;
                    }
                })

                return stream;
            })

            setViewers(totalViewers);
            setStreamData(finalArray)
        }

        fetchData();
    }, [location.state.gameID])

    console.log(viewers);
    console.log(streamData);


    return (
        <div>
           <h1 className="titreGamesStreams">Streams : {slug}</h1>
           <h3 className="sousTitreGamesStreams">
               <strong className="textColored">{viewers} personnes regarde {slug}</strong>
           </h3>

           <div className="flexAccueil">

                {streamData.map ((stream,index) => (
                    <div key={index} className="carteGamesStreams">
                        <img src={stream.thumbnail_url} alt="jeu carte image" className="imgCarte"/>

                        <div className="cardBodyStreams">
                            <h5 className="titreCartesStream">{stream.user_name}</h5>
                            <p className="txtStream">Nombre de viewers : { stream.viewer_count}</p>

                            <Link
                            className ="lien"
                            to = {{
                                pathname: `/live/${stream.login}`
                            }}
                            >
                            <div className="btnCarte">Regarder {stream.user_name}</div>
                            
                            
                            </Link>
                        </div>
                    </div>
                ))}

           </div>
        </div>
    )
}
