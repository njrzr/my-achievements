function Footer() {
  const thisYear = new Date().getFullYear()

  return (
    <div className="relative w-full mt-4 p-2 md:p-0 md:h-16 bg-secondary md:flex md:items-center md:justify-around">
      <p className="text-sm md:text-xl text-white drop-shadow-text font-poppins font-medium">
        Made by{" "}
        <a
          className="md:hover:text-primary underline md:no-underline"
          href="https://njrzr.github.io"
          rel="noreferrer"
          target="_blank"
        >
          ZERO+PLUS
        </a>
        , with{" "}
        <a
          className="md:hover:text-primary underline md:no-underline"
          href="https://xbl.io"
          rel="noreferrer"
          target="_blank"
        >
          OpenXBL
        </a>{" "}
        and{" "}
        <a
          className="md:hover:text-primary underline md:no-underline"
          href="https://caravaggio.ramielcreations.com/"
          rel="noreferrer"
          target="_blank"
        >
          Caravaggio
        </a>
      </p>

      <p className="inline w-2 h-2 md:text-xl bg-white rounded-full drop-shadow-text">
      </p>
      
      <p className="text-right md:text-left md:text-xl text-white drop-shadow-text font-poppins font-medium">
        &copy;2022 - { thisYear }
      </p>
    </div>
  );
}

export default Footer;
