function Footer() {
  return(
    <div className="relative w-11/12 h-16 mx-auto bg-secondary bg-opacity-50 flex items-center justify-around">
      <p className="text-xl text-white drop-shadow-text font-orbitron font-bold">Made by <a className="hover:text-primary" href="https://njrzr.github.io" rel="noreferrer" target="_blank">ZERO+PLUS</a>, using <a className="hover:text-primary" href="https://xbl.io" rel="noreferrer" target="_blank">OpenXBL</a> API</p>
      <p className="text-xl text-white drop-shadow-text font-orbitron font-bold"> | </p>
      <p className="text-xl text-white drop-shadow-text font-orbitron font-bold">&copy;2022</p>
    </div>
  );
}

export default Footer;