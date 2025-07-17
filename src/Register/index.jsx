import axios from 'axios';
import Lottie from 'lottie-react';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import Loading from '../utilities/Loading.json';
import SpendWiseImage from '../utilities/SpendWise.png';
import Wrapper from './style';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

const Register = ({ onRegistered }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'confirmPassword') {
            const confirmInput = document.querySelector('[name="confirmPassword"]');
            if (confirmInput) {
                confirmInput.setCustomValidity('');
            }
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const togglePassword = () => setShowPassword(!showPassword);
    const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);


    // ⬇️ Main submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const confirmInput = form.querySelector('[name="confirmPassword"]');
        const passwordInput = form.querySelector('[name="password"]');
        const { username, email, password, confirmPassword } = formData;

        if (!username || !email || !password || !confirmPassword) {
            toast.error('Please fill in all fields');
            return;
        }

        // Clear any previous custom validity
        confirmInput.setCustomValidity('');
        passwordInput.setCustomValidity('');

        // Validate password length
        if (password.length < 6) {
            passwordInput.setCustomValidity('Password must be at least 6 characters.');
            passwordInput.reportValidity(); // Show browser tooltip
            return;
        }

        // Validate password match
        if (password !== confirmPassword) {
            confirmInput.setCustomValidity('Passwords do not match.');
            confirmInput.reportValidity(); // Show browser tooltip
            return;
        }

        // All validations passed, clear any lingering tooltips
        passwordInput.setCustomValidity('');
        confirmInput.setCustomValidity('');

        try {
            setLoading(true);

            const res = await API.post('/api/auth/register', {
                name: username,
                email,
                password,
            });

            if (res.status === 201 || res.status === 200) {
                setLoading(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful!',
                    text: 'You can now login to SpendWise.',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Go to Login',
                }).then(() => {
                    onRegistered?.();
                    navigate('/login');
                });
            }
        } catch (error) {
            setLoading(false);
            const res = error.response;
            const rawMessage = res?.data?.message;
            const message = typeof rawMessage === 'string' ? rawMessage.toLowerCase() : '';
            if (res?.status === 409 && message.includes('email')) {
                toast.error('Email already exists. Please use another email.');
            } else if (message) {
                toast.error(message);
            } else {
                toast.error('Registration failed. Please try again later.');
            }
        } finally {
            setLoading(false);
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
                    <h2>Create Account</h2>
                    <p className="subtext">Join SpendWise to track and manage your finances.</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <div className="password-input">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <span onClick={togglePassword} className="eye-icon">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <div className="password-input">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            <span onClick={toggleConfirmPassword} className="eye-icon">
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <button type="submit" className="login-btn" disabled={loading}>
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </form>
                    <div className="login-options">
                        <button className="link-btn" onClick={() => navigate('/login')}>
                            Back to Login
                        </button>
                        <button className="link-btn" onClick={() => navigate('/forgot')}>
                            Forgot Password?
                        </button>
                    </div>
                </div>
            </div>
            <div className="login-right">
                <img src={SpendWiseImage} alt="SpendWise" />
            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
                draggable
                pauseOnFocusLoss
            />
        </Wrapper>
    );
};

export default Register;
