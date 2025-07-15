import React, { useMemo, useRef, useState } from 'react';
import { FaEdit, FaTrash, FaUpload, FaSearch } from 'react-icons/fa';
import { MdAddCircle } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Wrapper from './style';
import Select from 'react-select';

const formatINR = (amount) => {
    if (amount >= 1e7) {
        return `₹${(amount / 1e7).toFixed(2)}Cr`; // Crores
    } else if (amount >= 1e5) {
        return `₹${(amount / 1e5).toFixed(2)}L`;  // Lakhs
    } else {
        return `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`; // Normal
    }
};

const expenseType = [
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' },
];

const filterTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' }
];



const initialData = [
    { id: 1, date: '2025-07-18', description: 'Book Purchase on React and Design Patterns', category: 'Education', type: 'expense', amount: 90 },
    { id: 2, date: '2025-07-15', description: 'Electricity Bill for July', category: 'Utilities', type: 'expense', amount: 400 },
    { id: 3, date: '2025-06-25', description: 'Gift from friend', category: 'Personal', type: 'income', amount: 150 },
    { id: 4, date: '2025-06-10', description: 'Internet provider monthly charges', category: 'Utilities', type: 'expense', amount: 350 },
    { id: 5, date: '2025-06-02', description: 'Freelance payment for design project', category: 'Job', type: 'income', amount: 1800 },
    { id: 6, date: '2025-05-05', description: 'Netflix subscription monthly', category: 'Entertainment', type: 'expense', amount: 199 },
    { id: 7, date: '2025-05-10', description: 'Dinner with colleagues', category: 'Food', type: 'expense', amount: 75 },
    { id: 8, date: '2025-05-28', description: 'Bonus payout from project', category: 'Job', type: 'income', amount: 1200 },
    { id: 9, date: '2025-04-01', description: 'Monthly Salary credited', category: 'Job', type: 'income', amount: 5000 },
    { id: 10, date: '2025-04-12', description: 'Shopping for summer clothes', category: 'Shopping', type: 'expense', amount: 450 },
    { id: 11, date: '2025-03-20', description: 'Coffee machine purchase', category: 'Appliances', type: 'expense', amount: 350 },
    { id: 12, date: '2025-03-22', description: 'Client freelance milestone payment', category: 'Job', type: 'income', amount: 900 },
    { id: 13, date: '2025-03-30', description: 'Uber ride to airport', category: 'Transport', type: 'expense', amount: 40 },
    { id: 14, date: '2025-02-10', description: 'Gym membership fee', category: 'Fitness', type: 'expense', amount: 60 },
    { id: 15, date: '2025-02-14', description: 'Valentine\'s Day dinner', category: 'Food', type: 'expense', amount: 120 },
    { id: 16, date: '2025-02-28', description: 'Monthly Salary credited', category: 'Job', type: 'income', amount: 5000 },
    { id: 17, date: '2025-01-01', description: 'New Year Celebration snacks and drinks', category: 'Entertainment', type: 'expense', amount: 250 },
    { id: 18, date: '2025-01-10', description: 'Rent payment', category: 'Housing', type: 'expense', amount: 1200 },
    { id: 19, date: '2025-01-20', description: 'Grocery shopping', category: 'Food', type: 'expense', amount: 180 },
    { id: 20, date: '2025-01-28', description: 'Stock dividend payout', category: 'Investment', type: 'income', amount: 300 }
];

const getMonthLabel = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
};

const getDay = (dateStr) => {
    const date = new Date(dateStr);
    return date.getDate().toString().padStart(2, '0');
};


const commonCategories = ['Food', 'Transport', 'Groceries', 'Utilities', 'Rent', 'Salary', 'Health', 'Entertainment'];

const formatAmountWithCommas = (val) => {
    if (val === null || val === undefined) return '';
    const strVal = val.toString();
    const [intPart, decimalPart] = strVal.split('.');
    const formattedInt = Number(intPart).toLocaleString('en-IN');
    return decimalPart !== undefined ? `${formattedInt}.${decimalPart}` : formattedInt;
};




