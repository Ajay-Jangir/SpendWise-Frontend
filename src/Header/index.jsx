// components/Header.jsx
import { Menu as MenuIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Wrapper from './style';

const Header = ({ toggleMenu, username }) => {
    const navigate = useNavigate();

    const initials = username
    ? username
        .split(/\s+/)
        .map(name => name.charAt(0))
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "";

    const handleProfileClick = () => {
        navigate("/setting");
    };

    return (
        <Wrapper>
            <header className="header-container">
                <div className="left-section">
                    {/* ✅ Hamburger button (visible only on mobile) */}
                    <button className="hamburger" onClick={toggleMenu}>
                        <MenuIcon size={24} />
                    </button>
                    <h1 className="brand">SpendWise</h1>
                </div>

                <div className="right-section">
                    <div className="profile-info">
                        <span className="greeting">
                            {username ? `Welcome, ${username}` : "Welcome!"}
                        </span>
                        {username && (
                            <div className="profile-circle" onClick={handleProfileClick}>
                                {initials}
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </Wrapper>
    );
};

export default Header;
