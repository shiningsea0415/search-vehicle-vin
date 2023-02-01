import React, { ReactElement } from "react";
import { injectThemeScript } from "~/lib/theme";
import DarkIcon from "../icons/DarkIcon";
import LightIcon from "../icons/LightIcon";

function ThemeSwitcher(): ReactElement {
    React.useEffect(() => {
      injectThemeScript();
    }, []);

    return (
      <label className="relative inline-flex items-center cursor-pointer" >
        <button
          id="theme-switcher-btn"
          type="button"
          className="h-[35px] w-[35px] text-inverse bg-inverse dark:text-gray-400 rounded-lg text-sm p-2.5 flex justify-center items-center"
        >
          <DarkIcon />
          <LightIcon />
        </button>
      </label>
    )
}

export default ThemeSwitcher;