const Transactions = () => {
    const [transactions, setTransactions] = useState(initialData);
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [monthFilter, setMonthFilter] = useState('all');
    const [selectedIds, setSelectedIds] = useState([]);
    const [modalType, setModalType] = useState(null);
    const [editing, setEditing] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState({ type: null, id: null });
    const [highlightedId, setHighlightedId] = useState(null);
    const [categorySuggestions, setCategorySuggestions] = useState([]);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);


    const [form, setForm] = useState({
        date: new Date().toISOString().split('T')[0],
        description: '',
        category: '',
        type: 'expense',
        amount: ''
    });
    const tableBodyRef = useRef();

    const grouped = useMemo(() => {
        let data = [...transactions];
        if (search) data = data.filter(t => t.description.toLowerCase().includes(search.toLowerCase()));
        if (typeFilter !== 'all') data = data.filter(t => t.type === typeFilter);
        if (monthFilter !== 'all') data = data.filter(t => t.date.startsWith(monthFilter));
        data.sort((a, b) => new Date(b.date) - new Date(a.date));

        const grouped = {};
        data.forEach((t) => {
            const key = t.date.slice(0, 7);
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(t);
        });
        return grouped;
    }, [transactions, search, typeFilter, monthFilter]);

    const allDisplayedIds = Object.values(grouped).flat().map(t => t.id);

    const handleSelect = (id) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const toggleSelectAll = () => {
        setSelectedIds(selectedIds.length === allDisplayedIds.length ? [] : allDisplayedIds);
    };

    const handleConfirmSingleDelete = () => {
        setTransactions(prev => prev.filter(t => t.id !== confirmDelete.id));
        setSelectedIds(prev => prev.filter(i => i !== confirmDelete.id));
        toast.success('Transaction deleted successfully');
        setConfirmDelete({ type: null, id: null });
    };

    const handleConfirmMassDelete = () => {
        setTransactions(prev => prev.filter(t => !selectedIds.includes(t.id)));
        setSelectedIds([]);
        toast.success('Deleted selected transactions successfully');
        setConfirmDelete({ type: null, id: null });
    };

    const handleDateChange = (e) => {
        const inputDate = e.target.value;
        const selectedDate = new Date(inputDate);
        const today = new Date();
        selectedDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        if (selectedDate > today) {
            toast.error("Future dates are not allowed. Setting today's date.");
            const todayStr = formatDateLocal(today);
            setForm({ ...form, date: todayStr });
            return;
        }
        setForm({ ...form, date: inputDate });
    };

    const formatDateLocal = (date) => {
        const year = date.getFullYear();
        const month = `${date.getMonth() + 1}`.padStart(2, '0');
        const day = `${date.getDate()}`.padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    ;

    const handleSave = () => {
        // Step 1: Required fields
        if (!form.date || !form.description || !form.category || !form.amount) {
            toast.error('All fields are required');
            return;
        }

        // Step 2: Raw input cleanup and validation
        const rawInput = form.amount.toString().replace(/[₹,]/g, '');
        if (!/^\d*\.?\d{0,2}$/.test(rawInput)) {
            toast.error('Amount contains invalid characters');
            return;
        }

        // Step 3: Convert and validate number
        const numericAmount = Number(rawInput);
        if (isNaN(numericAmount)) {
            toast.error('Amount must be a valid number');
            return;
        }
        if (numericAmount <= 0) {
            toast.error('Amount must be greater than zero');
            return;
        }
        if (numericAmount > 999999999) {
            toast.error('Amount is too large');
            return;
        }

        // Step 4: Proceed to save
        const id = modalType === 'edit' ? editing.id : Math.max(0, ...transactions.map(t => t.id)) + 1;
        const updated = { ...form, id, amount: numericAmount };

        if (modalType === 'edit') {
            setTransactions(prev => prev.map(t => (t.id === id ? updated : t)));
            toast.success('Transaction Updated Successfully');
        } else {
            setTransactions(prev => [updated, ...prev]);
            toast.success('Transaction Added Successfully');
            setHighlightedId(id);
            setTimeout(() => setHighlightedId(null), 5000);
            setTimeout(() => scrollToRow(id), 100);
        }
        setModalType(null);
    };


    const scrollToRow = (id) => {
        const row = document.querySelector(`tr[data-id="${id}"]`);
        if (row && tableBodyRef.current) {
            row.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const openAdd = () => {
        const today = new Date().toISOString().split('T')[0];
        setForm({ date: today, description: '', category: '', type: 'expense', amount: '' });
        setModalType('add');
    };

    const openEdit = (tx) => {
        setEditing(tx);
        setForm({ ...tx });
        setModalType('edit');
    };

    const handleImport = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const today = new Date().toISOString().split('T')[0];

        const imported = {
            id: Math.max(...transactions.map(t => t.id)) + 1,
            date: today,
            description: `Imported from ${file.name}`,
            category: 'Imported',
            type: 'expense',
            amount: 999
        };

        setTransactions(prev => [imported, ...prev]);
        toast.success('Imported');
        setHighlightedId(imported.id);
        setTimeout(() => setHighlightedId(null), 5000);
        setTimeout(() => scrollToRow(imported.id), 100);
        setModalType(null);
    };

    return (
        <Wrapper>
            <div className="top-header">
                <div className="filters">
                    <div className="filter-group">
                        <span className="label">Type</span>
                        <Select
                            value={filterTypeOptions.find(opt => opt.value === typeFilter)}
                            onChange={(option) => setTypeFilter(option.value)}
                            options={filterTypeOptions}
                            className="modal-select"
                            classNamePrefix="react-select"
                        />

                    </div>

                    <div className="filter-group">
                        <span className="label">Month</span>
                        <Select
                            value={{
                                value: monthFilter,
                                label: monthFilter === 'all'
                                    ? 'All Months'
                                    : getMonthLabel(monthFilter)
                            }}
                            onChange={(option) => setMonthFilter(option.value)}
                            options={[
                                { value: 'all', label: 'All Months' },
                                ...[...new Set(transactions.map(t => t.date.slice(0, 7)))]
                                    .sort((a, b) => b.localeCompare(a))
                                    .map(m => ({
                                        value: m,
                                        label: getMonthLabel(m)
                                    }))
                            ]}
                            className="modal-select"
                            classNamePrefix="react-select"
                        />
                    </div>
                </div>

                <div className="center-search">
                    <div className="search-input-wrapper">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search description..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="actions">
                    {selectedIds.length > 1 ? (
                        <button className="mass-delete-btn" onClick={() => setConfirmDelete({ type: 'mass', id: null })}>
                            Delete {selectedIds.length} <FaTrash size={20} />
                        </button>

                    ) : (
                        <div className="mass-delete-placeholder" />
                    )}
                    <button className="add-btn" onClick={openAdd}>
                        Add <MdAddCircle size={22} />
                    </button>
                </div>
            </div>

            <div className="table-wrapper" ref={tableBodyRef}>
                <table>
                    <thead>
                        <tr>
                            <th><input type="checkbox" checked={selectedIds.length === allDisplayedIds.length} onChange={toggleSelectAll} /></th>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>
                                Amount
                            </th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {Object.keys(grouped).length === 0 ? (
                            <tr className="no-results">
                                <td colSpan="7">No transactions found matching your filters or search.</td>
                            </tr>
                        ) : (
                            Object.entries(grouped).map(([monthKey, items]) => (
                                <React.Fragment key={monthKey}>
                                    <tr className="month-row" data-monthname={getMonthLabel(monthKey)}>
                                        <td colSpan="7">{getMonthLabel(monthKey)}</td>
                                    </tr>
                                    {items.map((t) => (
                                        <tr
                                            key={t.id}
                                            data-id={t.id}
                                            className={highlightedId === t.id ? 'highlight' : ''}
                                        >
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.includes(t.id)}
                                                    onChange={() => handleSelect(t.id)}
                                                />
                                            </td>
                                            <td>{getDay(t.date)}</td>
                                            <td className="description">
                                                {t.description.split(' ').slice(0, 20).join(' ')}
                                                {t.description.split(' ').length > 20 && '...'}
                                            </td>
                                            <td>{t.category}</td>
                                            <td>{t.type}</td>
                                            <td>{formatINR(t.amount)}</td>
                                            <td className="actions-col">
                                                <span className="icon-wrapper">
                                                    <FaEdit className="icon edit" onClick={() => openEdit(t)} />
                                                </span>
                                                <span className="icon-wrapper">
                                                    <FaTrash className="icon delete" onClick={() => setConfirmDelete({ type: 'single', id: t.id })} />
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {modalType && (
                <div className="modal-overlay">
                    <div className="modal large">
                        <h3>{modalType === 'add' ? 'Add Transaction' : 'Edit Transaction'}</h3>
                        <label>
                            Date
                            <input
                                type="date"
                                value={form.date}
                                onChange={handleDateChange}
                                max={new Date().toISOString().split('T')[0]}
                                className="custom-date-input"
                            />
                        </label>
                        <label>Description<input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></label>
                        <div className="category-input-wrapper">
                            <label>
                                Category
                                <input
                                    type="text"
                                    value={form.category}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setForm({ ...form, category: value });
                                        const filtered = value
                                            ? commonCategories.filter(cat =>
                                                cat.toLowerCase().includes(value.toLowerCase())
                                            )
                                            : commonCategories;
                                        setCategorySuggestions(filtered);
                                        setShowCategoryDropdown(true);
                                    }}
                                    onFocus={() => {
                                        const filtered = form.category
                                            ? commonCategories.filter(cat =>
                                                cat.toLowerCase().includes(form.category.toLowerCase())
                                            )
                                            : commonCategories;
                                        setCategorySuggestions(filtered);
                                        setShowCategoryDropdown(true);
                                    }}
                                />
                                {showCategoryDropdown && categorySuggestions.length > 0 && (
                                    <ul className="category-dropdown">
                                        {categorySuggestions.map((cat, idx) => (
                                            <li
                                                key={idx}
                                                onPointerDown={(e) => {
                                                    e.preventDefault();
                                                    setForm({ ...form, category: cat });
                                                    setTimeout(() => {
                                                        setShowCategoryDropdown(false);
                                                    }, 200);
                                                }}
                                            >
                                                {cat}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </label>
                        </div>
                        <label>Type
                            <Select
                                className="modal-select"
                                classNamePrefix="react-select"
                                options={expenseType}
                                value={expenseType.find(opt => opt.value === form.type)}
                                onChange={(selected) => setForm({ ...form, type: selected.value })}
                                isSearchable={false}
                            />
                        </label>
                        <label>
                            Amount
                            <input
                                type="text"
                                value={
                                    form.amount
                                        ? `₹${formatAmountWithCommas(form.amount)}`
                                        : ''
                                }
                                onChange={(e) => {
                                    const raw = e.target.value.replace(/[₹,]/g, '');
                                    // Allow digits and one decimal point with up to 2 decimal places
                                    if (/^\d*\.?\d{0,2}$/.test(raw)) {
                                        setForm({ ...form, amount: raw });
                                    }
                                }}
                                inputMode="decimal"
                                placeholder="₹0.00"
                            />
                        </label>


                        <div className="modal-actions">
                            <div className="left">
                                {modalType === 'add' && (
                                    <label className="import-btn">
                                        <FaUpload /> Import Transactions
                                        <input type="file" onChange={handleImport} accept=".pdf,.jpg,.jpeg,.png,.xlsx,.xls" hidden />
                                    </label>
                                )}
                            </div>
                            <div className="right action-buttons">
                                <button onClick={handleSave}>Save</button>
                                <button className="cancel" onClick={() => setModalType(null)}>Cancel</button>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {confirmDelete.type && (
                <div className="modal-overlay">
                    <div className="modal confirm-delete">
                        <h3>Confirm Deletion</h3>
                        <p>
                            {confirmDelete.type === 'mass'
                                ? `Are you sure you want to delete ${selectedIds.length} selected transactions?`
                                : 'Are you sure you want to delete this transaction?'}
                        </p>
                        <div className="modal-actions">
                            <button
                                onClick={
                                    confirmDelete.type === 'mass'
                                        ? handleConfirmMassDelete
                                        : handleConfirmSingleDelete
                                }
                            >
                                Yes, Delete
                            </button>
                            <button className="cancel" onClick={() => setConfirmDelete({ type: null, id: null })}>
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

        </Wrapper>
    );
};

export default Transactions;
