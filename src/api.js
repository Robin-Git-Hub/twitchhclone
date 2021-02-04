import axios from 'axios';

let api = axios.create({
    headers: {
        "Client-ID": "r2pd61hn16rhcdjanhhkdvv284x92m",
        "Authorization": "Bearer h45fwh8drzeaoxs6znew3ckj0rx1ri"
    }
})

export default api;

/*
    CLIENT_ID = '7dwu3uftturpksxd4124irvw6mg5wt';
    REDIRECT = 'http://127.0.0.1/';

    LIEN AUTH = https://id.twitch.tv/oauth2/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT}&response_type=token

    Lien rempli = https://id.twitch.tv/oauth2/authorize?client_id=r2pd61hn16rhcdjanhhkdvv284x92m&redirect_uri=http://localhost:3000/&response_type=token
*/