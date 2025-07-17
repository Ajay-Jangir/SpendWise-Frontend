import Lottie from 'lottie-react';
import { useState, useEffect, useCallback } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axiosInstance from '../axiosInstance';
import Loading from '../utilities/Loading.json';
import SpendWiseImage from '../utilities/SpendWise.png';
import Wrapper from './style';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const togglePassword = () => setShowPassword(!showPassword);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosInstance.post('/api/auth/login', formData);
            const { token } = response.data;

            localStorage.setItem('spendwise_token', token);

            // ✅ Hide loading before showing alert
            setLoading(false);

            await Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: 'Redirecting to Dashboard...',
                timer: 2000,
                showConfirmButton: false,
            });

            navigate('/');
        } catch (error) {
            setLoading(false);

            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error?.response?.data?.message || 'Invalid email or password',
            });
        }
    }, [navigate, formData]);

    useEffect(() => {
        const handleGlobalEnter = (e) => {
            if (e.key === 'Enter') {
                handleSubmit(e);
            }
        };

        window.addEventListener('keydown', handleGlobalEnter);
        return () => window.removeEventListener('keydown', handleGlobalEnter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

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
                    <h2>Welcome Back 👋</h2>
                    <p className="subtext">Login to continue managing your spending</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <div className="password-input">
                            <input
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <span onClick={togglePassword} className="eye-icon">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <button type="submit" className="login-btn" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                    <div className="login-options">
                        <button className="link-btn" onClick={() => navigate('/register')}>
                            Register
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
        </Wrapper>
    );
};

export default Login;
