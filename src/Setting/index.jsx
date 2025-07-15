import React, { useState } from "react";
import { Wrapper } from "./style";
import { toast, ToastContainer } from "react-toastify";
import { Pencil, X, Eye, EyeOff } from "lucide-react";
import 'react-toastify/dist/ReactToastify.css';

const SettingsPage = () => {
    const [user, setUser] = useState({
        username: "ajay.kumar",
        email: "ajay@example.com"
    });

    const [editMode, setEditMode] = useState({
        username: false,
        email: false
    });

    const [changePwd, setChangePwd] = useState({
        current: "",
        new: "",
        confirm: ""
    });

    const [showModal, setShowModal] = useState(false);
    const [showCurrentPwd, setShowCurrentPwd] = useState(false);
    const [showNewPwd, setShowNewPwd] = useState(false);
    const [showConfirmPwd, setShowConfirmPwd] = useState(false);



    const handleUserFieldSave = (field) => {
        if (!user[field].trim()) {
            toast.error(`Please enter a valid ${field}.`);
            return;
        }

        toast.success(`${field === 'username' ? 'Username' : 'Email'} updated successfully.`);
        setEditMode(prev => ({ ...prev, [field]: false }));
    };

    const handleResetPassword = () => {
        const { current, new: newPwd, confirm } = changePwd;

        if (!current || !newPwd || !confirm) {
            toast.error("All fields are required.");
            return;
        }

        if (newPwd.length < 6) {
            toast.error("New password must be at least 6 characters.");
            return;
        }

        if (newPwd !== confirm) {
            toast.error("Passwords do not match.");
            return;
        }

        if (current !== "dummyOldPassword") {
            toast.error("Current password is incorrect.");
            return;
        }

        toast.success("Password updated successfully!");
        setChangePwd({ current: "", new: "", confirm: "" });
        setShowModal(false);
    };

    return (
        <Wrapper>
            <div className="settings-page">
                <h2 className="page-title">Account Settings</h2>

                <div className="section">
                    <h3 className="section-title">User Information</h3>
                    <div className="userInfo-container">
                        <div className="user-fields">
                            <div className="input-row">
                                <label>Username</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        value={user.username}
                                        disabled={!editMode.username}
                                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                                    />
                                    {editMode.username ? (
                                        <button className="icon-btn save" onClick={() => handleUserFieldSave("username")}>
                                            Save
                                        </button>
                                    ) : (
                                        <button className="icon-btn edit" onClick={() => setEditMode(prev => ({ ...prev, username: true }))}>
                                            <Pencil size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="input-row">
                                <label>Email</label>
                                <div className="input-group">
                                    <input
                                        type="email"
                                        value={user.email}
                                        disabled={!editMode.email}
                                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    />
                                    {editMode.email ? (
                                        <button className="icon-btn save" onClick={() => handleUserFieldSave("email")}>
                                            Save
                                        </button>
                                    ) : (
                                        <button className="icon-btn edit" onClick={() => setEditMode(prev => ({ ...prev, email: true }))}>
                                            <Pencil size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="user-avatar">
                            {user.username
                                .split(/[\s._-]+/)
                                .slice(0, 2)
                                .map(word => word[0]?.toUpperCase())
                                .join('')}
                        </div>
                    </div>
                </div>

                <div className="pswsection">
                    <h3 className="section-title">Password</h3>
                    <button className="reset-btn" onClick={() => setShowModal(true)}>Reset Password</button>
                </div>
            </div>

            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Reset Your Password</h3>
                            <button className="icon-btn close" onClick={() => setShowModal(false)}>
                                <X size={18} />
                            </button>
                        </div>

                        <div className="password-wrapper">
                            <input
                                type={showCurrentPwd ? "text" : "password"}
                                placeholder="Current Password"
                                value={changePwd.current}
                                onChange={(e) => setChangePwd({ ...changePwd, current: e.target.value })}
                            />
                            <span className="eye-icon" onClick={() => setShowCurrentPwd(prev => !prev)}>
                                {showCurrentPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                            </span>
                        </div>

                        <div className="password-wrapper">
                            <input
                                type={showNewPwd ? "text" : "password"}
                                placeholder="New Password (min 6 chars)"
                                value={changePwd.new}
                                onChange={(e) => setChangePwd({ ...changePwd, new: e.target.value })}
                            />
                            <span className="eye-icon" onClick={() => setShowNewPwd(prev => !prev)}>
                                {showNewPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                            </span>
                        </div>

                        <div className="password-wrapper">
                            <input
                                type={showConfirmPwd ? "text" : "password"}
                                placeholder="Confirm New Password"
                                value={changePwd.confirm}
                                onChange={(e) => setChangePwd({ ...changePwd, confirm: e.target.value })}
                            />
                            <span className="eye-icon" onClick={() => setShowConfirmPwd(prev => !prev)}>
                                {showConfirmPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                            </span>
                        </div>

                        <div className="modal-actions">
                            <button className="primary-btn" onClick={handleResetPassword}>Update Password</button>
                            <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
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

export default SettingsPage;
