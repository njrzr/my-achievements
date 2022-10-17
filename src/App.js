import User from './components/User';
import Achievements from './components/Achievements';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import Loader from './images/loader.webp'

function App() {
  const [achievementFlag, setAchievementFlag] = useState(false);

  return (
    <div className="App">
      { achievementFlag !== true &&
        <div className="fixed flex justify-center items-center top-0 z-10 w-screen h-screen bg-terciary">
          <img className="w-80 h-80 loader" src={ Loader } alt="Loader"></img>
        </div>
      }
      
      <User />
      <Achievements  achievementF={ setAchievementFlag } />
      <Footer />
    </div>
  );
}

export default App;
