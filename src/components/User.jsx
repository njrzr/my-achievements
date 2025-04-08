import axios from "axios";
import { useEffect, useState } from "react";

function User(props) {
  const { userF, url, apiKey } = props;
  const [picture, setPicture] = useState("");
  const [username, setUsername] = useState("");
  const [gamerscore, setGamerscore] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    axios({
      url: url,
      method: "GET",
      headers: {
        "X-Authorization": apiKey,
        "Accept": "application/json",
        "Target-URL": "https://xbl.io/api/v2/account?"
      },
    })
      .then((response) => setResponse(response.data))
      .catch((err) => console.log(err));

    const setResponse = (response) => {
      setPicture(response["profileUsers"][0].settings[0].value);
      setGamerscore(response["profileUsers"][0].settings[1].value);
      setUsername(response["profileUsers"][0].settings[2].value);
      setBio(response["profileUsers"][0].settings[7].value);
      userF(true);
    };
  }, [userF]);

  return (
    <div className="relative mx-auto flex flex-col md:flex-row justify-center items-center w-full md:w-11/12 my-1 md:my-4 px-4 md:p-4">
      <div className="relative w-full flex md:block justify-center md:w-56 md:h-56 md:bg-primary md:bg-opacity-50 md:rounded-tl-full md:rounded-bl-full">
        <img
          src={picture}
          className="user-pic relative w-56 h-56 rounded-full"
          alt="Profile"
        ></img>
      </div>

      <div className="relative overflow-hidden flex flex-col justify-center w-full md:w-8/12 md:h-56 p-4 md:px-8 mt-2 md:my-auto bg-primary bg-opacity-50 rounded-lg md:rounded-tr-full md:rounded-br-full">
        <p className="username font-press text-white drop-shadow-text text-2xl md:text-3xl">
          {username}
        </p>
        <p className="flex gap-2 gamerscore font-press text-white drop-shadow-text md:text-xl my-2">
          <span className="flex items-center font-poppins justify-center text-base bg-white text-primary rounded-full w-6 h-6">
            G
          </span>
          {gamerscore}
        </p>
        <p className="bio font-poppins text-white font-medium drop-shadow-text md:text-xl">
          Bio: {bio}
        </p>
      </div>
    </div>
  );
}

export default User;
