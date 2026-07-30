import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import PageHeader from '../components/PageHeader';

function NotFound() {
    return (
        <>
            <PageMeta
                title="Page not found | Josh Moriarty"
                description="That page does not exist."
            />
            <div className="jm-container jm-page">
                <PageHeader eyebrow="404" title="Page not found">
                    That link does not lead anywhere. The portfolio is still here.
                </PageHeader>
                <Link className="jm-button jm-button--primary" to="/">
                    Back to home
                </Link>
            </div>
        </>
    );
}

export default NotFound;
