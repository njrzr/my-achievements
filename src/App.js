import User from "./components/User";
import Achievements from "./components/Achievements";
import Footer from "./components/Footer";
import { useState } from "react";

function App() {
  const [achievementFlag, setAchievementFlag] = useState(false);

  return (
    <div className="App">
      {achievementFlag !== true && (
        <div className="fixed flex justify-center items-center top-0 z-10 w-screen h-screen bg-secondary gap-4">
          <div className="circles"></div>
          <div className="circles"></div>
          <div className="circles"></div>
          <div className="circles"></div>
          <div className="circles"></div>
        </div>
      )}

      <User />
      <Achievements achievementF={setAchievementFlag} />
      <Footer />
    </div>
  );
}

export default App;
