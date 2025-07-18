import Lottie from 'lottie-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axiosInstance from '../axiosInstance';
import Loading from '../utilities/Loading.json';
import SpendWiseImage from '../utilities/SpendWise.png';
import Wrapper from './style';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axiosInstance.post('/api/resetPassword', { email });
            setLoading(false);
            await Swal.fire({
                icon: 'success',
                title: 'Email Sent',
                text: 'Please check your inbox for the reset link',
                confirmButtonText: 'OK',
            });
            await Swal.fire({
                icon: 'info',
                title: 'Redirecting',
                text: 'Redirecting to login page...',
                timer: 2000,
                showConfirmButton: false,
            });
            navigate('/login');
        } catch (err) {
            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err?.response?.data?.message || 'Something went wrong. Please try again.',
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
                    <h2>Forgot Password</h2>
                    <p className="subtext">Enter your email to receive a reset link</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit" className="login-btn" disabled={loading}>
                            {loading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>
                    <div className="login-options">
                        <button className="link-btn" onClick={() => navigate('/login')}>
                            Back to Login
                        </button>
                        <button className="link-btn" onClick={() => navigate('/register')}>
                            Register
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

export default ForgotPassword;
