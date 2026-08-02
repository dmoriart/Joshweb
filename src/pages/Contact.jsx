import PageMeta from '../components/PageMeta';
import PageHeader from '../components/PageHeader';
import ContactForm from '../components/ContactForm';
import { CV_PATH, EMAIL, SITE_URL, SOCIAL_LINKS, routes } from '../routes';
import './Contact.css';

const meta = routes.find((route) => route.path === '/contact');

function Contact() {
    return (
        <>
            <PageMeta title={meta.title} description={meta.description} path="/contact" />
            <div className="jm-container jm-page">
                <PageHeader eyebrow="Contact" title="Get in touch">
                    Available for internships, junior projects and collaborative work in
                    comics, animation and film.
                </PageHeader>

                <div className="jm-contact">
                    <ContactForm />

                    <aside className="jm-contact__aside">
                        <h2>Direct</h2>
                        <ul className="jm-contact__list">
                            <li>
                                <span>Email</span>
                                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                            </li>
                            {SOCIAL_LINKS.map((link) => (
                                <li key={link.href}>
                                    <span>{link.label}</span>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {/* Descriptive rather than "click here" —
                                            the link text stands alone out of context. */}
                                        {link.label} — @joshmoriartyfilms
                                    </a>
                                </li>
                            ))}
                            <li>
                                <span>Portfolio</span>
                                <a href={SITE_URL}>joshmoriartyfilms.ie</a>
                            </li>
                            <li>
                                <span>CV</span>
                                <a href={CV_PATH} download>
                                    Download CV (PDF)
                                </a>
                            </li>
                        </ul>
                    </aside>
                </div>
            </div>
        </>
    );
}

export default Contact;
