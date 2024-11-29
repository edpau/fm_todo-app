import sunIcon from "../../assets/images/icon-sun.svg";
import moonIcon from "../../assets/images/icon-moon.svg";

import { useState } from "react";

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  function handleClick() {
    if (isLight) {
      setIsLight(false);
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      setIsLight(true);
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  }

  return (
    <button onClick={handleClick} aria-label="Toggle Theme" className="relative w-5 h-5 bottom-2">
      <img
        src={moonIcon}
        alt="Moon Icon"
        width="20px"
        className={`transition-opacity duration-500 ${isLight ? "opacity-100" : "opacity-0"} absolute`}
      />
      <img
        src={sunIcon}
        alt="Sun Icon"
        width="20px"
        className={`transition-opacity duration-500 ${isLight ? "opacity-0" : "opacity-100"} absolute`}
      />
    </button>
  );
}
