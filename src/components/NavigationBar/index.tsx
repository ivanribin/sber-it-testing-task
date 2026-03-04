import { INavigationPathData, navigationPathsData } from "@router/routes";
import { ReactElement } from "react";
import { NavLink } from "react-router";
import "./style.css";

const NavigationBar = (): ReactElement => {
    return (
        <nav className="navigation-bar">
            {navigationPathsData.map((item: INavigationPathData) => (
                <NavLink
                    key={item.id}
                    to={item.path}
                    className={({ isActive }) =>
                        `nav-link button button-primary ${
                            isActive ? "active" : "opacity-80"
                        }`
                    }
                >
                    {item.label}
                </NavLink>
            ))}
        </nav>
    );
};

export default NavigationBar;
