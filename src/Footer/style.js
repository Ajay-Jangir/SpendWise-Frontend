import styled from 'styled-components';

const Wrapper = styled.div`
    .footer-container {
        width: 100%;
        background-color: #1c1e26;
        color: #ccc;
        padding: 1rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.9rem;
        box-sizing: border-box;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .footer-left,
    .footer-right {
        white-space: nowrap;
    }

    .footer-center {
        display: flex;
        gap: 1.5rem;
        flex-wrap: wrap;
        justify-content: center;

        .footer-link {
            cursor: pointer;
            transition: color 0.3s ease;

            &:hover {
                color: #00b894;
            }
        }

        .footer-support {
            color: #21a2a7;

            &:hover {
                color: #7fdb66ff;
            }
        }
    }

    .footer-modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(6px);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
    }

    .footer-modal {
        background: linear-gradient(135deg, #1f1f2e, #2a2a3e);
        color: #eee;
        border-radius: 12px;
        padding: 2rem;
        padding-top: 0;
        max-width: 600px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        position: relative;

        h2 {
            color: #00b894;
            font-size: 1.5rem;
            margin-bottom: 1rem;
            text-align: center;
        }

        h3 {
            margin-top: 1rem;
            color: #ccc;
            font-size: 1.1rem;
        }

        p {
            font-size: 1rem;
            line-height: 1.6;
            margin-top: 0.4rem;
        }

        a {
            color: #00b894;
            text-decoration: underline;
        }
    }

    .modal-close-btn {
        margin-top: 1.5rem;
        padding: 0.6rem 1.2rem;
        background: #00b894;
        color: #fff;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        display: block;
        margin-left: auto;
        margin-right: auto;
        transition: background 0.3s ease;

        &:hover {
            background: #00a07a;
        }
    }

    @media (max-width: 768px) {
        .footer-container {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 1rem;
            gap: 0.5rem;
        }

        .footer-left {
            font-size: 0.9rem;
            color: #aaa;
        }

        .footer-right {
            display: none;
        }

        .footer-center {
            gap: 1rem;

            .footer-link {
                cursor: pointer;
                transition: color 0.3s ease;

                &:hover {
                    color: #00b894;
                }
            }

            .footer-support {
                color: #21a2a7;

                &:hover {
                    color: #7fdb66ff;
                }
            }
        }

        .footer-modal {
            padding: 1.2rem;
            max-width: 95vw;
            font-size: 0.9rem;

            h2 {
                font-size: 1.3rem;
            }

            h3 {
                font-size: 1rem;
            }

            p {
                font-size: 0.9rem;
            }
        }

        .modal-close-btn {
            font-size: 0.95rem;
            padding: 0.5rem 1rem;
        }
    }
`;

export default Wrapper;