import { Fragment, useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import { connect } from "react-redux";
import Spinner from "./Spinner";
import { Navigate } from "react-router-dom";
import AppNavbar from "./AppNavbar";

// Props => Is Component
const Private = ({
  component: Component,
  users: { isAuthenticated, loading },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : isAuthenticated ? (
        <Fragment>
          <div className="app-layout">
            <Sidebar isOpen={isOpen} closeSidebar={() => setIsOpen(false)} />
            <div className="app-right">
              <AppNavbar toggleSidebar={toggleSidebar} />
              <div className="app-main">
                <Component />
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <Navigate to="/login" />
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps)(Private);
