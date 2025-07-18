import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 240px;
    background-color: #1c1e26;
    color: #fff;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    box-sizing: border-box;
    flex-shrink: 0;

    .nav {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        .nav-item {
            display: flex;
            align-items: center;
            padding: 0.75rem 1rem;
            border-radius: 0.75rem;
            cursor: pointer;
            color: #ccc;
            transition: background 0.2s;
            text-decoration: none;
            user-select: none;

            &:hover {
                background-color: #2a2d3a;
                color: #fff;
            }

            &.active {
                background-color: #2a2d3a;
                color: #21a2a7;
            }

            .icon {
                margin-right: 0.75rem;
                font-size: 1.2rem;
            }

            span {
                font-size: 1rem;
            }
        }
    }

    .logout {
        margin-top: auto;
        display: flex;
        align-items: center;
        padding: 0.75rem 1rem;
        border-radius: 0.75rem;
        cursor: pointer;
        color: #f87171;
        transition:
            background 0.2s,
            opacity 0.2s;

        &:hover {
            background-color: #3b3f50;
        }

        &.disabled {
            cursor: not-allowed;
            opacity: 0.6;
            pointer-events: none;

            &:hover {
                background-color: transparent; /* no hover on disabled */
            }
        }

        .icon {
            margin-right: 0.75rem;
            font-size: 1.2rem;
        }

        span {
            font-size: 1rem;
        }
    }

    @media (max-width: 768px) {
        &.menu,
        &.menu.open {
            position: fixed;
            top: 64px;
            left: 0;
            width: 240px;
            height: calc(100vh - 64px);
            background-color: #1c1e26;
            z-index: 1000;
            transition: transform 0.3s ease;
        }

        &.menu {
            transform: translateX(-100%);
        }

        &.menu.open {
            transform: translateX(0);
        }
    }
`;
