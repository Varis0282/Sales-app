import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="Navbart">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
        {localStorage.getItem("User")==null?<NavLink className="navbar-brand" to="/">
          SALES APP
        </NavLink>:<NavLink className="navbar-brand" to="/addsale">
          SALES APP
        </NavLink>}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/addsale">
                  ADD SALES
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/topsale">
                  TOP 5 SALES
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/revenue">
                  TODAY'S TOTAL REVENUE
                </NavLink>
              </li>
              {localStorage.getItem("token") == null ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    LOGIN
                  </NavLink>
                </li>
              ) : (
                ""
              )}
              {localStorage.getItem("token") == null ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    REGISTER
                  </NavLink>
                </li>
              ) : (
                ""
              )}
              {localStorage.getItem("token") != null ? (
                <li className="nav-item">
                  <NavLink className="nav-link text-muted" to="/" onClick={logout}>
                    LOGOUT
                  </NavLink>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
