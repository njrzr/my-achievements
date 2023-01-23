import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faGem, faLock } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";

function AchievementsList(props) {
  const { userId, game, toggleList, setToggle, url } = props;
  let [achievements, setAchievements] = useState([]);
  let gameUrl = '';
  let background = '';
  let count = 0;
  let achievementsCount = 0;

  if (game.length !== 0) {
    gameUrl = game.devices.indexOf('Xbox360') !== -1 ? 
      `https://xbl.io/api/v2/achievements/player/${userId}/title/${game.titleId}`
      : `https://xbl.io/api/v2/achievements/title/${game.titleId}`;

    while (count < game.images.length) {
      if (game.images[count].type === "SuperHeroArt" || game.images[count].type === "WideBackgroundImage") {
        background = game.images[count].url;
      }
  
      count++;
    }
  }

  if (achievements.length !== 0) achievementsCount = achievements.achievements.length;

  useEffect(() => {
    toggleList !== false ?
      axios({
        url: url,
        method: "GET",
        headers: {
          "X-Authorization": "kkkw8co804wgcg0cksgcks40cc44cc0gck0",
          "Accept": "application/json",
          "Target-URL": gameUrl
        },
      })
        .then((response) => setAchievements(response.data))
        .catch((error) => console.log("error", error))
    : setAchievements([]);
  }, [toggleList]);

  return (
    <div className={`fixed top-0 left-0 z-20 bg-primary w-full h-screen overflow-auto ${toggleList === true ? 'block' : 'hidden'}`}>
      <p className="fixed z-10 text-xl flex justify-center items-center cursor-pointer top-2 right-2 md:right-8 w-10 h-10 bg-white rounded-full"onClick={ () => {
          const body = document.querySelector("body")
          body.style.overflow = "auto"
          setToggle(!toggleList)
        } }>
        <FontAwesomeIcon icon={faXmark} />
      </p>
      
      { toggleList !== false && achievements.length !== 0 ? 
        <div>
          <div style={{ backgroundImage: `url(https://njrzr-caravaggio.vercel.app/o:webp/q:25?image=${background})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }} className="relative bg-secondary p-4 rounded-bl-xl rounded-br-xl w-full overflow-hidden before:absolute before:bg-black before:w-full before:h-full before:top-0 before:left-0 before:bg-opacity-25">
            <h1 className="text-white drop-shadow shadow-black text-4xl font-semibold">{ game.name }</h1>
            <p className="text-white drop-shadow shadow-black text-xl">Achievements: { game.achievement.currentAchievements + ' / ' + achievementsCount }</p>
            <p className="text-white drop-shadow shadow-black text-xl">Score: { game.achievement.currentGamerscore + ' / ' + game.achievement.totalGamerscore }</p>
            <p className="text-white drop-shadow shadow-black text-xl">Completed: { game.achievement.currentGamerscore === game.achievement.totalGamerscore ? 'Yes' : 'No' }</p>
          </div>

          <div className="grid md:grid-cols-3 p-1 md:p-2 gap-1 md:gap-2 h-screen">
            { achievements.length !== 0 ? 
                achievements.achievements.map((value, index) => { 
                  return <div className={`relative border rounded-xl w-full bg-terciary ${game.devices.indexOf('Xbox360') !== -1 ? 'opacity-100' : value.progressState !== 'Achieved' ? 'opacity-40' : 'opacity-100'}`} key={`achievement-${index}`}>
                    <div className={`${value.progressState === 'Achieved' || value.isSecret !== true || game.devices.indexOf('Xbox360') !== -1 ? 'block' : 'hidden'}`}>
                      <div className="flex flex-row items-center">
                        { value.mediaAssets !== undefined ?
                          <img className="relative object-cover h-16 w-1/4 rounded-tl-xl rounded-br-xl" src={`https://njrzr-caravaggio.vercel.app/o:webp/q:25?image=${value.mediaAssets[0].url}`} alt="Achievement Logo" />
                          : ''
                        }
                        <p className="text-white w-3/4 py-1 px-3 text-xl md:text-2xl font-semibold">
                          { value.rarity.currentPercentage <= 10 && <FontAwesomeIcon icon={faGem} className="text-base" /> } { value.name }
                        </p>
                      </div>

                      <p className="text-white py-1 px-3 md:text-xl">{ value.progressState !== 'Achieved' ? value.lockedDescription : value.description }</p>
                      <p className="text-white py-1 px-3 text-sm md:text-base">
                        { value.rewards !== undefined ? value.rewards.length !== 0 ? value.rewards[0].type !== 'Art' ?
                          `Gamerscore: ${value.rewards[0].value}` : "Art achievement" : "Gamerscore: 0" : `Gamerscore: ${value.gamerscore}`
                        }
                        { game.devices.indexOf('Xbox360') === -1 &&
                          ` | ${value.progressState !== 'Achieved' ? 'Locked' : 'Unlocked'}`
                        }
                        { ` | ${value.rarity.currentCategory}` }
                        { ` | ${value.rarity.currentPercentage}%` }
                      </p>
                    </div>

                    { game.devices.indexOf('Xbox360') === -1 &&
                      <div className={`flex items-center h-36 justify-center ${value.isSecret === true && value.progressState !== 'Achieved' ? 'block' : 'hidden'}`}>
                        <FontAwesomeIcon className="text-4xl" icon={faLock} />
                      </div>
                    }
                  </div>
                })
              : ''
            }
          </div>
        </div>
        : 
        <div className="fixed top-0 z-10 w-full h-screen bg-terciary">
          <div className="relative shadow-lg rounded-bl-xl rounded-br-xl w-full h-36 loader bg-no-repeat bg-gradient-to-l from-transparent via-secondary to-transparent"></div>

          <div className="grid md:grid-cols-3 md:grid-rows-4 p-1 md:p-2 gap-1 md:gap-2 h-screen">
            {
              [1, 2, 3, 4, 5, 6, 7, 8, 9].map((value, index) => {
                return <div className="border rounded-2xl loader h-40 bg-no-repeat bg-gradient-to-l from-transparent via-secondary to-transparent" key={`skeleton-${index}`}>
                </div>
              })
            }
          </div>
        </div>
      }
    </div>
  );
}

export default AchievementsList;