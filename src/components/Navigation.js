import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faAnglesLeft, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react";

function Navigation(props) {
  const { pageGames, titles } = props;
  const [index, setIndex] = useState(0);
  
  let pages = Math.floor(titles.length / 12);
  let pagesArr = [];
  let sibling = 2;
  let space = sibling - 1;
  let sliceLeft, sliceCenter, sliceRight;
  let i = 0;

  while (i <= pages) {
    pagesArr.push(i);
    i++;
  }

  sliceLeft = index < sibling ? pagesArr.slice(0, index) : pagesArr.slice(index - sibling, index);
  sliceCenter = pagesArr.slice(index, index + 1);
  sliceRight = index < pages - sibling ? pagesArr.slice(index + (sibling - space), index + (sibling + 1)) : pagesArr.slice(index + (sibling - space));

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
    <div className="flex align-center justify-between flex-wrap w-full md:w-11/12 mt-2 mx-auto p-2">
      <div>
        { index < 1 ?
          <button className="text-secondary bg-white transition duration-300 rounded-tl-full rounded-bl-full w-12 h-12" disabled>
            <FontAwesomeIcon icon={ faAngleLeft } />
          </button>
          :
          <button onClick={ (e) => previousBtn(index, e) } className="text-primary bg-secondary bg-opacity-75 transition duration-300 hover:bg-white hover:text-secondary rounded-tl-full rounded-bl-full w-12 h-12">
            <FontAwesomeIcon icon={ faAngleLeft } />
          </button>
        }
        { index < 1 ?
          <button className="text-secondary bg-white transition duration-300 w-12 h-12" disabled>
            <FontAwesomeIcon icon={ faAnglesLeft } />
          </button>
          :
          <button onClick={ (e) => previousBtn(1, e) } className="text-primary bg-secondary bg-opacity-75 transition duration-300 hover:bg-white hover:text-secondary w-12 h-12">
            <FontAwesomeIcon icon={ faAnglesLeft } />
          </button>
        }
      </div>

      { sliceLeft.map((value, idx) => {
          return <button onClick={ (e) => indexBtn(value, e) } key={ `left-${idx}` } className={ `w-12 h-12 font-press text-white bg-secondary bg-opacity-75 transition duration-300 hover:bg-white hover:text-secondary rounded-full` }>
                  { value + 1 }
                </button>
        })
      }

      { sliceCenter.map((value, idx) => {
          return <button onClick={ (e) => indexBtn(value, e) } key={ `center-${idx}` } className={ `w-12 h-12 font-press ${ value === index ? 'text-secondary bg-white' : 'text-white bg-secondary' } bg-opacity-75 transition duration-300 hover:bg-white hover:text-secondary rounded-full` }>
                  { value + 1 }
                </button>
        })
      }

      { sliceRight.map((value, idx) => {
          return <button onClick={ (e) => indexBtn(value, e) } key={ `right-${idx}` } className={ `w-12 h-12 font-press text-white bg-secondary bg-opacity-75 transition duration-300 hover:bg-white hover:text-secondary rounded-full` }>
                  { value + 1 }
                </button>
        })
      }

      <div>
        { pages - 1 < index ?
          <button className="text-secondary bg-white transition duration-300 w-12 h-12" disabled>
            <FontAwesomeIcon icon={ faAnglesRight } />
          </button>
          :
          <button onClick={ (e) => nextBtn(pages - 1, e) } className="text-primary bg-secondary bg-opacity-75 transition duration-300 hover:bg-white hover:text-secondary w-12 h-12">
            <FontAwesomeIcon icon={ faAnglesRight } />
          </button>
        }
        { pages - 1 < index ?
          <button className="text-secondary bg-white transition duration-300 rounded-tr-full rounded-br-full w-12 h-12" disabled>
            <FontAwesomeIcon icon={ faAngleRight } />
          </button>
          :
          <button onClick={ (e) => nextBtn(index, e) } className="text-primary bg-secondary bg-opacity-75 transition duration-300 hover:bg-white hover:text-secondary rounded-tr-full rounded-br-full w-12 h-12">
            <FontAwesomeIcon icon={ faAngleRight } />
          </button>
        }
      </div>
    </div>
  );
}

export default Navigation;