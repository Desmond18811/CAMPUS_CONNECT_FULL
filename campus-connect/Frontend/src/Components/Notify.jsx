



import React, { useState } from "react";
import "./Notify.css";

function Notify() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleEmailSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (!email || !email.includes('@') || isSubmitting) return;

        setIsSubmitting(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            console.log('Sending request to API with email:', email);

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
                console.log('Subscription successful and email sent');
                setSuccessMessage('Successfully subscribed!');
                setEmail(''); // Clear the input
            } else {
                console.error('Subscription failed with status:', response.status);
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
        <section className="notify-section">
            <div className="notify-container">
                <div className="notify-card">
                    <h2 className="notify-title">Get notified on new updates</h2>
                    <p className="notify-text">
                        Stay ahead with the latest resources, materials, and announcements.
                        Subscribe to get updates delivered straight to your inbox.
                    </p>

                    <form className="notify-form" onSubmit={handleEmailSubmit}>
                        <input
                            id="email-address"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                            autoComplete="email"
                            className="notify-input"
                            disabled={isSubmitting}
                        />
                        <button
                            type="submit"
                            className="notify-button"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Notify me'}
                        </button>
                    </form>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}

                    {/* Decorative background */}
                    <svg
                        viewBox="0 0 1024 1024"
                        aria-hidden="true"
                        className="notify-svg"
                    >
                        <circle
                            r="512"
                            cx="512"
                            cy="512"
                            fill="url(#circle-gradient)"
                            fillOpacity="0.7"
                        ></circle>
                        <defs>
                            <radialGradient
                                id="circle-gradient"
                                r="1"
                                cx="0"
                                cy="0"
                                gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(512 512) rotate(90) scale(512)"
                            >
                                <stop stopColor="#1e3a8a"></stop>
                                <stop offset="1" stopColor="white" stopOpacity="0"></stop>
                            </radialGradient>
                        </defs>
                    </svg>
                </div>
            </div>
        </section>
    );
}

export default Notify;