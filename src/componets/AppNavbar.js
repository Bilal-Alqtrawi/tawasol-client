import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import defaultImg from "../assets/default.png";

const getPageTitle = (pathname) => {
  if (pathname.includes("/posts")) return "Posts";
  if (pathname.includes("/developers")) return "Developers";
  if (pathname === "/home" || pathname === "/") return "Home";
  const name = pathname.split("/").pop();
  return name.charAt(0).toUpperCase() + name.slice(1);
};

function AppNavbar({ user, profile, toggleSidebar }) {
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  return (
    <div className="app-navbar">
      <div className="navbar-left">
        <button className="navbar-toggle-btn" onClick={toggleSidebar}>
          <i className="fas fa-bars fa-1x fa-fw"></i>
        </button>
        <h2>{pageTitle}</h2>
      </div>

      <div className="navbar-right">
        <div className="navbar-user-menu">
          <img src={profile?.image || defaultImg} alt="User Avatar" />
          <div className="user-info">
            <span className="user-name">{user?.name}</span>
            <span className="user-status">{user?.profile?.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.users.user,
  profile: state.profiles.profile,
});

export default connect(mapStateToProps)(AppNavbar);
