function Footer() {
  return(
    <div className="relative w-11/12 p-2 md:p-0 md:h-16 mx-auto bg-secondary bg-opacity-50 md:flex md:items-center md:justify-around rounded-tl-lg rounded-tr-lg">
      <p className="text-sm md:text-xl text-white drop-shadow-text font-orbitron font-bold">Made by <a className="md:hover:text-primary underline md:no-underline" href="https://njrzr.github.io" rel="noreferrer" target="_blank">ZERO+PLUS</a>, using <a className="md:hover:text-primary underline md:no-underline" href="https://xbl.io" rel="noreferrer" target="_blank">OpenXBL</a> API</p>
      <p className="hidden md:inline md:text-xl text-white drop-shadow-text font-orbitron font-bold"> | </p>
      <p className="text-right md:text-left md:text-xl text-white drop-shadow-text font-orbitron font-bold">&copy;2022</p>
    </div>
  );
}

export default Footer;