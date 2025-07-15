import styled from 'styled-components';
export const Wrapper = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    user-select: none;

    .body {
        display: flex;
        flex: 1;
        min-height: 0;
        overflow: hidden;
    }

    .content {
        flex: 1;
        min-width: 0;
        min-height: 0;
        overflow-y: auto;
        overflow-x: hidden;
        background-color: #262834;
        padding: 1rem;
        box-sizing: border-box;
    }

    .header .brand-row {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .hamburger {
        display: none;
        background: transparent;
        border: none;
        color: white;
        cursor: pointer;
    }

    .menu {
        width: 240px;
        transition: transform 0.3s ease;
    }

    @media (max-width: 768px) {
        .hamburger {
            display: block;
        }

        .menu {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            background-color: #1f1f2e;
            transform: translateX(-100%);
            z-index: 999;
        }

        .menu.open {
            transform: translateX(0);
        }

        .body {
            padding-left: 0 !important; /* remove sidebar space */
        }
    }
`;
