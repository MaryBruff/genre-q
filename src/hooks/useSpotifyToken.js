import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

function useSpotifyToken() {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    var authOptions = {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    };
    
    fetch('https://accounts.spotify.com/api/token', authOptions)
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => { throw err; });
        }
        return response.json();
      })
      .then(data => {
        setAccessToken(data.access_token);
      })
      .catch(error => {
        console.error("Error fetching token: ", error);
        if (error.error && error.error_description) {
          console.error(`Spotify Auth Error: ${error.error} - ${error.error_description}`);
        }
        navigate('/error', { state: { statusCode: 500, message: 'Something is wrong on our end!' } });
      });
  }, []);

  return accessToken;
}

export default useSpotifyToken;