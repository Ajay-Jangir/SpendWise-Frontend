// components/Footer.jsx
import React, { useState } from 'react';
import Wrapper from './style';

const Footer = () => {
    const [modalType, setModalType] = useState(null); // "privacy" | "terms" | null

    const closeModal = () => setModalType(null);

    return (
        <Wrapper>
            <footer className="footer-container">
                <div className="footer-left">© {new Date().getFullYear()} SpendWise</div>

                <div className="footer-center">
                    <span className="footer-link" onClick={() => setModalType("privacy")}>Privacy Policy</span>
                    <span className="footer-link" onClick={() => setModalType("terms")}>Terms</span>
                    <a className="footer-support" href="mailto:ajayjangir023@gmail.com">Support</a>
                </div>

                <div className="footer-right">Built with 💻 by Team SpendWise</div>
            </footer>

            {modalType && (
                <div className="footer-modal-overlay" onClick={closeModal}>
                    <div className="footer-modal" onClick={(e) => e.stopPropagation()}>
                        <h2>{modalType === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}</h2>

                        {modalType === 'privacy' ? (
                            <>
                                <p>
                                    At SpendWise, we value your privacy and are committed to protecting your personal information.
                                    This policy explains what information we collect, how we use it, and how we keep it secure.
                                </p>
                                <h3>1. Information We Collect</h3>
                                <p>We collect only the necessary information to provide you with a smooth budgeting experience. This includes your name, email, and transaction data you enter.</p>
                                <h3>2. How We Use Your Information</h3>
                                <p>Your information is used strictly to personalize your experience, generate insights, and provide customer support when needed. We do not share or sell your data.</p>
                                <h3>3. Data Security</h3>
                                <p>We use modern encryption and best practices to store and protect your data. No sensitive financial credentials (like bank logins) are stored.</p>
                                <h3>4. Third-Party Services</h3>
                                <p>We may use analytics or PDF export tools, but we ensure none of your sensitive data is exposed through them.</p>
                                <h3>5. Your Rights</h3>
                                <p>You can request to view or delete your data at any time by contacting us at <a href="mailto:ajayjangir023@gmail.com">ajayjangir023@gmail.com</a>.</p>
                            </>
                        ) : (
                            <>
                                <p>By using SpendWise, you agree to the following terms. Please read them carefully before continuing to use our services.</p>
                                <h3>1. Account Responsibility</h3>
                                <p>You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.</p>
                                <h3>2. Use of the App</h3>
                                <p>You agree to use SpendWise for personal budgeting and financial tracking only. Misuse, unauthorized access, or scraping of data is prohibited.</p>
                                <h3>3. Data Accuracy</h3>
                                <p>While SpendWise helps organize your financial data, we are not responsible for errors in user-entered data or any financial decisions based on the analysis.</p>
                                <h3>4. Changes to the Service</h3>
                                <p>We may update or discontinue parts of the service at any time. You will be notified of major changes through the app or email.</p>
                                <h3>5. Contact</h3>
                                <p>For questions or support, you can email us anytime at <a href="mailto:ajayjangir023@gmail.com">ajayjangir023@gmail.com</a>.</p>
                            </>
                        )}
                        <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#aaa" }}>Last updated: July 2025</p>
                        <button className="modal-close-btn" onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </Wrapper>
    );
};

export default Footer;
