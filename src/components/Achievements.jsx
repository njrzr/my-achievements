import axios from "axios";
import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import AchievementsList from "./AchievementsList";
import { CaravaggioProvider, Image } from "caravaggio-react";

function Achievements(props) {
  const { achievementF, url, apiKey } = props;
  const [achievements, setAchievements] = useState([]);
  const [titlesArr, setTitlesArr] = useState([]);
  const [toggleList, setToggle] = useState(false);
  const [game, setGame] = useState([]);
  const [userId, setUser] = useState('');
  const sliceItems = 15

  useEffect(() => {
    axios({
      url: url,
      method: "GET",
      headers: {
        "X-Authorization": apiKey,
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
      sliced = games.slice(0, sliceItems);
      setAchievements(sliced);
      achievementF(true);
    };
  }, [achievementF]);

  const setBackground = (response) => {
    let body = document.querySelector("body");
    let background = "";
    let flag = false;
    let count = 0;
    let random = Math.floor(Math.random() * sliceItems);

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
    sliced = response.slice(index, index + sliceItems);
    setAchievements(sliced);
  };

  const setView = (gameData) => {
    const body = document.querySelector("body")
    body.style.overflow = "hidden";
    setToggle(!toggleList)
    setGame(gameData)
  }

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 auto-rows-min items-center justify-items-center place-items-center gap-2 md:gap-6 w-11/12 mx-auto">
      <CaravaggioProvider url="https://njrzr-caravaggio.vercel.app">
        {achievements.map((value, index) => {
          return (
            <div
              key={value["titleId"]}
              className="group cursor-pointer bg-slate-700 flex flex-row md:flex-col justify-center items-center relative w-full md:w-80 h-auto overflow-hidden transition duration-200 z-0 md:hover:scale-105 md:hover:z-10 rounded-lg"
              onClick={() => setView(value)}
            >
              <Image
                className={`object-contain bg-opacity-50 transition duration-300 md:group-hover:bg-opacity-100 w-36 md:w-full h-36 md:h-80 mx-auto ${value.achievement.totalGamerscore ===
                  value.achievement.currentGamerscore
                  ? "bg-gradient-to-bl md:bg-gradient-to-tr from-primary to-gold"
                  : "bg-terciary"
                  }`}
                src={value.displayImage}
                alt={`Game art-${value.titleId}`}
                opt={{ o: "webp", q: 50, rs: { s: "300", m: "fit" } }}
              />

              <div
                className={`flex flex-col justify-between items-center p-2 w-full h-36 md:h-40 mx-auto bg-opacity-50 transition duration-300 md:group-hover:bg-opacity-100 overflow-hidden ${value.achievement.totalGamerscore ===
                  value.achievement.currentGamerscore
                  ? "bg-gradient-to-br from-primary to-gold"
                  : "bg-terciary"
                  } `}
              >
                <p className="font-poppins font-semibold text-base text-center md:text-xl text-white drop-shadow-text">
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
      <Navigation pageGames={pageGames} titles={titlesArr} sliceItems={sliceItems} />
      <AchievementsList apiKey={apiKey} url={url} userId={userId} game={game} toggleList={toggleList} setToggle={setToggle} />
    </div>
  );
}

export default Achievements;
