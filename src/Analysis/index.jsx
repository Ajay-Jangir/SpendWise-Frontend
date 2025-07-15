// AnalysisPage/index.jsx
import { format, isWithinInterval, parseISO } from "date-fns";
import { useMemo, useState, useEffect } from "react";
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip
} from "recharts";
import { Wrapper } from "./style";

const dummyTransactions = [
    { date: '2025-07-01', description: 'Monthly Salary', category: 'Job', type: 'income', amount: 55340.75 },
    { date: '2025-02-03', description: 'Grocery Shopping at Big Bazaar', category: 'Groceries', type: 'expense', amount: 3278.90 },
    { date: '2025-07-14', description: 'Movie Night - PVR Cinemas', category: 'Entertainment', type: 'expense', amount: 9534.25 },
    { date: '2025-07-07', description: 'Freelance Project Payment', category: 'Freelancing', type: 'income', amount: 12145.60 },
    { date: '2025-07-05', description: 'House Rent for April', category: 'Housing', type: 'expense', amount: 15037.00 },
    { date: '2025-05-12', description: 'Electricity and Water Bill', category: 'Utilities', type: 'expense', amount: 29178.22 },
    { date: '2025-07-10', description: 'Cab to Airport - Ola', category: 'Transport', type: 'expense', amount: 7832.15 },
    { date: '2025-08-15', description: 'Dinner at The Leela Palace', category: 'Food', type: 'expense', amount: 41065.99 },
    { date: '2025-07-10', description: 'Amazon Festival Sale - Shoes', category: 'Shopping', type: 'income', amount: 42420.48 },
    { date: '2025-07-18', description: 'Groceries - Reliance Fresh', category: 'Groceries', type: 'expense', amount: 26440.50 },
    { date: '2025-07-20', description: 'Grocery Shopping at Big Bazaar Grocery Shopping at Big Bazaar Grocery Shopping at BGrocery Shopping at Big Bazaar Grocery Shopping at Big Bazaar Grocery Shopping at Big Bazaar', category: 'Entertainment', type: 'expense', amount: 1523.35 },
    { date: '2025-07-22', description: 'Mobile Recharge - Airtel', category: 'Utilities', type: 'expense', amount: 29988.10 },
    { date: '2025-07-25', description: 'Bought Monthly Medicine', category: 'Health', type: 'expense', amount: 1.45 },
    { date: '2025-08-30', description: 'Friend’s Wedding Gift', category: 'Personal', type: 'expense', amount: 3187.77 },
    { date: '2025-07-10', description: 'Winter Wear from Myntra', category: 'Shoping', type: 'expense', amount: 38291.63 },
    { date: '2025-07-10', description: 'Winter Wear from Myntra', category: 'Shoppng', type: 'expense', amount: 38291.63 },
    { date: '2025-07-10', description: 'Winter Wear from Myntra', category: 'hoping', type: 'expense', amount: 38291.63 },
    { date: '2025-07-10', description: 'Winter Wear from Myntra', category: 'hopping', type: 'expense', amount: 38291.63 },
    { date: '2025-07-10', description: 'Winter Wear from Myntra', category: 'Shoppg', type: 'expense', amount: 38291.63 },
    { date: '2025-07-10', description: 'Winter Wear from Myntra', category: 'Shopping', type: 'expense', amount: 38291.63 },
    { date: '2025-07-10', description: 'Winter Wear from Myntra', category: 'Shopping', type: 'expense', amount: 38291.63 },
    { date: '2025-07-10', description: 'Winter Wear from Myntra', category: 'Shog', type: 'expense', amount: 38291.63 },
    { date: '2025-07-10', description: 'Winter Wear from Myntra', category: 'Shopping', type: 'expense', amount: 38291.63 },
    { date: '2025-07-10', description: 'Winter Wear from Myntra', category: 'Shopping', type: 'expense', amount: 38291.63 },
    { date: '2025-07-10', description: 'Winter Wear from Myntra', category: 'Shg', type: 'expense', amount: 38291.63 },
    { date: '2025-07-10', description: 'Winter Wear from Myntra', category: 'Shoppig', type: 'expense', amount: 38291.63 },
    { date: '2025-07-10', description: 'Winter Wear from Myntra', category: 'Shing', type: 'expense', amount: 38291.63 },
    { date: '2025-12-27', description: 'Payment from Fiverr Client', category: 'Freelancing', type: 'income', amount: 8089.80 },
    { date: '2025-07-28', description: 'Payment from Fiverr Client', category: 'Freelancing', type: 'income', amount: 8123.90 }
];


