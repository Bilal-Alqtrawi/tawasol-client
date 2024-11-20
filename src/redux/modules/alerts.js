/* 
  Every Module Have This Info 
  Define Actions Object (event happesn from client) can be more action not one
  Action Creator function
  Reducer Function just one for module
*/

// this convintion stander to use  from programmer
const SHOW_ALERT_MESSAGE = "alerts/SHOW_ALERT_MESSAGE"; //  alert/nameOfAction

// Action Creator
// type = "info" can be warinnig or error
export function showAlertMessage(msg, type = "info") {
  // thunk Function
  return function showAlertMessageThunk(dispatch) {
    // dispatch  function
    dispatch({
      // Type Of Action
      type: SHOW_ALERT_MESSAGE,
      // Info Related With Action store in {object}
      payload: {
        show: true,
        msg,
        type,
      },
    });
  };
}
// state if module, action its content Object of action creator
// state should define for him default state same info in payload
const initialState = {
  show: false,
  msg: "",
  type: "info",
};
// when call action creator then reducer call it
export default function reducer(state = initialState, action) {
  // based on type action
  switch (action.type) {
    case SHOW_ALERT_MESSAGE:
      // return new state
      return {
        ...state, // this mean copy of state here and edit it in below
        show: true, // if happen dispatch
        msg: action.payload.msg,
        type: action.payload.type,
      };
    default:
      return state;
  }
}

// Reducer does not Edit In same cuurent State he just copy from state and return new of state copied
