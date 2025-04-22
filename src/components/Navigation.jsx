import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesRight,
  faAnglesLeft,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Navigation(props) {
  const { pageGames, titles, sliceItems } = props;
  const [index, setIndex] = useState(0);

  let pages = Math.floor(titles.length / sliceItems);
  let pagesArr = [];
  let emptyArr = [];
  let sibling = 2;
  let space = sibling - 1;
  let sliceLeft, sliceCenter, sliceRight;
  let i = 0;

  for (let i = 0; i < sibling; i++) {
    emptyArr.push(i);
  }

  while (i <= pages) {
    pagesArr.push(i);
    i++;
  }

  sliceLeft =
    index < sibling
      ? pagesArr.slice(0, index)
      : pagesArr.slice(index - sibling, index);
  sliceCenter = pagesArr.slice(index, index + 1);
  sliceRight =
    index < pages - sibling
      ? pagesArr.slice(index + (sibling - space), index + (sibling + 1))
      : pagesArr.slice(index + (sibling - space));

  const previousBtn = (idx, e) => {
    setIndex(idx - 1);
    pageGames(titles, (idx - 1) * sliceItems);
  };

  const indexBtn = (idx) => {
    setIndex(idx);
    pageGames(titles, idx * sliceItems);
  };

  const nextBtn = (idx) => {
    setIndex(idx + 1);
    pageGames(titles, (idx + 1) * sliceItems);
  };

  return (
    <div className="flex align-center justify-center flex-wrap mt-2 mx-auto p-2 lg:col-span-3 lg:col xl:col-span-5">
      <button
        onClick={(e) => previousBtn(index, e)}
        className={`${index < 1
          ? "text-secondary bg-white"
          : "text-primary bg-secondary md:hover:bg-white md:hover:text-secondary bg-opacity-75"
          } transition duration-300 rounded-tl-full rounded-bl-full w-10 h-10 md:w-12 md:h-12`}
        disabled={index < 1}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>

      <button
        onClick={(e) => previousBtn(1, e)}
        className={`hidden md:inline ${index < 1
          ? "text-secondary bg-white"
          : "text-primary bg-secondary bg-opacity-75 md:hover:bg-white md:hover:text-secondary"
          } transition duration-300 w-10 h-10 md:w-12 md:h-12`}
        disabled={index < 1}
      >
        <FontAwesomeIcon icon={faAnglesLeft} />
      </button>

      {emptyArr.slice(index, sibling).map((value, idx) => {
        return (
          <button
            key={`left-empty-${idx}`}
            className="w-10 h-10 md:w-12 md:h-12 bg-secondary bg-opacity-75 cursor-default"
          ></button>
        );
      })}

      {sliceLeft.map((value, idx) => {
        return (
          <button
            onClick={(e) => indexBtn(value, e)}
            key={`left-${idx}`}
            className={`w-10 h-10 md:w-12 md:h-12 font-press text-white bg-secondary bg-opacity-75 transition duration-300 md:hover:bg-white md:hover:text-secondary`}
          >
            {value + 1}
          </button>
        );
      })}

      {sliceCenter.map((value, idx) => {
        return (
          <button
            onClick={(e) => indexBtn(value, e)}
            key={`center-${idx}`}
            className={`w-10 h-10 md:w-12 md:h-12 font-press ${value === index
              ? "text-secondary bg-white"
              : "text-white bg-secondary"
              } bg-opacity-75 transition duration-300 md:hover:bg-white md:hover:text-secondary`}
          >
            {value + 1}
          </button>
        );
      })}

      {sliceRight.map((value, idx) => {
        return (
          <button
            onClick={(e) => indexBtn(value, e)}
            key={`right-${idx}`}
            className={`w-10 h-10 md:w-12 md:h-12 font-press text-white bg-secondary bg-opacity-75 transition duration-300 md:hover:bg-white md:hover:text-secondary`}
          >
            {value + 1}
          </button>
        );
      })}

      {emptyArr.slice(pages - index, sibling).map((value, idx) => {
        return (
          <button
            key={`right-empty-${idx}`}
            className="w-10 h-10 md:w-12 md:h-12 bg-secondary bg-opacity-75 cursor-default"
          ></button>
        );
      })}

      <button
        onClick={(e) => nextBtn(pages - 1, e)}
        className={`hidden md:inline ${pages - 1 < index
          ? "text-secondary bg-white"
          : "text-primary bg-secondary bg-opacity-75 md:hover:bg-white md:hover:text-secondary"
          } transition duration-300  w-10 h-10 md:w-12 md:h-12`}
        disabled={pages - 1 < index}
      >
        <FontAwesomeIcon icon={faAnglesRight} />
      </button>

      <button
        onClick={(e) => nextBtn(index, e)}
        className={` ${pages - 1 < index
          ? "text-secondary bg-white"
          : "text-primary bg-secondary bg-opacity-75 md:hover:bg-white md:hover:text-secondary"
          } transition duration-300 rounded-tr-full rounded-br-full w-10 h-10 md:w-12 md:h-12`}
        disabled={pages - 1 < index}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
}

export default Navigation;
