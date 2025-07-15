import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Wrapper } from "./style";
import { FaHome, FaExchangeAlt, FaChartBar, FaCog, FaSignOutAlt } from "react-icons/fa";

const Menu = ({ menuOpen, setMenuOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const handleNavigation = (path) => {
        navigate(path);
        if (window.innerWidth <= 768) {
            setMenuOpen(false);
        }
    };

    return (
        <Wrapper className={`menu ${menuOpen ? "open" : ""}`}>
            <div className="nav">
                <div className={`nav-item${isActive("/") ? " active" : ""}`} onClick={() => handleNavigation("/")}>
                    <span className="icon"><FaHome /></span>
                    <span>Dashboard</span>
                </div>

                <div className={`nav-item${isActive("/transactions") ? " active" : ""}`} onClick={() => handleNavigation("/transactions")}>
                    <span className="icon"><FaExchangeAlt /></span>
                    <span>Transactions</span>
                </div>

                <div className={`nav-item${isActive("/analysis") ? " active" : ""}`} onClick={() => handleNavigation("/analysis")}>
                    <span className="icon"><FaChartBar /></span>
                    <span>Analysis</span>
                </div>

                <div className={`nav-item${isActive("/setting") ? " active" : ""}`} onClick={() => handleNavigation("/setting")}>
                    <span className="icon"><FaCog /></span>
                    <span>Setting</span>
                </div>
            </div>

            <div className="logout" onClick={() => {
                console.log("Logout clicked");
                if (window.innerWidth <= 768) setMenuOpen(false);
            }}>
                <span className="icon"><FaSignOutAlt /></span>
                <span>Logout</span>
            </div>
        </Wrapper>
    );
};


export default Menu;
