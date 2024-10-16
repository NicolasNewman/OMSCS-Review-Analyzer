const last_updated = import.meta.env.VITE_LAST_UPDATED ?? 'unknown';

function Footer() {
    return (
        <div className="mt-8 mb-2">
            <div>
                Website created by{' '}
                <a href="https://github.com/NicolasNewman">@NicolasNewman</a>
            </div>
            <div>
                Data provided by{' '}
                <a href="https://www.omscentral.com/">OMSCentral.com</a>
            </div>
            <div>Reviews last updated: {last_updated}</div>
            <a href="https://github.com/NicolasNewman/OMSCS-Review-Analyzer">
                Source code
            </a>
        </div>
    );
}

export default Footer;
