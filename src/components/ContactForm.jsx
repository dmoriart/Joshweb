import React, { useState } from 'react';

const encode = (data) =>
    Object.keys(data)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        .join('&');

const initialState = { name: '', email: '', 'project-type': 'live-band', message: '' };

// Visible contact form wired to Netlify Forms. The matching hidden form in
// index.html lets Netlify detect the fields at build time; here we submit via
// fetch so the visitor stays on the page.
function ContactForm() {
    const [values, setValues] = useState(initialState);
    const [status, setStatus] = useState('idle'); // idle | submitting | success | error

    const handleChange = (e) => {
        setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('submitting');
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encode({ 'form-name': 'contact', 'bot-field': '', ...values })
        })
            .then((res) => {
                if (!res.ok) throw new Error('Submit failed');
                setStatus('success');
                setValues(initialState);
            })
            .catch(() => setStatus('error'));
    };

    if (status === 'success') {
        return (
            <div className="jm-contact-form" style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '12px',
                padding: '40px 24px',
                textAlign: 'center'
            }}>
                <p style={{ fontSize: '1.15rem', fontWeight: '600', margin: '0 0 8px 0' }}>
                    Thanks — message sent.
                </p>
                <p style={{ opacity: 0.7, margin: 0 }}>
                    I'll get back to you as soon as I can.
                </p>
            </div>
        );
    }

    return (
        <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="jm-contact-form"
            style={{ textAlign: 'left', display: 'grid', gap: '16px' }}
        >
            {/* Netlify needs these for AJAX submits */}
            <input type="hidden" name="form-name" value="contact" />
            <p hidden>
                <label>Don't fill this out: <input name="bot-field" onChange={handleChange} /></label>
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <label style={labelStyle}>
                    Name
                    <input
                        type="text"
                        name="name"
                        required
                        value={values.name}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </label>
                <label style={labelStyle}>
                    Email
                    <input
                        type="email"
                        name="email"
                        required
                        value={values.email}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </label>
            </div>

            <label style={labelStyle}>
                Project type
                <select
                    name="project-type"
                    value={values['project-type']}
                    onChange={handleChange}
                    style={inputStyle}
                >
                    <option value="live-band">Live Band/Performance</option>
                    <option value="dj-set">DJ Set/Club Night</option>
                    <option value="promo">Promo Video</option>
                    <option value="animation">Animation</option>
                    <option value="other">Other</option>
                </select>
            </label>

            <label style={labelStyle}>
                Message
                <textarea
                    name="message"
                    required
                    rows={5}
                    value={values.message}
                    onChange={handleChange}
                    style={{ ...inputStyle, resize: 'vertical' }}
                />
            </label>

            {status === 'error' && (
                <p style={{ color: '#ff9a9a', margin: 0, fontSize: '0.95rem' }}>
                    Something went wrong sending that. Please try again, or email me directly.
                </p>
            )}

            <button
                type="submit"
                disabled={status === 'submitting'}
                style={{
                    justifySelf: 'start',
                    padding: '14px 36px',
                    background: '#ffffff',
                    color: '#1a1a1a',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '1.05rem',
                    fontWeight: '600',
                    cursor: status === 'submitting' ? 'default' : 'pointer',
                    opacity: status === 'submitting' ? 0.7 : 1,
                    transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => { if (status !== 'submitting') e.currentTarget.style.transform = 'scale(1.04)'; }}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                {status === 'submitting' ? 'Sending…' : 'Send message'}
            </button>

            {/* Override the global dark focus ring for this dark-themed form */}
            <style>{`
                .jm-contact-form input,
                .jm-contact-form select,
                .jm-contact-form textarea { font-family: inherit; }
                .jm-contact-form input:focus,
                .jm-contact-form select:focus,
                .jm-contact-form textarea:focus {
                    border-color: #ffffff !important;
                    box-shadow: 0 0 0 2px rgba(255,255,255,0.18) !important;
                }
                .jm-contact-form option { color: #1a1a1a; }
            `}</style>
        </form>
    );
}

const labelStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontSize: '0.85rem',
    fontWeight: '600',
    letterSpacing: '0.02em',
    color: 'rgba(255,255,255,0.8)'
};

const inputStyle = {
    padding: '12px 14px',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '1rem',
    width: '100%'
};

export default ContactForm;
