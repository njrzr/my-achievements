import axios from "axios";
import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import AchievementsList from "./AchievementsList";
import { CaravaggioProvider, Image } from "caravaggio-react";

function Achievements(props) {
  const { achievementF } = props;
  const [achievements, setAchievements] = useState([]);
  const [titlesArr, setTitlesArr] = useState([]);
  const [toggleList, setToggle] = useState(false);
  const [game, setGame] = useState([]);
  const [userId, setUser] = useState('');

  useEffect(() => {
    axios({
      url: "http://localhost:9000/.netlify/functions/api/xbl",
      method: "GET",
      headers: {
        "X-Authorization": "kkkw8co804wgcg0cksgcks40cc44cc0gck0",
        "Accept": "application/json",
        "Target-URL": "https://xbl.io/api/v2/achievements?"
      },
    })
      .then((response) => setResponse(response.data))
      .catch((error) => console.log("error", error));

    const setResponse = (response) => {
      setBackground(response);
      setUser(response.xuid);
      setGames(response);
    };

    const setGames = (response) => {
      let sliced;
      let games = [];
      let count = 0;

      while (count < response.titles.length) {
        if (response.titles[count].achievement.sourceVersion !== 0) games.push(response.titles[count]);
        count++;
      }

      setTitlesArr(games);
      sliced = games.slice(0, 12);
      setAchievements(sliced);
      achievementF(true);
    };
  }, [achievementF]);

  const setBackground = (response) => {
    let body = document.querySelector("body");
    let background = "";
    let flag = false;
    let count = 0;
    let random = Math.floor(Math.random() * 12);

    while (flag !== true) {
      if (response.titles[random].images[count].type === "SuperHeroArt") {
        background = response.titles[random].images[count].url;
        flag = true;
        count = 0;
      }

      count++;
      if (flag) count = 0;
    }

    body.style = `background: url(https://njrzr-caravaggio.vercel.app/o:webp/?image=${background}) top no-repeat fixed; background-size: cover;`;
  };

  const pageGames = (response, index = 0) => {
    let sliced;
    sliced = response.slice(index, index + 12);
    setAchievements(sliced);
  };

  const setView = (gameData) => {
    const body = document.querySelector("body")
    body.style.overflow = "hidden";
    setToggle(!toggleList)
    setGame(gameData)
  }

  return (
    <div className="relative flex flex-wrap w-full md:w-11/12 my-1 md:my-2 mx-auto p-4 md:p-1">
      <CaravaggioProvider url="https://njrzr-caravaggio.vercel.app">
        {achievements.map((value, index) => {
          return (
            <div
              key={value["titleId"]}
              className="group cursor-pointer flex justify-center md:block relative w-full md:w-1/4 overflow-hidden my-1 md:my-auto md:p-1 transition duration-200 z-0 md:hover:scale-105 md:hover:z-10"

              onClick={() => setView(value)}
            >
              <Image
                className={`object-contain bg-opacity-50 transition duration-300 md:group-hover:bg-opacity-100 h-36 md:h-[300px] w-36 md:w-full md:mx-auto rounded-tl-lg rounded-bl-lg md:rounded-tr-lg md:rounded-bl-none ${value.achievement.totalGamerscore ===
                  value.achievement.currentGamerscore
                  ? "bg-gradient-to-bl md:bg-gradient-to-tr from-primary to-gold"
                  : "bg-terciary"
                  }`}
                src={value.displayImage}
                alt={`Game art-${value.titleId}`}
                opt={{ o: "webp", q: 50, rs: { s: "300", m: "fit" } }}
              />

              <div
                className={`flex flex-col justify-between p-2 w-[60vw] md:w-full h-36 md:h-40 bg-opacity-50 transition duration-300 md:group-hover:bg-opacity-100 rounded-tr-lg md:rounded-tr-none md:rounded-bl-lg rounded-br-lg overflow-hidden ${value.achievement.totalGamerscore ===
                  value.achievement.currentGamerscore
                  ? "bg-gradient-to-br from-primary to-gold"
                  : "bg-terciary"
                  } `}
              >
                <p className="font-poppins font-semibold text-base md:text-xl text-white drop-shadow-text">
                  {value.name}
                </p>
                <div>
                  <p className="font-poppins text-sm md:text-base font-medium text-white drop-shadow-text my-1">
                    Achievements: {value.achievement.currentAchievements}
                  </p>
                  <p className="font-poppins text-sm md:text-base font-medium text-white drop-shadow-text">
                    Score: {value.achievement.currentGamerscore} /{" "}
                    {value.achievement.totalGamerscore}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </CaravaggioProvider>
      <Navigation pageGames={pageGames} titles={titlesArr} />
      <AchievementsList userId={userId} game={game} toggleList={toggleList} setToggle={setToggle} />
    </div>
  );
}

export default Achievements;
