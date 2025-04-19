import axios from "axios";
import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import AchievementsList from "./AchievementsList";
import { CaravaggioProvider, Image } from "caravaggio-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";

function Achievements(props) {
  const { achievementF, url, apiKey } = props;
  const [achievements, setAchievements] = useState([]);
  const [achievements360, setAchievements360] = useState(0);
  const [score360, setScore360] = useState(0);
  const [titlesArr, setTitlesArr] = useState([]);
  const [toggleList, setToggle] = useState(false);
  const [game, setGame] = useState([]);
  const [userId, setUser] = useState('');
  const sliceItems = 12

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
      let achievements = 0;
      let score = 0;

      while (count < response.titles.length) {
        if (response.titles[count].achievement.sourceVersion !== 0) games.push(response.titles[count]);
        // if (response.titles[count].achievement.sourceVersion !== 0 && response.titles[count].devices.indexOf('Xbox360') !== -1) {
        //   achievements += response.titles[count].achievement.currentAchievements
        //   score += response.titles[count].achievement.currentGamerscore
        // }

        count++;
      }

      setTitlesArr(games);
      sliced = games.slice(0, sliceItems);
      setAchievements(sliced);
      // setAchievements360(achievements);
      // setScore360(score);
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
    <div className="relative grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 auto-rows-min items-center justify-items-center place-items-center gap-2 md:gap-6 w-11/12 mx-auto">
      {/* <div className="col-span-1 md:col-span-3 xl:col-span-4 flex justify-center item-center">
        <div
          key="Xbox360"
          className="bg-terciary flex flex-row md:flex-col justify-center items-center relative w-full md:w-80 h-auto overflow-hidden transition duration-200 z-0 rounded-lg"
        >
          <img
            className="object-cover object-left bg-opacity-50 transition duration-300 w-36 md:w-full h-36 md:h-80 mx-auto"
            src="xbox-360.jpg"
            alt="Xbox 360 Default"
          />

          <div
            className="flex flex-col justify-center items-center gap-4 p-2 w-full h-36 md:h-40 mx-auto bg-opacity-50 transition duration-300 overflow-hidden"
          >
            <p className="font-poppins font-semibold text-base text-center md:text-xl text-white drop-shadow-text">
              Xbox 360 Achievements
            </p>

            <div className="flex flex-col gap-1">
              <p className="font-poppins flex gap-2 justify-center items-center text-sm md:text-base font-medium text-white drop-shadow-text">
                <FontAwesomeIcon icon={faMedal} /> {achievements360}
              </p>

              <p className="font-poppins flex items-center gap-2 text-sm md:text-base font-medium text-white">
                <span className="flex items-center font-poppins justify-center text-base bg-white text-primary rounded-full w-6 h-6">
                  G
                </span>
                {score360}
              </p>
            </div>
          </div>
        </div>
      </div> */}

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
                className={`flex flex-col justify-center items-center gap-4 p-2 w-full h-36 md:h-40 mx-auto bg-opacity-50 transition duration-300 md:group-hover:bg-opacity-100 overflow-hidden ${value.achievement.totalGamerscore ===
                  value.achievement.currentGamerscore
                  ? "bg-gradient-to-br from-primary to-gold"
                  : "bg-terciary"
                  } `}
              >
                <p className="font-poppins font-semibold text-base text-center md:text-xl text-white drop-shadow-text">
                  {value.name}
                </p>

                <div className="flex flex-col gap-1">
                  <p className="font-press flex gap-2 justify-center items-center text-sm md:text-base font-medium text-white drop-shadow-text">
                    <FontAwesomeIcon icon={faMedal} /> {value.achievement.currentAchievements}
                  </p>

                  <p className="font-press flex items-center gap-2 text-sm md:text-base font-medium text-white drop-shadow-text">
                    <span className="flex items-center font-poppins justify-center text-base bg-white text-primary rounded-full w-6 h-6">
                      G
                    </span>
                    {value.achievement.currentGamerscore} /{" "}
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
