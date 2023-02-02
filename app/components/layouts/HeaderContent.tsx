import { ReactElement } from "react";
import { Link } from "remix"
import ThemeSwitcher from "../buttons/ThemeSwitcher";

function HeaderContent(): ReactElement {
    return (
        <div className="container remix-app__header-content m-auto flex flex-row justify-between items-center py-5 text-primary">
          <Link to="/" title="NCS" className="remix-app__header-home-link">
            <img className="w-[98px] h-[109px]" src={`/logo.png`} alt={'logo'} />
          </Link>
          <nav aria-label="Main navigation" className="remix-app__header-nav">
            <ul className="flex flex-row !gap-6 justify-between items-center">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <a href="https://t.me/Altosey">Contact Us</a>
              </li>
              <li>
                <a href="https://github.com/shiningsea0415/search-vehicle-vin">GitHub</a>
              </li>
              <li>
                <ThemeSwitcher />
              </li>
            </ul>
          </nav>
        </div>
    )
}

export default HeaderContent
