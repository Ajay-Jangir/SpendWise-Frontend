import Lottie from 'lottie-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axiosInstance from '../axiosInstance';
import Loading from '../utilities/Loading.json';
import SpendWiseImage from '../utilities/SpendWise.png';
import Wrapper from './style';

const ResetNewPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { token } = useParams();

    const togglePassword = () => setShowPassword(!showPassword);
    const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 6) {
            Swal.fire({
                icon: 'warning',
                title: 'Weak Password',
                text: 'Password must be at least 6 characters long',
            });
            return;
        }

        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Mismatch',
                text: 'Passwords do not match',
            });
            return;
        }

        setLoading(true);

        try {
            await axiosInstance.post('/api/resetPassword/update', {
                token,
                password,
            });

            setLoading(false);

            Swal.fire({
                icon: 'success',
                title: 'Password Updated',
                text: 'You can now login with your new password',
                confirmButtonText: 'Login',
            }).then(() => {
                Swal.fire({
                    icon: 'info',
                    title: 'Redirecting',
                    text: 'Redirecting to login page...',
                    timer: 2000,
                    showConfirmButton: false,
                    didClose: () => navigate('/login'),
                });
            });

        } catch (err) {
            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err?.response?.data?.message || 'Something went wrong. Try again.',
            });
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
            <div className="login-left">
                <div className="logo-top">
                    <img src={SpendWiseImage} alt="SpendWise Logo" />
                </div>
                <div className="login-box">
                    <h2>Reset Password</h2>
                    <p className="subtext">Enter your new password below</p>
                    <form onSubmit={handleSubmit}>
                        <div className="password-input">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="New Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span onClick={togglePassword} className="eye-icon">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <div className="password-input">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <span onClick={toggleConfirmPassword} className="eye-icon">
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <button type="submit" className="login-btn" disabled={loading}>
                            {loading ? 'Updating...' : 'Update Password'}
                        </button>
                    </form>
                </div>
            </div>
            <div className="login-right">
                <img src={SpendWiseImage} alt="SpendWise" />
            </div>
        </Wrapper>
    );
};

export default ResetNewPassword;
