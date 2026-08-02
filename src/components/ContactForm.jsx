import { useState } from 'react';
import './ContactForm.css';

const encode = (data) =>
    Object.keys(data)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        .join('&');

const initialState = { name: '', email: '', 'project-type': 'illustration', message: '' };

/** Kept in sync with the hidden detection form in index.html. */
const PROJECT_TYPES = [
    { value: 'illustration', label: 'Illustration / comic art' },
    { value: 'animation', label: 'Animation' },
    { value: 'film', label: 'Film / video' },
    { value: 'collaboration', label: 'Collaboration' },
    { value: 'other', label: 'Other' },
];

/**
 * Contact form wired to Netlify Forms.
 *
 * The matching hidden form in index.html lets Netlify detect the fields at
 * build time; submitting via fetch keeps the visitor on the page. Spam is
 * handled by Netlify's honeypot field rather than a third-party script, so no
 * keys are needed in the client and nothing is loaded from another origin.
 */
function ContactForm() {
    const [values, setValues] = useState(initialState);
    const [status, setStatus] = useState('idle');

    const handleChange = (event) =>
        setValues((previous) => ({ ...previous, [event.target.name]: event.target.value }));

    const handleSubmit = (event) => {
        event.preventDefault();
        setStatus('submitting');
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encode({ 'form-name': 'contact', 'bot-field': '', ...values }),
        })
            .then((response) => {
                if (!response.ok) throw new Error('Submit failed');
                setStatus('success');
                setValues(initialState);
            })
            .catch(() => setStatus('error'));
    };

    if (status === 'success') {
        return (
            <div className="jm-form__success" role="status">
                <p className="jm-form__success-title">Thanks — message sent.</p>
                <p>I'll get back to you as soon as I can.</p>
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
            className="jm-form"
        >
            <input type="hidden" name="form-name" value="contact" />
            <p hidden>
                <label>
                    Don't fill this out:
                    <input name="bot-field" onChange={handleChange} />
                </label>
            </p>

            <div className="jm-form__row">
                <div className="jm-field">
                    <label htmlFor="contact-name">Name</label>
                    <input
                        id="contact-name"
                        type="text"
                        name="name"
                        autoComplete="name"
                        required
                        value={values.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="jm-field">
                    <label htmlFor="contact-email">Email</label>
                    <input
                        id="contact-email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        required
                        value={values.email}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="jm-field">
                <label htmlFor="contact-type">What's it about?</label>
                <select
                    id="contact-type"
                    name="project-type"
                    value={values['project-type']}
                    onChange={handleChange}
                >
                    {PROJECT_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                            {type.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="jm-field">
                <label htmlFor="contact-message">Message</label>
                <textarea
                    id="contact-message"
                    name="message"
                    rows={6}
                    required
                    value={values.message}
                    onChange={handleChange}
                />
            </div>

            {status === 'error' && (
                <p className="jm-form__error" role="alert">
                    Something went wrong sending that. Please try again, or email me
                    directly at joshmoriartyfilms@gmail.com.
                </p>
            )}

            <button
                type="submit"
                className="jm-button jm-button--primary"
                disabled={status === 'submitting'}
            >
                {status === 'submitting' ? 'Sending…' : 'Send message'}
            </button>
        </form>
    );
}

export default ContactForm;
