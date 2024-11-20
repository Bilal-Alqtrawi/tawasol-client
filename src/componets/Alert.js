import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useAlert } from "react-alert"; // its hook

// ({alert}) === (props.alert)
const Alert = ({ alert }) => {
  // useAlert(); // its hook from library useAlert return function
  const showAlert = useAlert();
  useEffect(() => {
    if (alert && alert.show) {
      // msg u want display in alert, type of alert
      showAlert.show(alert.msg, { type: alert.type });
    }
  }, [alert, showAlert]);

  return <></>; // return empty JSX Element
};
// because we have redux we need to connect with him
// redux store and special on alerts Module

// Get state of alert from store
// (state) this is full state for redux store
// map state of alert to Props (namd above alert)
const mapStateToProps = (state) => {
  return {
    // name of module: alerts.js
    alert: state.alerts, // initialState inside alerts
  };
};
// To Connect Component With Redux Store and special on alert modules alert state
/* const connectToStore = connect(mapStateToProps);

const ConnectedComponent = connectToStore(Alert);

export default ConnectedComponent; */

export default connect(mapStateToProps)(Alert);
