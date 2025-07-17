import styled from 'styled-components';
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    color: #fff;

    .summary {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;

        .box {
            background: linear-gradient(135deg, #1f1f2e, #2a2a3e);
            padding: 1.25rem 1.25rem;
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

    .charts {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;

        .pie-box {
            display: flex;
            flex-direction: column;
            background: linear-gradient(135deg, #1f1f2e, #2a2a3e);
            flex: 1;
            min-height: 270px;
            padding: 1rem;
            padding-top: 0;
            border-radius: 16px;

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

            .pie-row {
                display: flex;
                align-items: center;
                gap: 1.5rem;
                flex: 1;
            }

            .chart-wrapper {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .category-legend {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                padding: 0 1rem;
                max-height: 200px;
                overflow-y: auto;
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

        .chart-box {
            background: linear-gradient(135deg, #1f1f2e, #2a2a3e);
            padding: 1rem;
            border-radius: 12px;
            min-height: 350px;
            display: flex;
            flex-direction: column;

            .chart-box > div:last-child {
                flex-grow: 1;
                min-height: 300px;
            }

            .chart-header {
                display: flex;
                flex-direction: column;
                margin-bottom: 0.5rem;
            }

            .chart-header h3 {
                font-size: 1.2rem;
                color: #fff;
            }

            .year-totals {
                display: flex;
                justify-content: space-around;
                flex-wrap: wrap;
                font-size: 0.95rem;
                color: #ccc;

                .income {
                    color: #00b894;
                }

                .expense {
                    color: #e17055;
                }
            }
        }
    }

    .transactions {
        background: linear-gradient(135deg, #1f1f2e, #2a2a3e);
        padding: 1rem;
        border-radius: 12px;

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 0.5rem;

            th,
            td {
                padding: 0.5rem;
                text-align: left;
                border-bottom: 1px solid #333;
            }

            th {
                color: #00b894;
            }
        }

        td.description {
            max-width: 500px;
            width: 500px;
        }

        td.description span {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 450px;
            white-space: normal;
            word-break: break-word;
            pointer-events: none;
        }
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

    @media (max-width: 768px) {
        .transactions {
            overflow-x: auto;

            table {
                min-width: 600px;
                width: 100%;
            }

            th,
            td {
                white-space: nowrap;
                font-size: 1rem;
            }

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
            }
        }

        .chart-section {
            flex-direction: column;
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
            padding-right: 20px;
        }

        .legend-item {
            font-size: 1rem !important;
        }

        .chart-box {
            min-height: 350px !important;
            padding: 0.25rem !important;

            .chart-box > div:last-child {
                min-height: 200px !important;
                height: 200px !important;
            }

            .chart-header h3 {
                font-size: 1rem;
            }

            .year-totals {
                gap: 4px;
                font-size: 1rem;
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
