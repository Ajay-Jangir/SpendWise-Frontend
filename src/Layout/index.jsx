/* eslint-disable no-unused-vars */
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer"
import { useEffect, useState } from "react";
import { Wrapper } from "./style";
import axiosInstance from "../axiosInstance";

const Layout = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const res = await axiosInstance.get("/api/auth/user");
                setUsername(res.data.name);
            } catch (err) {
                navigate("/login");
            }
        };

        fetchUsername();
    }, [navigate]);

    return (
        <Wrapper>
            <Header toggleMenu={() => setIsMenuOpen(!isMenuOpen)} username={username} />
            <div className="body">
                <Menu menuOpen={isMenuOpen} setMenuOpen={setIsMenuOpen} />
                <div className="content">
                    <Outlet context={{ username, setUsername }} />
                </div>
            </div>
            <Footer />
        </Wrapper>
    );
};

export default Layout;
