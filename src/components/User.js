import axios from 'axios';
import { useEffect, useState } from 'react';

function User() {
  const [picture, setPicture] = useState("");
  const [username, setUsername] = useState("");
  const [gamerscore, setGamerscore] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    axios({
      url: 'http://localhost:3000',
      method: 'get',
      headers: {
        "X-Authorization": "kkkw8co804wgcg0cksgcks40cc44cc0gck0",
        "Accept": "application/json",
        "Target-URL": "https://xbl.io/api/v2/account"
      }
    }).then(response => setResponse(response.data))
      .catch(err => console.log(err));
  });

  const setResponse = (response) => {
    setPicture(response["profileUsers"][0].settings[0].value);
    setGamerscore(response["profileUsers"][0].settings[1].value);
    setUsername(response["profileUsers"][0].settings[6].value);
    setBio(response["profileUsers"][0].settings[7].value);
  }

  return (
    <div className="relative mx-auto flex justify-center items-center w-11/12 my-4 p-4">
      <div className="relative w-56 h-56 bg-primary bg-opacity-50 rounded-tl-full rounded-bl-full">
        <img src={ picture } className="user-pic relative w-56 h-56 rounded-full" alt="Profile"></img>
      </div>

      <div className="relative overflow-hidden flex flex-col justify-center w-8/12 h-56 px-8 bg-primary bg-opacity-50 rounded-tr-full rounded-br-full">
        <p className="username font-orbitron text-white drop-shadow-text text-3xl font-bold">{ username }</p>
        <p className="flex gap-2 gamerscore font-orbitron text-white drop-shadow-text text-xl my-2">
          <span className="flex items-center justify-center text-base bg-white text-primary font-bold rounded-full w-6 h-6">G</span>{ gamerscore }
        </p>
        <p className="bio font-orbitron text-white drop-shadow-text text-xl">Bio: { bio }</p>
        <p></p>
      </div>
    </div>
  );
}

export default User;