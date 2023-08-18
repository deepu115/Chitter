import logout from "../assets/logout";

const Navbar = () => {
    const handleLogout = () => {
        logout();
    };
    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Navbar;