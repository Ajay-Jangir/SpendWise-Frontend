// style.js
import styled from 'styled-components';

const Wrapper = styled.div`
    .top-header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;

        .filters {
            display: flex;
            gap: 1rem;
            align-items: center;

            .filter-group {
                display: flex;
                align-items: center;
                gap: 0.5rem;

                .label {
                    font-size: 1rem;
                    color: #ccc;
                    white-space: nowrap;
                }

                select {
                    padding: 0.4rem 0.6rem;
                    border-radius: 6px;
                    background: #1e1e2f;
                    border: 1px solid #444;
                    color: #fff;
                }
            }
        }

        .center-search {
            flex: 1;
            display: flex;
            justify-content: center;

            .search-input-wrapper {
                position: relative;
                width: 100%;
                max-width: 300px;
            }

            input {
                width: 100%;
                padding: 0.4rem 0.6rem 0.4rem 2rem;
                border-radius: 6px;
                border: 1px solid #444;
                background: #1e1e2f;
                color: #fff;
                font-size: 0.9rem;
                height: 2.5rem;
            }

            .search-icon {
                position: absolute;
                top: 50%;
                left: 0.6rem;
                transform: translateY(-50%);
                color: #888;
                font-size: 0.9rem;
            }
        }

        .actions {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            min-width: 200px;

            .mass-delete-btn {
                background: #e17055;
                color: white;
                border: none;
                padding: 0.5rem 0.9rem;
                border-radius: 6px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 0.4rem;
                height: 40px;
                width: 100px;
                font-size: 0.9rem;
            }

            .mass-delete-placeholder {
                width: 100px; /* Same as .mass-delete-btn */
                height: 40px; /* Same as button height */
            }

            .add-btn {
                background-color: #21a2a7;
                color: white;
                border: none;
                padding: 0.5rem 0.9rem;
                border-radius: 6px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 0.4rem;
                font-size: 0.9rem;
                height: 40px;
            }
        }
    }

    .sticky-month-label {
        position: sticky;
        top: 3.5rem;
        z-index: 50;
        background: linear-gradient(135deg, #1f1f2e, #2a2a3e);
        color: #00cec9;
        padding: 0.3rem 0.8rem;
        font-weight: bold;
        border-radius: 6px;
        width: fit-content;
        align-self: flex-start;
    }

    .table-wrapper {
        background: linear-gradient(135deg, #1f1f2e, #2a2a3e);
        border-radius: 8px;
        overflow-y: auto;
        max-height: calc(100vh - 220px);
        margin-top: 20px;

        table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;

            thead th {
                background: #1f1f2f;
                color: #00b894;
                padding: 0.6rem;
                position: sticky;
                top: 0;
                z-index: 2;
                text-align: left;
            }

            tbody td {
                padding: 0.6rem;
                border-bottom: 1px solid #333;
                color: #fff;
                text-align: left;
            }

            input[type='checkbox'] {
                appearance: none;
                width: 18px;
                height: 18px;
                border: 2px solid #444;
                border-radius: 4px;
                background-color: #1e1e2f;
                cursor: pointer;
                position: relative;
                transition: all 0.2s ease-in-out;
            }

            input[type='checkbox']:checked {
                background-color: #4e54c8;
                border-color: #4e54c8;
            }

            input[type='checkbox']:checked::after {
                content: '';
                position: absolute;
                left: 4px;
                top: 0px;
                width: 5px;
                height: 10px;
                border: solid #fff;
                border-width: 0 2px 2px 0;
                transform: rotate(45deg);
            }

            input[type='checkbox']:hover {
                border-color: #777;
            }

            input[type='checkbox']:focus {
                outline: none;
                box-shadow: 0 0 0 2px rgba(78, 84, 200, 0.4); /* blue glow */
            }

            th:nth-child(2),
            td:nth-child(2) {
                width: 80px;
            }

            th:nth-child(3),
            td.description {
                width: 400px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .no-results td {
                text-align: center;
                padding: 2rem;
                color: #888;
                background-color: #1a1a2a;
                border-bottom: none;
            }

            .month-row td {
                background: #2d3436;
                color: #00cec9;
                font-weight: bold;
                font-size: 0.95rem;
                position: sticky;
                top: 34px;
                z-index: 1;
            }

            .highlight {
                background-color: #2e2e2e;
                animation: fadeOut 5s forwards;
            }

            .actions-col .icon-wrapper {
                display: inline-block;
                margin-right: 1rem;
                vertical-align: middle;
            }

            .actions-col .icon-wrapper:last-child {
                margin-right: 0;
            }

            .actions-col .icon {
                cursor: pointer;
                font-size: 1rem;
            }

            .actions-col .edit {
                color: #0984e3;
            }

            .actions-col .delete {
                color: #e17055;
            }
        }
    }

    .modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(6px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 1rem;
    }

    .modal {
        background: #1e1e2f;
        padding: 1rem;
        border-radius: 12px;
        width: 500px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        animation: fadeInScale 0.3s ease;

        h3 {
            margin-bottom: 1.25rem;
            color: #00b894;
            font-size: 1.2rem;
            text-align: center;
        }

        label {
            display: block;
            margin-bottom: 0.75rem;
            font-size: 0.9rem;
            color: #fff;

            input,
            select {
                margin-top: 0.25rem;
                width: 100%;
                padding: 0.5rem;
                border-radius: 6px;
                background: #121212;
                border: 1px solid #444;
                color: #fff;
                font-size: 0.9rem;
            }

            input:focus,
            select:focus {
                outline: none;
                border-color: #00cec9;
                box-shadow: 0 0 0 2px rgba(0, 206, 201, 0.2);
            }
        }

        .custom-date-input {
            background: #121212;
            color: #fff;
            border: 1px solid #ccc;
            padding: 8px;
            border-radius: 4px;
        }

        .custom-date-input::-webkit-calendar-picker-indicator {
            filter: invert(1);
            cursor: pointer;
        }

        .custom-date-input::-webkit-inner-spin-button,
        .custom-date-input::-webkit-clear-button {
            display: none;
        }

        .category-input-wrapper {
            position: relative;
        }

        .category-input-wrapper label {
            display: block;
        }

        .category-input-wrapper input {
            width: 100%;
        }

        .category-dropdown {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: #1f1f2f;
            border: 1px solid #333;
            border-radius: 5px;
            margin-top: 0.25rem;
            z-index: 10;
            list-style: none;
            max-height: 150px;
            overflow-y: auto;
            padding: 0;
            box-sizing: border-box;
        }

        .category-dropdown li {
            padding: 0.5rem;
            color: #ccc;
            cursor: pointer;
        }

        .category-dropdown li:hover {
            background: #00cec9;
            color: #1f1f2f;
        }

        .modal-actions {
            display: flex;
            justify-content: space-between;
            margin-top: 2rem;

            .import-btn {
                background: #1f1f2f;
                color: #00cec9;
                border: 1px solid #00cec9;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 0.4rem;
                font-size: 0.9rem;
                line-height: 1;
                height: 40px;
                transition: all 0.3s ease;
            }

            .import-btn:hover {
                background: #00cec9;
                color: #1f1f2f;
            }

            .import-btn input {
                display: none;
            }

            .action-buttons button {
                padding: 0.5rem 1rem;
                border-radius: 6px;
                border: none;
                cursor: pointer;
                color: white;
                background-color: #21a2a7;
                font-size: 0.9rem;
                height: 40px;
                transition: background 0.3s ease;
            }

            .action-buttons .cancel {
                background: #636e72;
                margin-left: 0.5rem;
            }

            .action-buttons button:hover {
                filter: brightness(1.1);
            }
            button:focus {
                background-color: #333; /* or any darker shade you want */
                color: white; /* optional, for better contrast */
                outline: none; /* optional, to remove browser default blue outline */
                box-shadow: 0 0 0 2px #b4b2b2ff; /* optional visual focus ring */
            }
        }
    }

    .modal-select {
        margin-top: 0.25rem;
        font-size: 1rem;
        background: #1e1e2f;
    }

    .modal-select .react-select__control {
        background: #1e1e2f;
        border: 1px solid #444;
        border-radius: 8px;
        color: #fff;
        min-height: 40px;
        cursor: pointer;
        padding: 2px 6px;
    }

    .modal-select .react-select__value-container {
        padding: 0 8px;
    }

    .modal-select .react-select__single-value {
        color: #fff;
        font-size: 0.95rem;
    }

    .modal-select .react-select__menu {
        background: #1e1e2f;
        border-radius: 8px;
        margin-top: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        z-index: 9999;
    }

    .modal-select .react-select__control {
        background: #1e1e2f;
        border: 1px solid #444;
        border-radius: 8px;
        color: #fff;
        min-height: 40px;
        cursor: pointer;
        padding: 2px 6px;
    }

    .modal-select .react-select__value-container {
        padding: 0 8px;
    }

    .modal-select .react-select__single-value {
        color: #fff;
        font-size: 0.95rem;
    }

    .modal-select .react-select__menu {
        width: 100% !important;
        min-width: unset !important;
        box-sizing: border-box !important;
        background: #1e1e2f;
        border-radius: 8px;
        margin-top: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        z-index: 9999;
    }

    .modal-select .react-select__option {
        background: #1e1e2f;
        color: #ccc;
        font-size: 0.9rem;
        padding: 8px 12px;
    }

    .modal-select .react-select__option--is-focused {
        background: #2a2a3e;
    }

    .modal-select .react-select__option--is-selected {
        background: #4e54c8;
        color: #fff;
        width: 100% !important;
        min-width: unset !important;
        border-radius: 8px;
    }

    .modal-select .react-select__indicator-separator {
        display: none;
    }

    .modal-select .react-select__dropdown-indicator {
        color: #ccc;
    }

    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    .modal.confirm-delete {
        background: #1e1e2f;
        padding: 2rem;
        border-radius: 10px;
        width: 400px;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);

        h3 {
            margin-bottom: 1rem;
            color: #ff7675;
        }

        p {
            color: #ccc;
            margin-bottom: 1.5rem;
            font-size: 0.95rem;
        }

        .modal-actions {
            display: flex;
            justify-content: space-between;
            margin: 0 18px;

            button {
                padding: 0.5rem 1rem;
                border-radius: 6px;
                border: none;
                cursor: pointer;
                font-size: 0.9rem;
            }

            button:not(.cancel) {
                background: #e17055;
                color: white;
            }

            .cancel {
                background: #636e72;
                color: white;
            }
        }
    }

    @media (max-width: 768px) {
        .table-wrapper {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
        }

        table {
            min-width: 720px;
            table-layout: fixed; /* Keep this to align columns */
        }

        thead th,
        tbody td {
            padding: 0.5rem;
            font-size: 1rem;
            white-space: nowrap;
        }

        thead th {
            position: sticky;
            top: 0;
            background: #1c1e26;
            z-index: 10;
        }

        /* ✅ Retain your original width for description */
        th:nth-child(3),
        td:nth-child(3) {
            width: 250px !important;
            max-width: 250px;
            white-space: normal;
        }

        /* ✅ Enable readable 2-line ellipsis */
        td.description {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;

            overflow: hidden !important;
            text-overflow: ellipsis;

            white-space: normal !important;
            word-break: break-word;
            hyphens: auto;

            max-width: 250px;
            line-height: 1.4rem;

            height: 3.75rem; /* ✅ 2 lines × line-height = 2.8rem */
        }

        td:nth-child(4),
        td:nth-child(5),
        td:nth-child(6),
        td:nth-child(7) {
            min-width: 90px;
            text-align: left;
        }

        th:nth-child(4),
        td:nth-child(4) {
            width: 100px;
            max-width: 100px;
        }

        .modal-select {
            margin-top: 0.25rem;
            font-size: 1rem;
            background: #1e1e2f;
        }

        .modal-select .react-select__control {
            background: #1e1e2f;
            border: 1px solid #444;
            border-radius: 8px;
            color: #fff;
            min-height: 40px;
            cursor: pointer;
            padding: 2px 6px;
        }

        .modal-select .react-select__single-value {
            color: #fff;
            font-size: 0.95rem;
        }

        .modal-select .react-select__menu {
            background: #1e1e2f;
            border-radius: 8px;
            margin-top: 4px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
            z-index: 9999;
        }

        .modal-select .react-select__control {
            background: #1e1e2f;
            border: 1px solid #444;
            border-radius: 8px;
            color: #fff;
            min-height: 40px;
            cursor: pointer;
            padding: 2px 6px;
        }

        .modal-select .react-select__single-value {
            color: #fff;
            font-size: 0.95rem;
        }

        .modal-select .react-select__menu {
            width: 100% !important;
            min-width: unset !important;
            box-sizing: border-box !important;
            background: #1e1e2f;
            border-radius: 8px;
            margin-top: 4px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
            z-index: 9999;
        }

        .modal-select .react-select__option {
            background: #1e1e2f;
            color: #ccc;
            font-size: 0.9rem;
            padding: 8px 12px;
        }

        .modal-select .react-select__option--is-focused {
            background: #2a2a3e;
        }

        .modal-select .react-select__option--is-selected {
            background: #4e54c8;
            color: #fff;
            width: 100% !important;
            min-width: unset !important;
            border-radius: 8px;
        }

        .modal-select .react-select__indicator-separator {
            display: none;
        }

        .modal-select .react-select__dropdown-indicator {
            color: #ccc;
        }

        .modal-select .react-select__value-container {
            padding: 0 !important;
        }

        .center-search {
            justify-content: center;

            .search-input-wrapper {
                width: 100%;
                max-width: 90vw;
            }

            input {
                width: 100% !important;
                min-height: 3rem !important;
            }

            .search-icon {
                font-size: 1rem;
                left: 0.8rem;
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
