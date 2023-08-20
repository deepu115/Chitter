const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer mt-auto py-3 text-center">
            <p>© {currentYear} Chitter. All Rights Reserved.</p>
        </footer>
    );
}

export default Footer;
