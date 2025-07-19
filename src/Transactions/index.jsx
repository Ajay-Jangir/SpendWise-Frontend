/* eslint-disable no-unused-vars */
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaUpload, FaSearch } from 'react-icons/fa';
import { MdAddCircle } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Wrapper from './style';
import Select from 'react-select';
import axiosInstance from '../axiosInstance';
import Loading from '../utilities/Loading.json';
import Lottie from 'lottie-react';
import Swal from 'sweetalert2';


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
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
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

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                if (modalType) {
                    setModalType(null); // Close Add/Edit modal
                }
                if (confirmDelete.type) {
                    setConfirmDelete({ type: null, id: null }); // Close delete modal
                }
            }
        };

        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [modalType, confirmDelete]);

    const grouped = useMemo(() => {
        let data = [...transactions];
        if (search) {
            const lowerSearch = search.toLowerCase();
            data = data.filter(t =>
                t.description.toLowerCase().includes(lowerSearch) ||
                t.category.toLowerCase().includes(lowerSearch)
            );
        }
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

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setLoading(true);
                const res = await axiosInstance.get('/api/spend');
                const mapped = res.data.map(t => ({ ...t, id: t._id }));
                setTransactions(mapped);
            } catch (err) {
                toast.error('Failed to load transactions');
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
    }, []);



    const allDisplayedIds = Object.values(grouped).flat().map(t => t.id);

    const handleSelect = (id) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const toggleSelectAll = () => {
        setSelectedIds(selectedIds.length === allDisplayedIds.length ? [] : allDisplayedIds);
    };

    const handleConfirmSingleDelete = async () => {
        try {
            setLoading(true);
            await axiosInstance.delete(`/api/spend/${confirmDelete.id}`);
            toast.success('Transaction deleted');

            setTransactions(prev =>
                prev.filter(t => t.id !== confirmDelete.id && t._id !== confirmDelete.id)
            );
        } catch (err) {
            toast.error('Failed to delete');
        } finally {
            setLoading(false)
        }
        setConfirmDelete({ type: null, id: null });
    };

    const handleConfirmMassDelete = async () => {
        try {
            setLoading(true);
            await Promise.all(
                selectedIds.map(id => axiosInstance.delete(`/api/spend/${id}`))
            );

            toast.success('Selected transactions deleted');

            setTransactions(prev =>
                prev.filter(t => !selectedIds.includes(t.id) && !selectedIds.includes(t._id))
            );
        } catch (err) {
            toast.error('Failed to delete some items');
        } finally {
            setLoading(false)
        }
        setConfirmDelete({ type: null, id: null });
        setSelectedIds([]);
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

    const handleSave = async () => {
        if (!form.date || !form.description || !form.category || !form.amount) {
            toast.error('All fields are required');
            return;
        }

        const rawInput = form.amount.toString().replace(/[₹,]/g, '');
        const numericAmount = Number(rawInput);
        if (isNaN(numericAmount) || numericAmount <= 0 || numericAmount > 999999999) {
            toast.error('Invalid amount');
            return;
        }

        const payload = {
            date: form.date,
            description: form.description.trim(),
            category: form.category.trim(),
            type: form.type,
            amount: numericAmount
        };

        setLoading(true); // 🟡 Start loading

        try {
            if (modalType === 'edit') {
                await axiosInstance.put(`/api/spend/${editing._id}`, payload);
                toast.success('Transaction updated successfully');
            } else {
                await axiosInstance.post('/api/spend', payload);
                toast.success('Transaction added successfully');
            }

            const res = await axiosInstance.get('/api/spend');
            setTransactions(res.data.map(t => ({ ...t, id: t._id })));
            setModalType(null);

        } catch (err) {
            toast.error('Failed to save transaction');
        } finally {
            setLoading(false); // ✅ Stop loading
        }
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
        const formattedDate = new Date(tx.date).toISOString().split('T')[0];
        setEditing(tx);
        setForm({ ...tx, date: formattedDate });
        setModalType('edit');
    };


    const handleImport = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true); // 🟡 Start loading

        try {
            // 🟢 Upload the file
            const res = await axiosInstance.post('/api/import/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const { inserted, skipped, skippedDetails } = res.data;
            toast.success(`Imported: ${inserted}, Skipped: ${skipped}`);

            // 🟢 Fetch updated transactions from backend
            const response = await axiosInstance.get('/api/spend');
            const updated = response.data.map(t => ({ ...t, id: t._id }));
            setTransactions(updated);

            setModalType(null); // ✅ Close modal immediately

            setLoading(false); // ✅ 1. Stop loading FIRST

            // ✅ 2. Scroll to and highlight new entry
            if (inserted > 0) {
                const newIds = updated.slice(0, inserted).map(t => t.id);
                setHighlightedId(newIds[0]);
                setTimeout(() => setHighlightedId(null), 5000);
                setTimeout(() => scrollToRow(newIds[0]), 100);
            }

            // ✅ 3. Show SweetAlert AFTER DOM paints
            if (skippedDetails.length > 0) {
                setTimeout(() => {
                    const html = `
                    <div style="max-height: 250px; overflow-y: auto; text-align: left;">
                        ${skippedDetails.map((s, i) =>
                        `<div><b>${i + 1}. ${s.description}</b> — ${s.reason}</div>`).join('')}
                    </div>
                    <hr />
                    <div><b>Total:</b> ${inserted + skippedDetails.length}, 
                    <b>Inserted:</b> ${inserted}, 
                    <b>Skipped:</b> ${skippedDetails.length}</div>
                `;

                    Swal.fire({
                        title: 'Import Summary',
                        html,
                        icon: 'info',
                        confirmButtonText: 'Close',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        width: 600,
                        customClass: {
                            popup: 'swal-import-popup',
                        },
                    });
                }, 500); // ✅ Enough delay for DOM update
            }

        } catch (err) {
            toast.error('Import failed. Please check the file and try again.');
            setLoading(false); // stop loading even on error
        }
    };


    return (
        <Wrapper>
            {loading && (
                <div className="loading-overlay">
                    <div className="loading-container">
                        <Lottie animationData={Loading} loop autoplay />
                    </div>
                </div>
            )}
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
                            placeholder="Search description & category..."
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
                        {transactions.length === 0 ? (
                            <tr className="no-results">
                                <td colSpan="7">No transactions added till now</td>
                            </tr>
                        ) : Object.keys(grouped).length === 0 ? (
                            <tr className="no-results">
                                <td colSpan="7">No transactions found from search</td>
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
                                            <td>{t.type.charAt(0).toUpperCase() + t.type.slice(1)}</td>
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
                                autoFocus={true}
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
