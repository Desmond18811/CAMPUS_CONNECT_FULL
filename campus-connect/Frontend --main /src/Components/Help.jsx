import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, HelpCircle, MessageCircle, Mail, Book, ExternalLink } from 'lucide-react';
import '../styles/SupportPages.css';

const Help = () => {
    const navigate = useNavigate();

    const helpTopics = [
        {
            title: 'Getting Started',
            description: 'Learn how to create an account and start using Campus Connect',
            icon: '🚀'
        },
        {
            title: 'Uploading Resources',
            description: 'How to share notes, documents, and other study materials',
            icon: '📤'
        },
        {
            title: 'Finding Resources',
            description: 'Search and discover resources from other students',
            icon: '🔍'
        },
        {
            title: 'Comments & Interactions',
            description: 'Engage with other students through comments and likes',
            icon: '💬'
        },
        {
            title: 'Account Settings',
            description: 'Update your profile, change password, and manage preferences',
            icon: '⚙️'
        },
        {
            title: 'Troubleshooting',
            description: 'Common issues and how to resolve them',
            icon: '🔧'
        }
    ];

    const faqs = [
        {
            question: 'How do I upload a resource?',
            answer: 'Click the "Create Post" button in the sidebar, fill in the details, attach your file, and click submit.'
        },
        {
            question: 'Can I delete my uploaded resources?',
            answer: 'Yes, go to your profile, find the resource, and click the delete option from the menu.'
        },
        {
            question: 'How do I change my password?',
            answer: 'Go to Settings > Edit Profile and use the change password option.'
        },
        {
            question: 'Why can\'t I download some files?',
            answer: 'Some files may have download restrictions set by the uploader. Contact the resource owner for access.'
        }
    ];

    return (
        <div className="support-page">
            <div className="support-header">
                <button className="back-btn" onClick={() => navigate('/home')}>
                    <ArrowLeft size={24} />
                </button>
                <h1>Help Center</h1>
            </div>

            <div className="support-content">
                {/* Search */}
                <div className="help-search">
                    <HelpCircle size={20} />
                    <input type="text" placeholder="How can we help you?" />
                </div>

                {/* Quick Links */}
                <section className="help-section">
                    <h2>Popular Topics</h2>
                    <div className="help-topics">
                        {helpTopics.map((topic, index) => (
                            <div key={index} className="help-topic-card">
                                <span className="topic-icon">{topic.icon}</span>
                                <h3>{topic.title}</h3>
                                <p>{topic.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQs */}
                <section className="help-section">
                    <h2>Frequently Asked Questions</h2>
                    <div className="faq-list">
                        {faqs.map((faq, index) => (
                            <details key={index} className="faq-item">
                                <summary>{faq.question}</summary>
                                <p>{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </section>

                {/* Contact Support */}
                <section className="help-section contact-section">
                    <h2>Still need help?</h2>
                    <div className="contact-options">
                        <button className="contact-btn">
                            <Mail size={20} />
                            <span>Email Support</span>
                        </button>
                        <button className="contact-btn">
                            <MessageCircle size={20} />
                            <span>Live Chat</span>
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Help;
