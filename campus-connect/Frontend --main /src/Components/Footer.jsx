// Footer.jsx
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebookF,
    faTwitter,
    faInstagram,
    faLinkedinIn,
    faGithub
} from "@fortawesome/free-brands-svg-icons";
import {
    faEnvelope,
    faPhone,
    faMapMarkerAlt,
    faArrowUp
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Footer.css";

const Footer = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (!email || !email.includes('@') || isSubmitting) return;

        setIsSubmitting(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            console.log('Sending newsletter request to API with email:', email);

            const response = await fetch('https://campcon-test.onrender.com/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            console.log('API response status:', response.status);

            // Try to parse response as JSON first, then as text if that fails
            let responseData;
            const contentType = response.headers.get('content-type');

            if (contentType && contentType.includes('application/json')) {
                responseData = await response.json();
            } else {
                responseData = await response.text();
                console.log('Non-JSON response:', responseData);
            }

            if (response.ok) {
                console.log('Newsletter subscription successful');
                setSuccessMessage('Successfully subscribed to newsletter!');
                setEmail(''); // Clear the input
            } else {
                console.error('Newsletter subscription failed with status:', response.status);
                setErrorMessage(responseData.message || responseData.error || `Subscription failed (Status: ${response.status})`);
            }
        } catch (error) {
            console.error('Network error:', error);
            setErrorMessage('Network error. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Main Footer Content */}
                <div className="footer-content">
                    {/* Company Info */}
                    <div className="footer-section">
                        <div className="footer-logo">
                            <div className="logo-box">C</div>
                            <h3 className="logo-text">Campus Connect</h3>
                        </div>
                        <p className="footer-description">
                            Your ultimate academic hub for past questions, projects, and study materials.
                            Connecting students to success through accessible, quality educational resources.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-link" aria-label="Facebook">
                                <FontAwesomeIcon icon={faFacebookF} />
                            </a>
                            <a href="#" className="social-link" aria-label="Twitter">
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                            <a href="#" className="social-link" aria-label="Instagram">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                            <a href="#" className="social-link" aria-label="LinkedIn">
                                <FontAwesomeIcon icon={faLinkedinIn} />
                            </a>
                            <a href="#" className="social-link" aria-label="GitHub">
                                <FontAwesomeIcon icon={faGithub} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h4 className="footer-title">Quick Links</h4>
                        <ul className="footer-links">
                            <li><a href="#home">Home</a></li>
                            <li><a href="#past-questions">Past Questions</a></li>
                            <li><a href="#projects">Projects</a></li>
                            <li><a href="#notes">Notes & Materials</a></li>
                            <li><a href="#how-it-works">How It Works</a></li>
                            <li><a href="#about">About Us</a></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="footer-section">
                        <h4 className="footer-title">Resources</h4>
                        <ul className="footer-links">
                            <li><a href="#study-guides">Study Guides</a></li>
                            <li><a href="#exam-tips">Exam Tips</a></li>
                            <li><a href="#academic-calendar">Academic Calendar</a></li>
                            <li><a href="#help-center">Help Center</a></li>
                            <li><a href="#community">Community</a></li>
                            <li><a href="#feedback">Feedback</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-section">
                        <h4 className="footer-title">Get In Touch</h4>
                        <div className="contact-info">
                            <div className="contact-item">
                                <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
                                <span>hello@campusconnect.edu</span>
                            </div>
                            <div className="contact-item">
                                <FontAwesomeIcon icon={faPhone} className="contact-icon" />
                                <span>+23491234567890</span>
                            </div>
                            <div className="contact-item">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" />
                                <span>AUST, Abuja, Nigeria</span>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="newsletter">
                            <h5 className="newsletter-title">Stay Updated</h5>
                            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email"
                                    className="newsletter-input"
                                    required
                                    disabled={isSubmitting}
                                />
                                <button
                                    type="submit"
                                    className="newsletter-btn"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? '...' : 'Subscribe'}
                                </button>
                            </form>
                            {errorMessage && <p className="newsletter-error">{errorMessage}</p>}
                            {successMessage && <p className="newsletter-success">{successMessage}</p>}
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <div className="footer-bottom-content">
                        <p className="copyright">
                            © 2025 Campus Connect. All rights reserved.
                        </p>
                        <div className="footer-bottom-links">
                            <a href="#privacy">Privacy Policy</a>
                            <a href="#terms">Terms of Service</a>
                            <a href="#cookies">Cookie Policy</a>
                        </div>
                        <button
                            onClick={scrollToTop}
                            className="scroll-to-top"
                            aria-label="Scroll to top"
                        >
                            <FontAwesomeIcon icon={faArrowUp} />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;