import styled from 'styled-components';

const Wrapper = styled.div`
    pointer-events: none;
    display: flex;
    min-height: 100vh;
    background: radial-gradient(circle at center, #0e0e1a 0%, #101020 100%);
    color: #fff;
    font-family: 'Inter', sans-serif;
    position: relative;
    overflow: hidden;
    user-select: none;
    caret-color: transparent;
    pointer-events: none;

    input,
    button,
    .interactive,
    .eye-icon {
        user-select: auto;
        caret-color: auto;
        pointer-events: auto;
    }

    button {
        caret-color: transparent;
    }

    &::before {
        content: '';
        position: absolute;
        top: -20%;
        left: -20%;
        width: 140%;
        height: 140%;
        background: radial-gradient(
            circle,
            rgba(33, 150, 243, 0.25),
            transparent 70%
        );
        filter: blur(60px);
        z-index: 0;
    }

    .register-left {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 4rem 2rem;
        padding-top: 0;
        z-index: 1;

        .logo-top {
            display: none; /* hidden by default (desktop/laptop) */

            @media (max-width: 768px) {
                margin-top: 4rem;
                display: block;
                margin-bottom: 1rem;

                img {
                    width: 100px;
                    height: auto;
                    display: block;
                    margin: 0 auto;
                    transform: scale(3);
                }
            }
        }

        .register-box {
            width: 100%;
            max-width: 550px;
            border-radius: 20px;
            padding: 3rem 2.5rem;
            backdrop-filter: blur(16px);
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            gap: 1.8rem;

            h2 {
                font-size: 2.4rem;
                font-weight: 600;
                text-align: center;
                color: #e6f0ff;
                letter-spacing: 0.5px;
                margin-bottom: 0;
            }

            .subtext {
                font-size: 1rem;
                text-align: center;
                color: #cfd8dc;
                margin-bottom: 0.5rem;
            }

            form {
                display: flex;
                flex-direction: column;
                gap: 2rem;

                input {
                    padding: 14px;
                    border-radius: 10px;
                    background: rgba(255, 255, 255, 0.06);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: #e0e0e0;
                    font-size: 1rem;
                    transition: all 0.3s ease;

                    &:focus {
                        border-color: #2196f3;
                        outline: none;
                        background: rgba(255, 255, 255, 0.08);
                    }
                }

                .password-input {
                    position: relative;

                    input {
                        width: 100%;
                    }

                    .eye-icon {
                        position: absolute;
                        top: 50%;
                        right: 14px;
                        transform: translateY(-50%);
                        color: #ccc;
                        cursor: pointer;
                    }
                }

                .register-btn {
                    background: linear-gradient(135deg, #21a2a7, #a1f0f2);
                    color: white;
                    padding: 14px;
                    border: none;
                    border-radius: 10px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 1rem;
                    transition: background 0.3s ease;

                    &:hover {
                        background: linear-gradient(135deg, #21a2a7, #6fffe9);
                    }
                }
            }

            .register-options {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .link-btn {
                    background: none;
                    border: none;
                    color: #90caf9;
                    font-size: 0.9rem;
                    cursor: pointer;
                    padding: 0;

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
    }

    .register-right {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
        margin-top: 1.7rem;

        img {
            display: flex;
            align-items: center;
            justify-content: center;
            max-width: 100%;
            width: 90%;
            height: auto;
            object-fit: contain;
            border-radius: 20px;
            /* box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5); */
            /* transform: scale(); */
        }

        @media (max-width: 768px) {
            display: none; /* hide the right-side image on mobile */
        }
    }

    @media (max-width: 768px) {
        flex-direction: column;

        .register-left {
            padding-top: 0;
            .register-box {
                padding: 2rem 1.5rem;
                backdrop-filter: blur(10px);
                border-radius: 16px;
                background: rgba(255, 255, 255, 0.04);
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);

                h2 {
                    margin: 0;
                    font-size: 1.9rem;
                }

                .subtext {
                    font-size: 0.95rem;
                }
            }
        }
    }

    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(60, 120, 180, 0.15);
        backdrop-filter: blur(6px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    }

    .loading-container {
        width: 200px;
        height: 200px;

        @media (max-width: 768px) {
            width: 150px;
            height: 150px;
        }

        @media (max-width: 480px) {
            width: 120px;
            height: 120px;
        }
    }
`;

export default Wrapper;
