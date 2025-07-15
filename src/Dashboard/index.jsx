import { useMemo, useState, useEffect } from 'react';
import {
    Area,
    AreaChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import Wrapper from './style';

const formatINR = (amount) => {
    const absAmount = Math.abs(amount);

    if (absAmount >= 1e7)
        return `${amount < 0 ? "₹ -" : "₹ "}${(absAmount / 1e7).toFixed(2)} Cr`;

    if (absAmount >= 1e5)
        return `${amount < 0 ? "₹ -" : "₹ "}${(absAmount / 1e5).toFixed(2)} L`;

    return `${amount < 0 ? "₹ -" : "₹ "}${absAmount.toLocaleString("en-IN", {
        maximumFractionDigits: 2,
    })}`;
};



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
    '#FF5733', // bright red-orange
    '#0ba3fb', // sky blue
    '#8D33FF', // violet-purple
    '#33FF57', // lime green
    '#FFC300', // golden yellow
    '#FF33A1', // pink-magenta
    '#00D1FF', // cyan
    '#FF9F1C', // orange amber
    '#2EC4B6', // turquoise green
    '#7F00FF'  // deep purple indigo
];



const Dashboard = () => {
    const [isMobile, setIsMobile] = useState(false);
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthYearLabel = new Date().toLocaleString('default', {
        month: 'long',
        year: 'numeric'
    });

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile(); // Initial check
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const monthlySummery = useMemo(() => {
        const income = dummyTransactions.filter(
            t =>
                t.type === 'income' &&
                new Date(t.date).getMonth() === currentMonth &&
                new Date(t.date).getFullYear() === currentYear
        );
        const expense = dummyTransactions.filter(
            t =>
                t.type === 'expense' &&
                new Date(t.date).getMonth() === currentMonth &&
                new Date(t.date).getFullYear() === currentYear
        );

        const totalIncome = income.reduce((acc, curr) => acc + curr.amount, 0);
        const totalExpense = expense.reduce((acc, curr) => acc + curr.amount, 0);
        const balance = totalIncome - totalExpense;

        const categorySpend = {};
        expense.forEach(t => {
            categorySpend[t.category] = (categorySpend[t.category] || 0) + t.amount;
        });

        const topCategory = Object.entries(categorySpend).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

        return { totalIncome, totalExpense, balance, categorySpend, topCategory };
    }, [currentMonth, currentYear]);

    const pieData = Object.entries(monthlySummery.categorySpend).map(([key, value]) => ({
        name: key,
        value,
    }));

    const monthlyData = Array.from({ length: 12 }, (_, i) => {
        const income = dummyTransactions
            .filter(t => t.type === 'income' && new Date(t.date).getMonth() === i && new Date(t.date).getFullYear() === currentYear)
            .reduce((acc, curr) => acc + curr.amount, 0);
        const expense = dummyTransactions
            .filter(t => t.type === 'expense' && new Date(t.date).getMonth() === i && new Date(t.date).getFullYear() === currentYear)
            .reduce((acc, curr) => acc + curr.amount, 0);
        return {
            month: new Date(currentYear, i, 1).toLocaleString('default', { month: 'short' }),
            income,
            expense
        };
    });

    const yearlySummary = useMemo(() => {
        const income = dummyTransactions.filter(
            t => t.type === 'income' && new Date(t.date).getFullYear() === currentYear
        );
        const expense = dummyTransactions.filter(
            t => t.type === 'expense' && new Date(t.date).getFullYear() === currentYear
        );

        const totalIncome = income.reduce((acc, curr) => acc + curr.amount, 0);
        const totalExpense = expense.reduce((acc, curr) => acc + curr.amount, 0);
        return { totalIncome, totalExpense };
    }, [currentYear]);


    // Smooth Y-axis ticks calculation
    const rawMax = Math.max(...monthlyData.map(d => Math.max(d.income, d.expense)));
    const isAllZero = rawMax === 0;
    const roundingBase = rawMax > 5000 ? 2000 : 1000;
    const tickInterval = isAllZero
        ? 1
        : Math.ceil(rawMax / 6 / roundingBase) * roundingBase;
    const maxY = isAllZero
        ? 0
        : tickInterval * Math.ceil(rawMax / tickInterval);
    const yTicks = isAllZero
        ? [0]
        : Array.from({ length: Math.floor(maxY / tickInterval) + 1 }, (_, i) => i * tickInterval);


    const latestTransactions = [...dummyTransactions]
        .filter(t => new Date(t.date).getFullYear() === currentYear && new Date(t.date).getMonth() === currentMonth)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    const renderCustomizedLabel = ({ value }) => `${formatINR(value)}`;



    return (
        <Wrapper>
            <div className="summary">
                <div className="box">
                    <span className="label">Balance ({monthYearLabel})</span>
                    <span className={`value ${monthlySummery.balance >= 0 ? "profit" : "loss"}`}>
                        {formatINR(monthlySummery.balance)}</span>
                </div>
                <div className="box">
                    <span className="label">Income ({monthYearLabel})</span>
                    <span className="value">{formatINR(monthlySummery.totalIncome)}</span>
                </div>
                <div className="box">
                    <span className="label">Expense ({monthYearLabel})</span>
                    <span className="value">{formatINR(monthlySummery.totalExpense)}</span>
                </div>
                <div className="box">
                    <span className="label">Top Spend Category({monthYearLabel})</span>
                    <span className="value">{monthlySummery.topCategory}</span>
                </div>
            </div>

            <div className="charts">
                <div className="pie-box">
                    <h3>Expenses by Category ({monthYearLabel})</h3>
                    {pieData.length === 0 ? (
                        <div className="empty-pie-message">
                            No expense data available this month.
                        </div>
                    ) : (
                        <div className="pie-row">
                            <div className="chart-wrapper">
                                <ResponsiveContainer width="100%" height={250}>
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            dataKey="value"
                                            nameKey="name"
                                            outerRadius={isMobile ? 65 : 95}
                                            minAngle={10}
                                            label={renderCustomizedLabel}
                                        >
                                            {pieData.map((_, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={COLORS[index % COLORS.length]}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => formatINR(value)} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="category-legend">
                                {pieData.map((entry, index) => (
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

                <div className="chart-box">
                    <div className="chart-header">
                        <h3>Income vs Expense ({currentYear})</h3>
                        <div className="year-totals">
                            <span className="income">Total Income: {formatINR(yearlySummary.totalIncome)}</span>
                            <span className="expense">Total Expense: {formatINR(yearlySummary.totalExpense)}</span>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={monthlyData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
                            <defs>
                                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00b894" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#00b894" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#e17055" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#e17055" stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <XAxis
                                dataKey="month"
                                tick={{ fill: '#8884d8', fontSize: 12 }}
                                axisLine={{ stroke: '#ccc' }}
                                tickLine={false}
                            />
                            <YAxis
                                domain={[0, maxY]}
                                ticks={yTicks}
                                tick={{ fill: '#8884d8', fontSize: 12 }}
                                axisLine={{ stroke: '#ccc' }}
                                tickLine={false}
                                tickFormatter={(value) => formatINR(value)}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e1e2f', borderRadius: '8px', border: 'none' }}
                                labelStyle={{ color: '#fff' }}
                                itemStyle={{ color: '#fff' }}
                                formatter={(value) => formatINR(value)}
                            />
                            <Legend
                                verticalAlign="bottom"
                                align="center"
                                height={36}
                            />
                            <CartesianGrid vertical={false} horizontal={false} />
                            <Area
                                type="monotone"
                                dataKey="income"
                                name="Income"
                                stroke="#00b894"
                                fillOpacity={1}
                                fill="url(#colorIncome)"
                            />
                            <Area
                                type="monotone"
                                dataKey="expense"
                                name="Expense"
                                stroke="#e17055"
                                fillOpacity={1}
                                fill="url(#colorExpense)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>


            <div className="transactions">
                <h3>Latest 5 Transactions (This Month)</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {latestTransactions.length === 0 ? (
                            <tr className="no-transactions-row">
                                <td colSpan="5" style={{ textAlign: 'center', padding: '1rem', color: '#aaa' }}>
                                    No transactions this month.
                                </td>
                            </tr>
                        ) : (
                            latestTransactions.map((t, index) => (
                                <tr key={index}>
                                    <td>
                                        {new Intl.DateTimeFormat('en-GB', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric'
                                        }).format(new Date(t.date)).replace(/\//g, '-')}
                                    </td>
                                    <td className="description">
                                        <span title={t.description}>{t.description}</span>
                                    </td>

                                    <td>{t.category}</td>
                                    <td>{t.type}</td>
                                    <td>{formatINR(t.amount)}</td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>
            </div>
        </Wrapper>
    );
};

export default Dashboard;