const COLORS = [
    '#FF5733', '#0ba3fb', '#8D33FF', '#33FF57', '#FFC300',
    '#FF33A1', '#00D1FF', '#FF9F1C', '#2EC4B6', '#7F00FF'
];

const formatINR = (amount) => {
    const absAmount = Math.abs(amount);

    if (absAmount >= 1e7)
        return `${amount < 0 ? "-₹" : "₹"} ${(absAmount / 1e7).toFixed(2)} Cr`;

    if (absAmount >= 1e5)
        return `${amount < 0 ? "-₹" : "₹"} ${(absAmount / 1e5).toFixed(2)} L`;

    return `${amount < 0 ? "-₹" : "₹"} ${absAmount.toLocaleString("en-IN", {
        maximumFractionDigits: 2,
    })}`;
};
;

const selectOptions = [
    { value: 'thisMonth', label: 'This Month' },
    { value: 'previousMonth', label: 'Previous Month' },
    { value: 'last6Months', label: 'Last 6 Months' },
    { value: 'custom', label: 'Custom Range' },
];

const generateMonthOptions = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1); // Jan 1st
    const months = [];

    while (start <= now) {
        const value = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}-01`;
        const label = format(start, 'MMMM yyyy');
        months.push({ value, label });
        start.setMonth(start.getMonth() + 1);
    }

    return months;
};


const AnalysisPage = () => {
    const now = new Date();
    const [filterMode, setFilterMode] = useState("thisMonth");
    const [compare, setCompare] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);
    const [exportOption, setExportOption] = useState("thisMonth");
    const [previousFilterMode, setPreviousFilterMode] = useState("thisMonth");
    const [isMobile, setIsMobile] = useState(false);
    const [exportRange, setExportRange] = useState({
        from: `${now.getFullYear()}-01-01`,
        to: now.toISOString().split('T')[0]
    })

    const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1);
    const prevPrevMonth = new Date(now.getFullYear(), now.getMonth() - 2);
    const formatMonth = (d) => d.toISOString().slice(0, 7);

    const [compareMonths, setCompareMonths] = useState([
        formatMonth(prevMonth),
        formatMonth(prevPrevMonth)
    ]);

    const [customRange, setCustomRange] = useState({
        from: `${now.getFullYear()}-01-01`,
        to: now.toISOString().split('T')[0]
    });

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile(); // Initial check
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const getFilteredTransactions = (filterKey) => {
        const now = new Date();
        const range = {
            thisMonth: [format(now, "yyyy-MM")],
            previousMonth: [format(new Date(now.getFullYear(), now.getMonth() - 1), "yyyy-MM")],
            last6Months: Array.from({ length: 6 }, (_, i) =>
                format(new Date(now.getFullYear(), now.getMonth() - i), "yyyy-MM")
            ),
            custom: dummyTransactions.filter((tx) =>
                isWithinInterval(parseISO(tx.date), {
                    start: parseISO(customRange.from),
                    end: parseISO(customRange.to),
                })
            ),
        };

        if (filterKey === "custom") return range.custom;

        return dummyTransactions.filter((tx) =>
            range[filterKey].includes(tx.date.slice(0, 7))
        );
    };

    const generateSummary = (transactions) => {
        const income = transactions.filter((t) => t.type === "income").reduce((a, b) => a + b.amount, 0);
        const expense = transactions.filter((t) => t.type === "expense").reduce((a, b) => a + b.amount, 0);
        const pieMap = {};
        transactions.forEach((tx) => {
            if (tx.type === "expense") pieMap[tx.category] = (pieMap[tx.category] || 0) + tx.amount;
        });
        const pieChartData = Object.entries(pieMap).map(([name, value]) => ({ name, value }));
        const topExpenses = transactions.filter((t) => t.type === "expense").sort((a, b) => b.amount - a.amount).slice(0, 6);
        return { income, expense, balance: income - expense, pieChartData, topExpenses };
    };

    const filteredData = useMemo(() => {
        if (filterMode === "custom") {
            const fromMonth = customRange.from.slice(0, 7);
            const toMonth = customRange.to.slice(0, 7);
            if (customRange.from > customRange.to) return [];
            const data = dummyTransactions.filter((tx) => {
                const txMonth = tx.date.slice(0, 7);
                return txMonth >= fromMonth && txMonth <= toMonth;
            });

            return data;
        }

        return getFilteredTransactions(filterMode);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterMode, customRange]);
    const currentSummary = useMemo(() => generateSummary(filteredData), [filteredData]);

    const comparisonSummaries = useMemo(() => {
        if (!compare) return null;
        return compareMonths.map((month) => {
            const monthData = dummyTransactions.filter((t) => t.date.startsWith(month));
            return { month, ...generateSummary(monthData) };
        });
    }, [compare, compareMonths]);

    const handleDummyExport = () => {
        try {
            const content = "Dummy SpendWise Report\n\nExported at: " + new Date().toLocaleString();
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "DummySpendWiseReport.txt";
            link.click();
            URL.revokeObjectURL(url);

            toast.success("Report Exported Successfully");
        } catch (error) {
            toast.error("Failed to export report.");
            console.error(error);
        }
        setShowExportModal(false);
    };


    const renderCustomizedLabel = ({ value }) => `${formatINR(value)}`;

    return (
        <Wrapper>
            <div className="header-row">
                <h2>Spending Analysis</h2>
                <div className="actions">
                    <div className="filter-block">
                        <Select
                            className={`modal-select ${compare ? "disabled" : ""}`}
                            classNamePrefix="react-select"
                            isSearchable={false}
                            isDisabled={compare}
                            options={selectOptions}
                            value={selectOptions.find(opt => opt.value === filterMode)}
                            onChange={(selected) => {
                                const value = selected.value;
                                setFilterMode(value);
                                if (value === "custom") {
                                    setCustomRange((prev) => ({ ...prev }));
                                }
                            }}
                        />
                        <button
                            onClick={() => {
                                const toggled = !compare;
                                setCompare(toggled);

                                if (toggled) {
                                    if (filterMode === "custom") {
                                        setPreviousFilterMode("custom");
                                        setFilterMode("thisMonth");
                                    } else {
                                        setPreviousFilterMode(null);
                                    }
                                } else {
                                    if (previousFilterMode === "custom") {
                                        setFilterMode("custom");
                                    }
                                }
                            }}
                        >
                            {compare ? "Cancel Compare" : "Compare Months"}
                        </button>

                        <button className="export-btn" onClick={() => setShowExportModal(true)}>
                            Export PDF
                        </button>
                    </div>
                    {filterMode === "custom" && (
                        <div className="custom-range-row">
                            <label>From</label>
                            <Select
                                className="filter-modal-select"
                                classNamePrefix="react-select"
                                isSearchable={false}
                                options={generateMonthOptions().filter(opt => opt.value <= customRange.to)}
                                value={generateMonthOptions().find(opt => opt.value === customRange.from)}
                                onChange={(selected) =>
                                    setCustomRange((prev) => ({ ...prev, from: selected.value }))
                                }
                            />
                            <label>To</label>
                            <Select
                                className="filter-modal-select"
                                classNamePrefix="react-select"
                                isSearchable={false}
                                options={generateMonthOptions().filter(opt => opt.value >= customRange.from)}
                                value={generateMonthOptions().find(opt => opt.value === customRange.to)}
                                onChange={(selected) =>
                                    setCustomRange((prev) => ({ ...prev, to: selected.value }))
                                }
                            />
                        </div>
                    )}
                </div>

            </div>

            {!compare && (
                <div className="insight-section">
                    <div className="summary">
                        <div className="box">
                            <div className="label">Total Income</div>
                            <div className="value">{formatINR(currentSummary.income)}</div>
                        </div>
                        <div className="box">
                            <div className="label">Total Expenses</div>
                            <div className="value">{formatINR(currentSummary.expense)}</div>
                        </div>
                        <div className="box">
                            <div className="label">Total Balance</div>
                            <div className={`value ${currentSummary.balance >= 0 ? "profit" : "loss"}`}>
                                {formatINR(currentSummary.balance)}
                            </div>
                        </div>
                        <div className="box">
                            <div className="label">Top Spent Category</div>
                            <div className="value">
                                {currentSummary.pieChartData.sort((a, b) => b.value - a.value)[0]?.name || "N/A"}
                            </div>
                        </div>
                    </div>

                    <div className="chart-section">
                        <div className="pie-box">
                            <h3>Spending by Category</h3>
                            {currentSummary.pieChartData.length === 0 ? (
                                <div className="empty-pie-message">
                                    No transactions available for the selected period.
                                </div>
                            ) : (
                                <div className="pie-row">
                                    <div className="chart-wrapper">
                                        <ResponsiveContainer width="100%" height={270}>
                                            <PieChart>
                                                <Pie
                                                    data={currentSummary.pieChartData}
                                                    dataKey="value"
                                                    nameKey="name"
                                                    outerRadius={isMobile ? 65 : 95}
                                                    minAngle={15}
                                                    label={renderCustomizedLabel}
                                                >
                                                    {currentSummary.pieChartData.map((_, index) => (
                                                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>

                                    <div className="category-legend">
                                        {currentSummary.pieChartData.map((entry, index) => (
                                            <div className="legend-item" key={index}>
                                                <span
                                                    className="legend-color"
                                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                                ></span>
                                                <span className="legend-label">{entry.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="top-expenses">
                            <h3>Highest Expenses</h3>
                            <ul>
                                {currentSummary.topExpenses.length === 0 ? (
                                    <li className="empty-pie-message">
                                        No transactions available for this month.
                                    </li>
                                ) : (
                                    currentSummary.topExpenses.map((tx, i) => (
                                        <li key={i}>
                                            <span className="description"><strong>{format(parseISO(tx.date), 'MMMM')}</strong>: {tx.description} ({tx.category})</span>
                                            <span>{formatINR(tx.amount)}</span>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {compare && (
                <div className="compare-section">
                    <div className="month-selectors">
                        <div className="custom-range-row">
                            <label>From</label>
                            <Select
                                className="filter-modal-select"
                                classNamePrefix="react-select"
                                isSearchable={false}
                                value={{
                                    value: compareMonths[0],
                                    label: format(new Date(`${compareMonths[0]}-01`), 'MMMM yyyy')
                                }}
                                options={[...new Set(dummyTransactions.map(tx => tx.date.slice(0, 7)))].map(m => ({
                                    value: m,
                                    label: format(new Date(`${m}-01`), 'MMMM yyyy')
                                }))}
                                onChange={(selected) => {
                                    const newMonths = [...compareMonths];
                                    newMonths[0] = selected.value;
                                    setCompareMonths(newMonths);
                                }}
                            />

                            <label>To</label>
                            <Select
                                className="filter-modal-select"
                                classNamePrefix="react-select"
                                isSearchable={false}
                                value={{
                                    value: compareMonths[1],
                                    label: format(new Date(`${compareMonths[1]}-01`), 'MMMM yyyy')
                                }}
                                options={[...new Set(dummyTransactions.map(tx => tx.date.slice(0, 7)))].map(m => ({
                                    value: m,
                                    label: format(new Date(`${m}-01`), 'MMMM yyyy')
                                }))}
                                onChange={(selected) => {
                                    const newMonths = [...compareMonths];
                                    newMonths[1] = selected.value;
                                    setCompareMonths(newMonths);
                                }}
                            />
                        </div>
                    </div>

                    <div className="compare-grid">
                        {comparisonSummaries?.map((data, idx) => (
                            <div className="compare-box" key={idx}>
                                <h4>{format(new Date(`${data.month}-01`), 'MMMM yyyy')}</h4>
                                <div className="summary">
                                    <div className="box">
                                        <div className="label">Total Income</div>
                                        <div className="value">{formatINR(data.income)}</div>
                                    </div>
                                    <div className="box">
                                        <div className="label">Total Expenses</div>
                                        <div className="value">{formatINR(data.expense)}</div>
                                    </div>
                                    <div className="box">
                                        <div className="label">Total Balance</div>
                                        <div className={`value ${data.balance >= 0 ? "profit" : "loss"}`}>
                                            {formatINR(data.balance)}
                                        </div>
                                    </div>
                                    <div className="box">
                                        <div className="label">Top Spent Category</div>
                                        <div className="value">
                                            {data.pieChartData.sort((a, b) => b.value - a.value)[0]?.name || "N/A"}
                                        </div>
                                    </div>
                                </div>
                                {currentSummary.pieChartData.length === 0 ? (
                                    <div className="empty-pie-message">
                                        No transactions available for this month.
                                    </div>
                                ) : (
                                    <>
                                        <h5>Spending by Category</h5>
                                        <div className="pie-row">
                                            <div className="chart-wrapper">
                                                <ResponsiveContainer width="100%" height={200}>
                                                    <PieChart>
                                                        <Pie
                                                            data={data.pieChartData}
                                                            dataKey="value"
                                                            nameKey="name"
                                                            outerRadius={isMobile ? 65 : 95}
                                                            label={renderCustomizedLabel}
                                                        >
                                                            {data.pieChartData.map((_, index) => (
                                                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                                            ))}
                                                        </Pie>
                                                        <Tooltip />
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            </div>
                                            <div className="category-legend">
                                                {data.pieChartData.map((entry, index) => (
                                                    <div className="legend-item" key={index}>
                                                        <span
                                                            className="legend-color"
                                                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                                        ></span>
                                                        <span className="legend-label">{entry.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <h5>Highest Expenses</h5>
                                        <ul>
                                            {data.topExpenses.map((tx, i) => (
                                                <li key={i}>
                                                    <span className="description"><strong>{format(parseISO(tx.date), 'MMMM')}</strong>: {tx.description} ({tx.category})</span>
                                                    <span>{formatINR(tx.amount)}</span>
                                                </li>
                                            ))
                                            }
                                        </ul>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )
            }

            {showExportModal && (
                <div className="modal-overlay export-backdrop">
                    <div className="export-modal">
                        <h3 className="modal-title">Export SpendWise Report</h3>

                        <div className="modal-section">
                            <label>Select Range</label>
                            <Select
                                className="modal-select"
                                classNamePrefix="react-select"
                                options={selectOptions}
                                value={selectOptions.find(opt => opt.value === exportOption)}
                                onChange={(selected) => setExportOption(selected.value)}
                                isSearchable={false}
                            />
                        </div>

                        {exportOption === "custom" && (
                            <div className="custom-range">
                                <label>From:
                                    <input
                                        type="date"
                                        className="custom-date-input"
                                        value={exportRange.from}
                                        max={exportRange.to}
                                        onChange={(e) =>
                                            setExportRange({ ...exportRange, from: e.target.value })
                                        }

                                    />
                                </label>
                                <label>To:
                                    <input
                                        type="date"
                                        className="custom-date-input"
                                        value={exportRange.to}
                                        min={exportRange.from}
                                        max={new Date().toISOString().split("T")[0]}
                                        onChange={(e) =>
                                            setExportRange({ ...exportRange, to: e.target.value })
                                        }
                                    />
                                </label>
                            </div>
                        )}

                        <div className="modal-actions">
                            <button className="export-btn primary" onClick={handleDummyExport}>
                                Export
                            </button>
                            <button className="export-btn cancel" onClick={() => setShowExportModal(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                limit={3}
            />

        </Wrapper >
    );
};

export default AnalysisPage;
