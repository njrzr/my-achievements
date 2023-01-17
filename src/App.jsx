import User from "./components/User";
import Achievements from "./components/Achievements";
import Footer from "./components/Footer";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [achievementFlag, setAchievementFlag] = useState(false);
  const [userFlag, setUserFlag] = useState(false);
  const [flag, setFlag] = useState(false);
  const dev = "http://localhost:9000/.netlify/functions/api/xbl";
  const prod = "https://njrzr-express-server.netlify.app/.netlify/functions/api/xbl";

  useEffect(() => {
    if (achievementFlag === true && userFlag === true) setFlag(true);
  }, [achievementFlag, userFlag]);

  return (
    <div className="App select-none box-border">
      {flag !== true &&
        <div className="fixed flex justify-center items-center top-0 z-10 w-screen h-screen bg-secondary gap-4">
          <div className="circles"></div>
          <div className="circles"></div>
          <div className="circles"></div>
          <div className="circles"></div>
          <div className="circles"></div>
        </div>
      }

      <User url={prod} userF={setUserFlag} />
      <Achievements url={prod}  achievementF={setAchievementFlag} />
      <Footer />
    </div>
  );
}

export default App;