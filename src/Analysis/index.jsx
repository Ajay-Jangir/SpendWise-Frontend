import { format, isWithinInterval, parseISO } from "date-fns";
import { useMemo, useState, useEffect } from "react";
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from "../axiosInstance";
import Loading from '../utilities/Loading.json';
import Lottie from 'lottie-react';
import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip
} from "recharts";
import { Wrapper } from "./style";

const COLORS = [
    '#FF5733', '#0ba3fb', '#8D33FF', '#33FF57', '#FFC300',
    '#FF33A1', '#00D1FF', '#FF9F1C', '#2EC4B6', '#7F00FF'
];

const formatINR = (amount) => {
    const absAmount = Math.abs(amount);
    if (absAmount >= 1e7) return `${amount < 0 ? "-\u20B9" : "\u20B9"} ${(absAmount / 1e7).toFixed(2)} Cr`;
    if (absAmount >= 1e5) return `${amount < 0 ? "-\u20B9" : "\u20B9"} ${(absAmount / 1e5).toFixed(2)} L`;
    return `${amount < 0 ? "-\u20B9" : "\u20B9"} ${absAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
};

const selectOptions = [
    { value: 'thisMonth', label: 'This Month' },
    { value: 'previousMonth', label: 'Previous Month' },
    { value: 'last6Months', label: 'Last 6 Months' },
    { value: 'custom', label: 'Custom Range' },
];

const generateMonthOptions = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
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
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterMode, setFilterMode] = useState("thisMonth");
    const [hasComparedOnce, setHasComparedOnce] = useState(false);
    const [compare, setCompare] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);
    const [exportOption, setExportOption] = useState("thisMonth");
    const [previousFilterMode, setPreviousFilterMode] = useState("thisMonth");
    const [isMobile, setIsMobile] = useState(false);
    const [exportRange, setExportRange] = useState({
        from: `${now.getFullYear()}-01-01`,
        to: now.toISOString().split('T')[0]
    });

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
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setLoading(true);
                const res = await axiosInstance.get('/api/spend');
                setTransactions(res.data);
            } catch (err) {
                console.error("Failed to load transactions", err);
                toast.error("Failed to load transactions");
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
    }, []);

    const getFilteredTransactions = (filterKey) => {
        const now = new Date();
        const range = {
            thisMonth: [format(now, "yyyy-MM")],
            previousMonth: [format(new Date(now.getFullYear(), now.getMonth() - 1), "yyyy-MM")],
            last6Months: Array.from({ length: 6 }, (_, i) =>
                format(new Date(now.getFullYear(), now.getMonth() - i), "yyyy-MM")
            ),
            custom: transactions.filter((tx) =>
                isWithinInterval(parseISO(tx.date), {
                    start: parseISO(customRange.from),
                    end: parseISO(customRange.to),
                })
            ),
        };
        if (filterKey === "custom") return range.custom;
        return transactions.filter((tx) =>
            range[filterKey].includes(tx.date.slice(0, 7))
        );
    }

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
        if (!transactions.length) return [];

        if (filterMode === "custom") {
            const fromMonth = customRange.from.slice(0, 7);
            const toMonth = customRange.to.slice(0, 7);
            if (customRange.from > customRange.to) return [];
            const data = transactions.filter((tx) => {
                const txMonth = tx.date.slice(0, 7);
                return txMonth >= fromMonth && txMonth <= toMonth;
            });
            return data;
        }
        return getFilteredTransactions(filterMode);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterMode, customRange, transactions]);


    const currentSummary = useMemo(() => generateSummary(filteredData), [filteredData]);

    const comparisonSummaries = useMemo(() => {
        if (!compare) return null;
        return compareMonths.map((month) => {
            const monthData = transactions.filter((t) => t.date.startsWith(month));
            return { month, ...generateSummary(monthData) };
        });
    }, [compare, compareMonths, transactions]);

    const handleExportPDF = async () => {
        try {
            setLoading(true);

            const params = {};
            let filename = "SpendWise_Report";

            if (exportOption === "custom") {
                params.from = exportRange.from;
                params.to = exportRange.to;
                filename += `_${exportRange.from}_to_${exportRange.to}`;
            } else {
                filename += `_${exportOption.replace(/([A-Z])/g, ' $1').trim().replace(/\s+/g, '_')}`;
            }

            const res = await axiosInstance.get('/api/export/pdf', {
                responseType: 'blob',
                params,
            });

            const blob = new Blob([res.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${filename}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            toast.success("PDF exported successfully");
        } catch (error) {
            console.error("Export failed:", error);
            toast.error("Failed to export PDF. Please try again.");
        } finally {
            setLoading(false);
            setShowExportModal(false);
        }
    };


    const renderCustomizedLabel = ({ value }) => `${formatINR(value)}`;

    return (
        <Wrapper>
            {loading && (
                <div className="loading-overlay">
                    <div className="loading-container">
                        <Lottie animationData={Loading} loop autoplay />
                    </div>
                </div>
            )}
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
                                    // Only set current month if first time ever comparing
                                    if (!hasComparedOnce) {
                                        const currentMonth = format(new Date(), 'yyyy-MM');
                                        setCompareMonths([currentMonth, currentMonth]);
                                        setHasComparedOnce(true);
                                    }
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
                                {[...currentSummary.pieChartData].sort((a, b) => b.value - a.value)[0]?.name || "N/A"}
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
                                options={[...new Set(transactions.map(tx => tx.date.slice(0, 7)))].map(m => ({
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
                                options={[...new Set(transactions.map(tx => tx.date.slice(0, 7)))].map(m => ({
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
                                            {[...data.pieChartData].sort((a, b) => b.value - a.value)[0]?.name || "N/A"}
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
                                                <ResponsiveContainer width="100%" height={270}>
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
                                <label>
                                    From:
                                    <input
                                        type="date"
                                        inputMode="numeric"
                                        pattern="\d{4}-\d{2}-\d{2}"
                                        className="custom-date-input"
                                        value={exportRange.from}
                                        max={(() => {
                                            const fromDate = new Date(exportRange.from);
                                            if (isNaN(fromDate)) return "";
                                            const maxTo = new Date(fromDate);
                                            maxTo.setFullYear(maxTo.getFullYear() + 1);
                                            const today = new Date();
                                            return (maxTo > today ? today : maxTo).toISOString().split("T")[0];
                                        })()}
                                        onChange={(e) => {
                                            setExportRange(prev => ({ ...prev, from: e.target.value }));
                                        }}
                                        onBlur={(e) => {
                                            const newFrom = e.target.value;
                                            const newFromDate = new Date(newFrom);
                                            if (isNaN(newFromDate)) {
                                                toast.error("Invalid From date");
                                                e.target.value = exportRange.from;
                                                return;
                                            }

                                            const maxToDate = new Date(newFromDate);
                                            maxToDate.setFullYear(newFromDate.getFullYear() + 1);
                                            const today = new Date();
                                            const safeMaxTo = maxToDate > today ? today : maxToDate;

                                            const currentToDate = new Date(exportRange.to);
                                            const adjustedTo = isNaN(currentToDate) || currentToDate > safeMaxTo
                                                ? safeMaxTo.toISOString().split("T")[0]
                                                : exportRange.to;

                                            setExportRange({
                                                from: newFrom,
                                                to: adjustedTo,
                                            });
                                        }}
                                    />

                                </label>

                                <label>
                                    To:
                                    <input
                                        type="date"
                                        inputMode="numeric"
                                        pattern="\d{4}-\d{2}-\d{2}"
                                        className="custom-date-input"
                                        value={exportRange.to}
                                        max={new Date().toISOString().split("T")[0]}
                                        min={(() => {
                                            const toDate = new Date(exportRange.to);
                                            if (isNaN(toDate)) return "";
                                            const minFrom = new Date(toDate);
                                            minFrom.setFullYear(minFrom.getFullYear() - 1);
                                            return minFrom.toISOString().split("T")[0];
                                        })()}
                                        onChange={(e) => {
                                            setExportRange(prev => ({ ...prev, to: e.target.value }));
                                        }}
                                        onBlur={(e) => {
                                            const newTo = e.target.value;
                                            const newToDate = new Date(newTo);
                                            if (isNaN(newToDate)) {
                                                toast.error("Invalid To date");
                                                e.target.value = exportRange.to;
                                                return;
                                            }

                                            const minFromDate = new Date(newToDate);
                                            minFromDate.setFullYear(newToDate.getFullYear() - 1);
                                            const currentFromDate = new Date(exportRange.from);
                                            const adjustedFrom = isNaN(currentFromDate) || currentFromDate < minFromDate
                                                ? minFromDate.toISOString().split("T")[0]
                                                : exportRange.from;

                                            setExportRange({
                                                from: adjustedFrom,
                                                to: newTo,
                                            });
                                        }}
                                    />
                                </label>

                                <div className="range-warning">
                                    ⚠️ Maximum export duration is 1 year.
                                </div>
                            </div>
                        )}
                        <div className="modal-actions">
                            <button className="export-btn primary" onClick={handleExportPDF}>
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
