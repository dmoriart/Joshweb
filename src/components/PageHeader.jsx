/** Page title block. One <h1> per page, always first in the main landmark. */
function PageHeader({ eyebrow, title, children }) {
    return (
        <header className="jm-page-header">
            {eyebrow && <span className="jm-page-header__eyebrow">{eyebrow}</span>}
            <h1>{title}</h1>
            {children && <p>{children}</p>}
        </header>
    );
}

export default PageHeader;
