// components/Header.jsx
import { Menu as MenuIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../axiosInstance';
import Wrapper from './style';

const Header = ({ toggleMenu }) => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axiosInstance.get('/api/auth/user');
                setFullName(res.data?.name || '');
            } catch (err) {
                toast.error('Failed to fetch user details');
                console.error(err);
            }
        };

        fetchUser();
    }, []);

    const initials = fullName
        .split(" ")
        .map(name => name.charAt(0))
        .join("")
        .toUpperCase();

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
                        {fullName && (
                            <>
                                <span className="greeting">Welcome, {fullName}</span>
                                <div className="profile-circle" onClick={handleProfileClick}>
                                    {initials}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </header>
        </Wrapper>
    );
};

export default Header;
