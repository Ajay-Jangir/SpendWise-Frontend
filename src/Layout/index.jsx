import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import Menu from '../Menu';
import { Wrapper } from './style';

const Layout = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <Wrapper>
            <Header toggleMenu={() => setMenuOpen(prev => !prev)} />
            <div className="body">
                <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                <main className="content">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </Wrapper>
    );
};

export default Layout;
