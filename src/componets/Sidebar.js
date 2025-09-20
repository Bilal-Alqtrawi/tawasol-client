import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/modules/users";
import { getCurrentProfile } from "../redux/modules/profiles";
import defaultImg from "../assets/default.png";
import { useEffect } from "react";

function Sidebar({
  users: { user },
  profiles: { profile },
  logout,
  isOpen,
  closeSidebar,
  getCurrentProfile,
}) {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const { image, status } = profile || {};

  const userImage = image || defaultImg;

  const userName = profile ? profile?.user?.name : user?.name;

  console.log(userName);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      <div className={`sidebar bg-navbar ${isOpen ? "active" : ""}`}>
        <div className="sidebar-header">
          <button className="close-btn" onClick={closeSidebar}>
            <i className="fas fa-times"></i>
          </button>
          <Link to="/home" className="profile-link">
            <img src={userImage} className="sidebar-avatar" alt="User Avatar" />
            <div className="user-info">
              <span className="user-name">{userName}</span>
              {profile && <span className="user-title">{status}</span>}
            </div>
          </Link>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/home" onClick={closeSidebar}>
            <i className="fas fa-home"></i>
            <span>Home</span>
          </NavLink>
          <NavLink to="/posts" onClick={closeSidebar}>
            <i className="fas fa-th-list"></i>
            <span>Posts</span>
          </NavLink>
          <NavLink to="/developers" onClick={closeSidebar}>
            <i className="fas fa-users"></i>
            <span>Developers</span>
          </NavLink>
          <NavLink to="/settings" onClick={closeSidebar}>
            <i className="fas fa-cog"></i>
            <span>Settings</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  users: state.users,
  profiles: state.profiles,
});

export default connect(mapStateToProps, { getCurrentProfile, logout })(Sidebar);
