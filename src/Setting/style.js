import styled from 'styled-components';

export const Wrapper = styled.div`
    .settings-page {
        color: #fff;
    }

    .page-title {
        font-size: 2rem;
        margin-top: 0;
    }

    .section {
        background: linear-gradient(135deg, #1f1f2e, #2a2a3e);
        padding: 1.5rem;
        border-radius: 12px;
        margin-bottom: 2rem;
    }

    .pswsection {
        background: linear-gradient(135deg, #1f1f2e, #2a2a3e);
        padding: 1.5rem;
        border-radius: 12px;
    }

    .section-title {
        margin-top: 0;
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
    }

    .userInfo-container {
        display: flex;
        justify-content: space-between;
        gap: 2rem;
        flex-wrap: wrap;
    }

    .user-fields {
        flex: 1;
        min-width: 40rem;
    }

    .input-row label {
        min-width: 70px;
        text-align: left;
        font-weight: 500;
        font-size: 0.95rem;
    }

    .input-row {
        display: flex;
        align-items: center;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
    }

    input {
        flex: 1;
        min-width: 0;
        padding: 10px;
        border-radius: 8px;
        border: 1px solid #444;
        background-color: #1c1d22;
        color: #fff;
        font-size: 1rem;
    }

    .input-group {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 40%;
    }

    input:disabled {
        background-color: #2b2d35;
        opacity: 0.8;
        cursor: not-allowed;
    }

    .icon-btn {
        background: transparent;
        border: none;
        color: #ccc;
        cursor: pointer;
        transition: 0.2s;
        align-items: center;
    }

    .icon-btn.save {
        padding: 0.5rem 1rem;
        border-radius: 6px;
        border: none;
        cursor: pointer;
        color: white;
        background: #00b894;
        font-size: 0.9rem;
        height: 40px;
        transition: background 0.3s ease;
    }

    .icon-btn.edit:hover {
        color: #4fc3f7;
    }

    .icon-btn.save:hover {
        color: #040b05ff;
    }

    .icon-btn.close {
        color: #999;
    }

    .user-avatar {
        width: 150px;
        height: 150px;
        background: linear-gradient(to right, #4e54c8, #8f94fb);
        color: #000;
        font-size: 5rem;
        font-weight: bold;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: uppercase;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
        margin-right: 5rem;
        margin-top: -40px;
    }

    .reset-btn {
        background: linear-gradient(to right, #4e54c8, #8f94fb);
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        font-weight: 500;
        cursor: pointer;
        color: #000;
    }

    .reset-btn:hover {
        background: #4398c0ff;
    }

    .modal-backdrop {
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        backdrop-filter: blur(3px);
    }

    .modal-content {
        width: 420px;
        background: linear-gradient(135deg, #1f1f2e, #2a2a3e);
        padding: 2rem;
        border-radius: 12px;
        color: #fff;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        animation: fadeIn 0.3s ease;
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    }

    .modal-header h3 {
        margin: 0;
        font-size: 1.2rem;
    }

    .modal-content input {
        width: 100%;
        padding: 10px;
        margin-bottom: 1rem;
        border-radius: 8px;
        border: 1px solid #555;
        background-color: #1c1d22;
        color: #fff;
    }

    .modal-actions {
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;
    }

    .primary-btn {
        background-color: #4caf50;
        color: white;
        border: none;
        padding: 10px 16px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 500;
    }

    .primary-btn:hover {
        background-color: #43a047;
    }

    .cancel-btn {
        background-color: #e53935;
        color: white;
        border: none;
        padding: 10px 16px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 500;
    }

    .cancel-btn:hover {
        background-color: #c62828;
    }

    .password-wrapper {
        position: relative;
        margin-bottom: 1rem;

        input {
            width: 100%;
            padding: 0.6rem 2.5rem 0.6rem 0.8rem;
            border-radius: 8px;
            border: 1px solid #444;
            background: #1e1e2f;
            color: #fff;
            font-size: 0.95rem;
        }

        .eye-icon {
            position: absolute;
            top: 40%;
            right: 12px;
            transform: translateY(-50%);
            cursor: pointer;
            color: #ccc;
        }

        .eye-icon:hover {
            color: #00b894;
        }
    }

    @keyframes fadeIn {
        from {
            transform: scale(0.95);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }

    @media (max-width: 768px) {
        .modal-content {
            width: 90vw !important;
            max-width: 90vw;
            box-sizing: border-box;
            padding: 1.5rem !important;
        }
    }
`;
