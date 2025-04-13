import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faGem, faUserNinja, faMedal, faListCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";

function AchievementsList(props) {
  const { userId, game, toggleList, setToggle, url, apiKey } = props;
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
          "X-Authorization": apiKey,
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
      <p className="fixed z-10 text-xl flex justify-center items-center cursor-pointer top-2 md:top-4 right-2 md:right-4 w-10 h-10 text-red-500 bg-white hover:bg-red-500 hover:text-white rounded-full transition-all duration-200"onClick={ () => {
          const body = document.querySelector("body")
          body.style.overflow = "auto"
          setToggle(!toggleList)
        } }>
        <FontAwesomeIcon icon={faXmark} />
      </p>
      
      { toggleList !== false && achievements.length !== 0 ? 
        <div>
          <div style={{ backgroundImage: `url(https://njrzr-caravaggio.vercel.app/o:webp/q:25?image=${background})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }} className="relative flex flex-col justify-center items-center font-medium bg-secondary p-4 rounded-bl-xl rounded-br-xl w-full overflow-hidden before:absolute before:bg-black before:w-full before:h-full before:top-0 before:left-0 before:bg-opacity-50 h-48">
            <h1 className="text-white drop-shadow shadow-black text-4xl font-bold">{ game.name }</h1>
            <div className="bg-white w-10/12 h-1 my-4 rounded-full z-10"></div>
            <p className="text-white flex gap-2 items-center drop-shadow shadow-black text-xl">
              <FontAwesomeIcon icon={faMedal} />
              { game.achievement.currentAchievements + ' / ' + achievementsCount }
            </p>
            <p className="text-white flex gap-2 items-center drop-shadow shadow-black text-xl">
              <span className="flex items-center font-poppins justify-center text-base bg-white text-primary rounded-full w-6 h-6">
                G
              </span>
              { game.achievement.currentGamerscore + ' / ' + game.achievement.totalGamerscore }
            </p>
            <p className="text-white flex gap-2 items-center drop-shadow shadow-black text-xl">
              <FontAwesomeIcon icon={faListCheck} />
              { game.achievement.currentGamerscore === game.achievement.totalGamerscore ? 'Yes' : 'No' }
            </p>
          </div>

          <div className="grid md:grid-cols-3 p-1 md:p-2 gap-1 md:gap-2 h-3/4">
            { achievements.length !== 0 ? 
                achievements.achievements.map((value, index) => { 
                  return <div className={`relative border rounded-xl w-full h-60 flex items-center justify-center bg-terciary ${game.devices.indexOf('Xbox360') !== -1 ? 'opacity-100' : value.progressState !== 'Achieved' ? 'opacity-40' : 'opacity-100'}`} key={`achievement-${index}`}>
                    <div className={`relative w-full h-full flex flex-col justify-start gap-2 ${value.progressState === 'Achieved' || value.isSecret !== true || game.devices.indexOf('Xbox360') !== -1 ? 'block' : 'hidden'}`}>
                      <div className="flex">
                        { value.mediaAssets !== undefined ?
                          <img className="relative bg-white object-cover h-24 w-2/6 rounded-tl-xl rounded-br-xl" src={`https://njrzr-caravaggio.vercel.app/o:webp/q:25?image=${value.mediaAssets[0].url}`} alt={`Achievement Logo #${index}`} />
                          :  <img className="relative object-cover h-24 w-2/6 rounded-tl-xl rounded-br-xl" src="xbox-360.jpg" alt="Fallback Image" />
                        }
                        
                        <p className="text-white w-4/6 py-1 px-3 text-xl md:text-2xl font-semibold flex justify-center items-center gap-2">
                          { value.rarity.currentPercentage <= 10 && <FontAwesomeIcon icon={faGem} className="text-gold" /> } { value.name }
                        </p>
                      </div>

                      <p className="text-white border-t border-b py-1 px-3 md:text-xl text-center">
                        { value.progressState !== 'Achieved' ? value.lockedDescription : value.description }
                      </p>

                      <div className="absolute left-0 right-0 bottom-2 flex justify-center items-center gap-1 text-white py-1 px-3 text-sm md:text-base text-center">
                        <span className="flex items-center font-poppins justify-center text-base bg-white text-primary rounded-full w-6 h-6">
                          G
                        </span>
                        { value.rewards !== undefined ? value.rewards.length !== 0 ? value.rewards[0].type !== 'Art' ?
                          `${value.rewards[0].value}` : "Art achievement" : "0" : `${value.gamerscore}`
                        }
                        { game.devices.indexOf('Xbox360') === -1 &&
                          ` · ${value.progressState !== 'Achieved' ? 'Locked' : 'Unlocked'}`
                        }
                        { ` · ${value.rarity.currentCategory}` }
                        { ` - ${value.rarity.currentPercentage}%` }
                      </div>
                    </div>

                    { game.devices.indexOf('Xbox360') === -1 &&
                      <div className={`text-xl text-white flex gap-4 items-center h-36 justify-center ${value.isSecret === true && value.progressState !== 'Achieved' ? 'block' : 'hidden'}`}>
                        <FontAwesomeIcon className="text-4xl" icon={faUserNinja} /> Secret Achievement
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
          <div className="relative shadow-lg rounded-bl-xl rounded-br-xl w-full h-48 loader bg-no-repeat bg-gradient-to-l from-transparent via-secondary to-transparent"></div>

          <div className="grid md:grid-cols-3 auto-rows-min p-1 md:p-2 gap-1 md:gap-2 h-screen">
            {
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((value, index) => {
                return <div className="border rounded-2xl loader h-60 bg-no-repeat bg-gradient-to-l from-transparent via-secondary to-transparent" key={`skeleton-${index}`}>
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