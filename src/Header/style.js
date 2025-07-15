import styled from 'styled-components';

const Wrapper = styled.div`
    .header-container {
        width: 100%;
        height: 64px;
        background-color: #1c1e26;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 1rem;
        box-sizing: border-box;
        border: none;
    }

    .left-section {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .hamburger {
        display: none;
        background: transparent;
        border: none;
        color: #ccc;
        cursor: pointer;
        padding: 0;
        margin-right: 0.25rem;

        svg {
            display: block;
        }
    }

    .brand {
        font-size: 1.5rem;
        font-weight: 600;
        color: #00b894;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .right-section {
        display: flex;
        align-items: center;
    }

    .profile-info {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .greeting {
        font-size: 0.9rem;
        color: #ccc;
        white-space: nowrap;
    }

    .profile-circle {
        width: 36px;
        height: 36px;
        background: linear-gradient(135deg, #3c6850ff, #2a2a3e);
        border-radius: 50%;
        border: 2px solid #00b894;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 0.85rem;
        font-weight: 600;
        text-transform: uppercase;
    }

    @media (max-width: 768px) {
        .hamburger {
            display: block;
        }

        .greeting {
            display: none;
        }

        .brand {
            font-size: 1rem;
        }

        .profile-circle {
            width: 32px;
            height: 32px;
            font-size: 0.9rem;
        }
    }
`;
export default Wrapper;
