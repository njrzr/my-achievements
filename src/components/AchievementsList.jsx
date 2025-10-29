import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faGem, faUserNinja, faMedal, faListCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function AchievementsList(props) {
  const { userId, game, toggleList, setToggle, url, apiKey } = props;
  let [achievements, setAchievements] = useState([]);
  let gameUrl = '';
  let background = '';
  let count = 0;
  let achievementsCount = 0;

  if (game.length !== 0) {
    gameUrl = game.devices.indexOf('Xbox360') !== -1 ?
      `https://xbl.io/api/v2/achievements/x360/${userId}/title/${game.titleId}`
      : `https://xbl.io/api/v2/achievements/player/${userId}/${game.titleId}`;

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

  const numberToHex = (number) => {
    return number.toString(16)
  }

  const indexAchievement = (index) => {
    console.log(index)
  }

  return (
    <div className={`fixed top-0 left-0 p-2 z-20 bg-primary w-full h-screen overflow-x-hidden overflow-y-scroll scrollbar-none grow ${toggleList === true ? 'block' : 'hidden'}`}>
      <button className="fixed z-20 text-xl flex justify-center items-center cursor-pointer top-4 right-4 w-10 h-10 text-red-500 bg-white/75 md:bg-white hover:bg-red-500 hover:text-white rounded-lg transition-all duration-200"onClick={ () => {
          const body = document.querySelector("body")
          body.style.overflow = "auto"
          setToggle(!toggleList)
        } }>
        <FontAwesomeIcon icon={faXmark} />
      </button>

      { toggleList !== false && achievements.length !== 0 ?
        <div>
          <div style={{ backgroundImage: `url(https://njrzr-caravaggio.vercel.app/o:webp/q:25?image=${background})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }} className="sticky top-0 z-10 flex flex-col justify-center items-center font-medium bg-secondary p-4 rounded-xl w-full overflow-hidden before:absolute before:bg-black before:w-full before:h-full before:top-0 before:left-0 before:bg-opacity-50 h-auto md:h-60 shadow-sm shadow-black">
            <h1 className="text-white text-center drop-shadow shadow-black text-2xl md:text-4xl font-bold">{ game.name }</h1>
            <div className="bg-white w-10/12 h-1 my-4 rounded-full z-10"></div>
            <p className="text-white font-press flex gap-4 items-center drop-shadow shadow-black text-xl">
              <FontAwesomeIcon icon={faMedal} />
              { game.achievement.currentAchievements + ' / ' + achievementsCount }
            </p>
            <p className="relative text-white font-press flex gap-4 items-cente drop-shadow shadow-black text-xl">
              <img src="public/gamerscore.webp" className="relative w-6 h-6 object-cover" />
              { game.achievement.currentGamerscore + ' / ' + game.achievement.totalGamerscore }
            </p>
            <p className="text-white flex gap-2 items-center drop-shadow shadow-black text-xl">
              <FontAwesomeIcon icon={faListCheck} />
              { game.achievement.currentGamerscore === game.achievement.totalGamerscore ? 'Yes' : 'No' }
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-1 md:gap-2 mt-2">
            { achievements.length !== 0 ?
                achievements.achievements.map((value, index) => {
                  return <div className={`relative rounded-xl w-full h-60 flex items-center justify-center bg-terciary overflow-hidden shadow-sm shadow-black ${value.progressState !== 'Achieved' && value.unlocked !== true ? 'opacity-40' : 'opacity-100'}`} key={`achievement-${index}`}>
                    { game.devices.indexOf('Xbox360') == -1 &&
                      <div className={`relative w-full h-full flex flex-col justify-start gap-2`}>
                        <div>
                          {/* <FontAwesomeIcon className={`absolute left-2 bottom-2 text-4xl text-white ${value.progressState !== 'Achieved' ? 'block' : 'hidden'}`} icon={faEyeSlash} /> */}

                          <div className="flex p-2">
                            { value.mediaAssets !== undefined &&
                              <img className="relative bg-black text-white object-cover h-24 w-2/6 rounded-xl" src={`https://njrzr-caravaggio.vercel.app/o:webp/q:25?image=${value.mediaAssets[0].url}`} alt={`Achievement Logo #${index}`} />
                            }
                            <p className="text-white text-center w-4/6 py-1 px-3 text-xl md:text-2xl font-semibold flex justify-center items-center gap-2">
                              { value.rarity.currentPercentage <= 10 && <FontAwesomeIcon icon={faGem} className="text-gold" /> } { value.name }
                            </p>
                          </div>

                          <p className="bg-primary/50 text-white m-2 p-2 rounded-xl md:text-xl text-center">
                            { value.progressState !== 'Achieved' ? value.lockedDescription : value.description }
                          </p>

                          <div className="absolute font-medium left-0 right-0 bottom-2 flex justify-center items-center gap-2 text-white py-1 px-3 text-sm md:text-base text-center">
                            <img src="public/gamerscore.webp" className="relative w-6 h-6 object-cover" />

                            { value.rewards !== undefined ? value.rewards.length !== 0 ? value.rewards[0].type !== 'Art' ?
                              `${value.rewards[0].value}` : "Art achievement" : "0" : `${value.gamerscore}`
                            }
                            { ` · ${value.progressState !== 'Achieved' ? 'Locked' : 'Unlocked'}` }
                            { ` · ${value.rarity.currentCategory}` }
                            { ` - ${value.rarity.currentPercentage}%` }
                          </div>
                        </div>

                        { value.isSecret === true && value.progressState !== 'Achieved' &&
                          <div className={`absolute top-0 bg-white text-xl flex gap-4 items-center w-full h-full justify-center`}>
                            <FontAwesomeIcon className="text-4xl" icon={faUserNinja} /> Secret Achievement
                            {/* <FontAwesomeIcon className="absolute left-2 bottom-2 text-4xl" icon={faEye} /> */}
                          </div>
                        }
                      </div>
                    }

                    { game.devices.indexOf('Xbox360') != -1  &&
                      <div className={`relative w-full h-full flex flex-col justify-start gap-2`}>
                        <div>
                          {/* <FontAwesomeIcon className={`absolute left-2 bottom-2 text-4xl text-white ${value.unlocked !== true ? 'block' : 'hidden'}`} icon={faEyeSlash} /> */}

                          <div className="flex p-2">
                            <img className="relative bg-black object-scale-down h-24 w-2/6 rounded-xl" src={`https://njrzr-caravaggio.vercel.app/o:webp/q:100?image=http://image.xboxlive.com/global/t.${numberToHex(value.titleId)}/ach/0/${numberToHex(value.imageId)}`} alt={`Achievement Logo #${index}`} />
                            <p className="text-white text-center w-4/6 py-1 px-3 text-xl md:text-2xl font-semibold flex justify-center items-center gap-2">
                              { value.rarity.currentPercentage <= 10 && <FontAwesomeIcon icon={faGem} className="text-gold" /> } { value.name }
                            </p>
                          </div>

                          <p className="bg-primary/50 text-white m-2 rounded-xl p-2 md:text-xl text-center">
                            { value.unlocked != true ? value.lockedDescription : value.description }
                          </p>

                          <div className="absolute font-medium left-0 right-0 bottom-2 flex justify-center items-center gap-2 text-white py-1 px-3 text-sm md:text-base text-center">
                            <img src="public/gamerscore.webp" className="relative w-6 h-6 object-cover" />

                            { `${value.gamerscore}` }
                            { ` · ${value.unlocked !== true ? 'Locked' : 'Unlocked'}` }
                            { ` · ${value.rarity.currentCategory}` }
                            { ` - ${value.rarity.currentPercentage}%` }
                          </div>

                          { value.isSecret === true && value.unlocked !== true &&
                            <div className={`absolute top-0 bg-white text-xl flex gap-4 items-center w-full h-full justify-center`}>
                              <FontAwesomeIcon className="text-4xl" icon={faUserNinja} /> Secret Achievement
                              {/* <FontAwesomeIcon className="absolute left-2 bottom-2 text-4xl" icon={faEye} /> */}
                            </div>
                          }
                        </div>
                      </div>
                    }
                  </div>
                })
              : ''
            }
          </div>
        </div>
        :
        <div className="fixed top-0 left-0 p-2 z-10 w-full h-screen bg-terciary">
          <div className="relative shadow-sm shadow-black rounded-xl w-full h-48 loader bg-no-repeat bg-gradient-to-l from-transparent via-secondary to-transparent"></div>

          <div className="grid md:grid-cols-3 auto-rows-min mt-2 gap-1 md:gap-2 h-screen">
            {
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((value, index) => {
                return <div className="rounded-2xl loader h-60 bg-no-repeat bg-gradient-to-l from-transparent via-secondary to-transparent shadow-sm shadow-black" key={`skeleton-${index}`}>
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
