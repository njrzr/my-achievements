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
      .then((response) => {
        if (typeof response.data["profileUsers"] !== 'object') return
        setResponse(response.data)
      })
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
      <div className="relative w-full flex md:block justify-center md:w-56 md:h-56 md:bg-primary md:bg-opacity-75 md:rounded-tl-full md:rounded-bl-full">
        <img
          src={picture}
          className="user-pic relative w-56 h-56 rounded-full"
          alt="Profile"
        ></img>
      </div>

      <div className="relative overflow-hidden flex flex-col justify-evenly items-center md:items-start w-full md:w-8/12 md:h-56 p-4 md:px-8 mt-2 md:my-auto bg-primary bg-opacity-75 rounded-lg md:rounded-tr-full md:rounded-br-full">
        <div className="w-11/12 flex flex-col md:flex-row gap-2 md:gap-0 justify-center md:justify-between items-center">
          <p className="username font-press text-white drop-shadow-text text-2xl md:text-3xl">
            {username}
          </p>

          <p className="flex justify-center items-center gap-2 bg-secondary px-4 py-2 rounded-full text-white drop-shadow-text md:text-xl my-2">
            <img src="public/gamerscore.webp" className="relative w-6 h-6 object-cover" />
            {gamerscore}
          </p>
        </div>

        <p className="w-11/12 font-poppins text-white font-medium drop-shadow-text md:text-xl">
          Bio: {bio}
        </p>
      </div>
    </div>
  );
}

export default User;
