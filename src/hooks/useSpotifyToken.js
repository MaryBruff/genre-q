import { useEffect, useState } from 'react';
const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

function useSpotifyToken() {
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
      .then(result => {
        if (!result.ok) {
          throw new Error(`Error: ${result.status}`);
        }
        return result.json();
      })
      .then(data => {
        setAccessToken(data.access_token);
      })
      .catch(error => {
        console.error('Error fetching access token:', error.message);
      });
  }, []);

  return accessToken;
}

export default useSpotifyToken;