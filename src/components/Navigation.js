import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faAnglesLeft, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react";

function Navigation(props) {
  const { pageGames, titles } = props;
  const [index, setIndex] = useState(0);
  
  let pages = Math.floor(titles.length / 12);
  let pagesArr = [];
  let slicedPages;
  let i = 0;

  while (i <= pages) {
    pagesArr.push(i);
    i++;
  }

  if (index < 1) { slicedPages = pagesArr.slice(index, index + 5); }
  else if (index >= 1 && index < 2) { slicedPages = pagesArr.slice(index - 1, index + 4); }
  else if (index >= 2 && index < pages - 1) { slicedPages = pagesArr.slice(index - 2, index + 3); }
  else if (index >= pages - 1 && index < pages) { slicedPages = pagesArr.slice(index - 3, index + 2); }
  else if (index >= pages) { slicedPages = pagesArr.slice(index - 4, index + 1); }

  const previousBtn = (idx, e) => {
    setIndex(idx - 1);
    pageGames(titles, (idx - 1) * 12);
  }

  const indexBtn = (idx) => {
    setIndex(idx);
    pageGames(titles, idx * 12);
  }

  const nextBtn = (idx) => {
    setIndex(idx + 1);
    pageGames(titles, (idx + 1) * 12);
  }

  return (
    <div className="flex align-center justify-center flex-wrap w-full md:w-11/12 mt-2 mx-auto p-2">
      { index < 1 ?
        <button className="text-secondary bg-white transition duration-300 rounded-tl-full rounded-bl-full w-10 h-10" disabled>
          <FontAwesomeIcon icon={ faAngleLeft } />
        </button>
        :
        <button onClick={ (e) => previousBtn(index, e) } className="text-primary bg-secondary bg-opacity-75 transition duration-300 hover:bg-white hover:text-secondary rounded-tl-full rounded-bl-full w-10 h-10">
          <FontAwesomeIcon icon={ faAngleLeft } />
        </button>
      }

      { index < 1 ?
        <button className="text-secondary bg-white transition duration-300 w-10 h-10" disabled>
          <FontAwesomeIcon icon={ faAnglesLeft } />
        </button>
        :
        <button onClick={ (e) => previousBtn(1, e) } className="text-primary bg-secondary bg-opacity-75 transition duration-300 hover:bg-white hover:text-secondary w-10 h-10">
          <FontAwesomeIcon icon={ faAnglesLeft } />
        </button>
      }

      { slicedPages.map((value, idx) => {
          return <button onClick={ (e) => indexBtn(value, e) } key={ `btn-${idx}` } className={ `w-12 font-press ${ value === index ? 'text-secondary bg-white' : 'text-white bg-secondary' } bg-opacity-75 transition duration-300 hover:bg-white hover:text-secondary` }>
                  { value + 1 }
                </button>
        })
      }

      { pages - 1 < index ?
        <button className="text-secondary bg-white transition duration-300 w-10 h-10" disabled>
          <FontAwesomeIcon icon={ faAnglesRight } />
        </button>
        :
        <button onClick={ (e) => nextBtn(pages - 1, e) } className="text-primary bg-secondary bg-opacity-75 transition duration-300 hover:bg-white hover:text-secondary w-10 h-10">
          <FontAwesomeIcon icon={ faAnglesRight } />
        </button>
      }

      { pages - 1 < index ?
        <button className="text-secondary bg-white transition duration-300 rounded-tr-full rounded-br-full w-10 h-10" disabled>
          <FontAwesomeIcon icon={ faAngleRight } />
        </button>
        :
        <button onClick={ (e) => nextBtn(index, e) } className="text-primary bg-secondary bg-opacity-75 transition duration-300 hover:bg-white hover:text-secondary rounded-tr-full rounded-br-full w-10 h-10">
          <FontAwesomeIcon icon={ faAngleRight } />
        </button>
      }
    </div>
  );
}

export default Navigation;