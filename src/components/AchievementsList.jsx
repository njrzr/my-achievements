function AchievementsList(props) {
  const { game, toggleList, setToggle } = props;

  return (
    <div className={`fixed top-0 left-0 z-20 bg-pink-700 bg-opacity-80 w-full h-screen ${toggleList === true ? 'block' : 'hidden'}`}>
      <p className="absolute cursor-pointer top-2 right-2 py-2 px-4 bg-white font-semibold rounded-full" onClick={ () => setToggle(!toggleList) }>x</p>
      { game.length !== 0 ? 
        <div>
          <h1>{ game.name }</h1>
          <p>Score: { game.achievement.currentGamerscore + ' / ' + game.achievement.totalGamerscore}</p>
          <p>Completed: { game.achievement.currentGamerscore === game.achievement.totalGamerscore ? 'Yes' : 'No'} </p>
        </div>
        : ''
      }
    </div>
  );
}

export default AchievementsList;