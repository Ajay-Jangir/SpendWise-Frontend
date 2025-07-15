import styled from 'styled-components';

export const Wrapper = styled.div`
    color: #fff;

    .header-row {
        display: flex;
        justify-content: space-between;

        h2 {
            margin-top: 0;
            font-size: 2rem;
            font-weight: 600;
        }

        .actions {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 1.5rem;
            flex-direction: column;

            .filter-block {
                display: flex;
                flex-direction: row;
                gap: 1rem;
                flex: 1;
            }

            .modal-select {
                min-width: 160px;
                background: #1e1e2f;
                font-size: 0.95rem;
            }

            .modal-select.disabled {
                opacity: 0.3;
                pointer-events: none;
            }

            .custom-range-row {
                margin-top: 24px;
                display: grid;
                grid-template-columns: auto 1fr auto 1fr;
                align-items: center;
                gap: 0.75rem;

                label {
                    color: #ccc;
                    font-size: 0.9rem;
                    white-space: nowrap;
                }
            }

            button {
                width: 100%;
                height: 3rem;
                background: linear-gradient(to right, #4e54c8, #8f94fb);
                color: #fff;
                border: none;
                border-radius: 12px;
                font-weight: 600;
                cursor: pointer;
                transition: background 0.3s ease;

                &:hover {
                    background: linear-gradient(to right, #3e42a1, #7d83f5);
                }

                &.export-btn {
                    background: #1e1e2f;
                    border: 1px solid #555;

                    &:hover {
                        background: #444;
                    }
                }
            }

            @media (max-width: 768px) {
                flex-direction: column;

                .modal-select {
                    min-width: 40%;
                    background: #1e1e2f;
                    font-size: 0.95rem;
                }

                button {
                    display: flex;
                    align-items: center;
                }
            }
        }
    }

    .insight-section {
        .summary {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;

            .box {
                background: linear-gradient(135deg, #1f1f2e, #2a2a3e);
                padding: 1.25rem;
                border-radius: 16px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
                display: flex;
                flex-direction: column;
                justify-content: center;
                cursor: default;
            }

            .label {
                font-size: 16px;
                color: #ccccdd;
                margin-bottom: 0.25rem;
                font-weight: 500;
                letter-spacing: 0.5px;
            }

            .value {
                font-size: 28px;
                font-weight: 700;
                color: #ffffff;

                &.profit {
                    color: #00e676;
                }
                &.loss {
                    color: #ff5252;
                }
            }
        }

        .chart-section {
            display: flex;
            gap: 2rem;

            .pie-box,
            .top-expenses {
                background: linear-gradient(135deg, #1f1f2e, #2a2a3e);
                flex: 1;
                min-height: 270px;
                padding: 1rem;
                padding-top: 0;
                border-radius: 16px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

                h3 {
                    margin-bottom: 5px;
                    font-size: 1.2rem;
                    font-weight: 600;
                }

                .empty-pie-message {
                    width: 100%;
                    height: 270px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #aaa;
                    font-size: 1rem;
                    text-align: center;
                    border-radius: 12px;
                }
            }

            .pie-box {
                display: flex;
                flex-direction: column;

                .pie-row {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    flex: 1;
                }

                .chart-wrapper {
                    flex: 1;
                }

                .category-legend {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    padding: 0 1rem;
                    overflow-y: auto;
                    max-height: 200px;
                    scrollbar-width: thin;
                    padding-right: 2rem;
                }

                .legend-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #dfe6e9;
                    font-size: 0.75rem;
                }

                .legend-color {
                    width: 12px;
                    height: 12px;
                    border-radius: 2px;
                    display: inline-block;
                }
            }

            .top-expenses {
                padding-top: 0;

                ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;

                    li {
                        display: flex;
                        justify-content: space-between;
                        padding: 0.6rem 0;
                        border-bottom: 1px solid #333;
                        font-size: 1rem;

                        span:first-child {
                            color: #bbb;
                        }

                        span:last-child {
                            font-weight: 600;
                        }
                    }
                }

                .month-name {
                    font-weight: 700;
                    color: #fff;
                }
            }
        }
    }

    .compare-section {
        .summary {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;

            .box {
                background: linear-gradient(135deg, #1f1f2e, #2a2a3e);
                padding: 1.25rem;
                border-radius: 16px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
                display: flex;
                flex-direction: column;
                justify-content: center;
                cursor: default;
            }

            .label {
                font-size: 16px;
                color: #ccccdd;
                margin-bottom: 0.25rem;
                font-weight: 500;
                letter-spacing: 0.5px;
            }

            .value {
                font-size: 28px;
                font-weight: 700;
                color: #ffffff;

                &.profit {
                    color: #00e676;
                }
                &.loss {
                    color: #ff5252;
                }
            }
        }

        .month-selectors {
            display: flex;
            gap: 1rem;
            margin-bottom: 1.5rem;
            justify-content: flex-end;

            select {
                background: #1e1e2f;
                color: #fff;
                border: 1px solid #444;
                padding: 0.5rem 0.8rem;
                border-radius: 8px;
            }

            .custom-range-row {
                display: grid;
                grid-template-columns: auto 1fr auto 1fr;
                align-items: center;
                gap: 0.75rem;

                label {
                    color: #ccc;
                    font-size: 0.9rem;
                    white-space: nowrap;
                }
            }
        }

        .compare-grid {
            display: flex;
            gap: 2rem;
            flex-wrap: wrap;

            .compare-box {
                flex: 1 1 300px;
                background: linear-gradient(135deg, #1f1f2e, #2a2a3e);
                padding: 1.5rem;
                padding-top: 0;
                border-radius: 16px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

                h4 {
                    font-size: 1.2rem;
                    margin-bottom: 1rem;
                }

                p {
                    font-size: 1rem;
                    margin-bottom: 0.3rem;
                }

                h5 {
                    margin-top: 1rem;
                    margin-bottom: 1rem;
                    font-size: 1rem;
                    font-weight: 600;
                }

                ul {
                    list-style: none;
                    padding: 0;

                    li {
                        display: flex;
                        justify-content: space-between;
                        border-bottom: 1px solid #333;
                        padding: 0.5rem 0;
                        font-size: 1rem;

                        span:first-child {
                            color: #bbb;
                        }

                        span:last-child {
                            font-size: 16px;
                            color: #ccccdd;
                            margin-bottom: 0.25rem;
                            font-weight: 500;
                            letter-spacing: 0.5px;
                        }
                    }
                }

                .pie-row {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    flex: 1;
                }

                .chart-wrapper {
                    flex: 1;
                }

                .category-legend {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    padding: 0 1rem;
                    overflow-y: auto;
                    max-height: 200px;
                    scrollbar-width: thin;
                    padding-right: 2rem;
                }

                .legend-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #dfe6e9;
                    font-size: 0.75rem;
                }

                .legend-color {
                    width: 12px;
                    height: 12px;
                    border-radius: 2px;
                    display: inline-block;
                }

                .empty-pie-message {
                    width: 100%;
                    height: 85px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #aaa;
                    font-size: 1rem;
                    text-align: center;
                    border-radius: 12px;
                }

                .month-name {
                    font-weight: 700;
                    color: #fff;
                }
            }
        }
    }

    .export-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(6px);
        background-color: rgba(0, 0, 0, 0.4);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }

    .export-modal {
        background: linear-gradient(135deg, #1f1f2e, #2a2a3e);
        padding: 2rem;
        border-radius: 16px;
        width: 100%;
        max-width: 450px;
        color: #fff;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
    }

    .modal-title {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        text-align: center;
    }

    .modal-section {
        margin-bottom: 1.2rem;
    }

    .modal-select,
    .custom-date-input {
        font-size: 1rem;
        background: #1e1e2f;
        width: 100%;
        margin-top: 0.4rem;
        background: #1e1e2f;
        border: none;
        border-radius: 8px;
        color: #fff;
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
        color: #fff;
        width: 95% !important;
        min-width: unset !important;
        border-radius: 8px;
        margin-left: 2.5px;
        margin-right: 2.5px;
    }

    .modal-select .react-select__option--is-selected {
        background: #4e54c8;
        color: #fff;
        width: 95% !important;
        min-width: unset !important;
        border-radius: 8px;
        margin-left: 2.5px;
        margin-right: 2.5px;
    }

    .modal-select .react-select__indicator-separator {
        display: none;
    }

    .modal-select .react-select__dropdown-indicator {
        color: #ccc;
    }

    .custom-range {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
        flex-direction: column;
    }

    .custom-date-input {
        background: #121212;
        color: #fff;
        border: 1px solid #ccc;
        padding: 8px;
        border-radius: 4px;
    }

    /* Target the calendar icon */
    .custom-date-input::-webkit-calendar-picker-indicator {
        filter: invert(1); /* Inverts icon color to white */
        cursor: pointer;
    }

    .custom-date-input::-webkit-inner-spin-button,
    .custom-date-input::-webkit-clear-button {
        display: none;
    }

    .modal-actions {
        display: flex;
        justify-content: space-between;
        margin-top: 2rem;
    }

    .export-btn {
        padding: 0.6rem 1.2rem;
        font-size: 1rem;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        transition: 0.3s ease;
    }

    .export-btn.primary {
        background-color: #0ba3fb;
        color: white;
    }

    .export-btn.cancel {
        background-color: #444;
        color: #eee;
    }

    .export-btn:hover {
        opacity: 0.9;
    }

    .recharts-tooltip-wrapper {
        font-size: 1rem !important;
    }

    .recharts-tooltip-item-list {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .recharts-default-tooltip {
        background-color: #1e1e2f !important;
        color: #fff !important; /* 💡 force white font */
        border: none !important;
        border-radius: 6px !important;
        padding: 6px 10px !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
        font-size: 0.95rem !important;
    }

    .recharts-tooltip-item {
        color: #fff !important; /* 💡 ensure white text */
    }

    .recharts-tooltip-label {
        color: #ccc !important;
    }

    .filter-modal-select,
    .custom-date-input {
        font-size: 1rem;
    }

    .filter-modal-select .react-select__control {
        background: #1e1e2f;
        border: 1px solid #444;
        border-radius: 8px;
        color: #fff;
        min-height: 40px;
        cursor: pointer;
        padding: 2px 6px;
    }

    .filter-modal-select .react-select__value-container {
        padding: 0 8px;
    }

    .filter-modal-select .react-select__single-value {
        color: #fff;
        font-size: 0.95rem;
    }

    .filter-modal-select .react-select__menu {
        background: #1e1e2f;
        border-radius: 8px;
        margin-top: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        z-index: 9999;
    }

    .filter-modal-select .react-select__control {
        background: #1e1e2f;
        border: 1px solid #444;
        border-radius: 8px;
        color: #fff;
        min-height: 40px;
        cursor: pointer;
        padding: 2px 6px;
    }

    .filter-modal-select .react-select__value-container {
        padding: 0 8px;
    }

    .filter-modal-select .react-select__single-value {
        color: #fff;
        font-size: 0.95rem;
    }

    .filter-modal-select .react-select__menu {
        width: 100% !important;
        min-width: unset !important;
        box-sizing: border-box !important;
        background: #1e1e2f;
        border-radius: 8px;
        margin-top: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        z-index: 9999;
    }

    .filter-modal-select .react-select__option {
        background: #1e1e2f;
        color: #ccc;
        font-size: 0.9rem;
        padding: 8px 12px;
    }

    .filter-modal-select .react-select__option--is-focused {
        background: #2a2a3e;
    }

    .filter-modal-select .react-select__option--is-selected {
        background: #4e54c8;
        color: #fff;
        width: 95% !important;
        min-width: unset !important;
        border-radius: 8px;
        margin-left: 2.5px;
        margin-right: 2.5px;
    }

    .filter-modal-select .react-select__indicator-separator {
        display: none;
    }

    .filter-modal-select .react-select__dropdown-indicator {
        color: #ccc;
    }

    .description {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden !important;
        text-overflow: ellipsis;
        white-space: normal !important;
        word-break: break-word;
        hyphens: auto;
        max-width: 32vw;
        line-height: 1.4rem;
    }

    @media (max-width: 768px) {
        .insight-cards {
            flex-direction: column;
        }

        .chart-section {
            flex-direction: column;
        }

        .compare-grid {
            flex-direction: column;
        }

        .header-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
        }

        li .description {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden !important;
            text-overflow: ellipsis;
            white-space: normal !important;
            word-break: break-word;
            hyphens: auto;
            max-width: 210px;
            line-height: 1.4rem;
            height: 3rem;
        }

        .export-modal {
            width: 90vw !important;
            max-width: 90vw;
            box-sizing: border-box;
            padding: 1.5rem !important;
        }

        .chart-wrapper {
            height: 100% !important; /* adjust as needed */
            width: 100% !important;  /* adjust as needed */
        }

        .pie-row {
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .chart-wrapper {
            width: 100%;
            display: flex;
            justify-content: center;
        }

        .category-legend {
            text-align: left;
            align-self: flex-start;
            padding-right:20px;
        }

        .legend-item {
            font-size: 1rem !important;
        }
    }
`;
