import User from "./components/User";
import Achievements from "./components/Achievements";
import Footer from "./components/Footer";

import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [achievementFlag, setAchievementFlag] = useState(false);
  const [userFlag, setUserFlag] = useState(false);
  const [flag, setFlag] = useState(false);
  const apiKey = import.meta.env.VITE_API_KEY;
  const dev = "http://localhost:9000/.netlify/functions/api/xbl";
  const prod = "https://njrzr-express-server.netlify.app/.netlify/functions/api/xbl";

  useEffect(() => {
   if (achievementFlag === true && userFlag === true) setFlag(true);
  }, [achievementFlag, userFlag]);

  return (
    <div className="App select-none box-border flex flex-col justify-center items-center">
      {flag !== true &&
        <div className="fixed flex flex-col justify-center items-center top-0 z-10 w-screen h-screen bg-secondary gap-12">
          <div className="circles"></div>
          <div className="circles"></div>
          <div className="circles flex justify-center items-center">
            <img src="public/favicon.ico" className="relative w-12 h-12" />
          </div>
          <div className="circles"></div>
          <div className="circles"></div>
        </div>
      }

      <User apiKey={apiKey} url={dev} userF={setUserFlag} />
      <Achievements apiKey={apiKey} url={dev}  achievementF={setAchievementFlag} />
      <Footer />
    </div>
  );
}

export default App;
