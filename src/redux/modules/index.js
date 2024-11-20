import { combineReducers } from "redux";
import alerts from "./alerts";
import users from "./users";
import posts from "./posts";
import profiles from "./profiles";

// combine all reducers
export default combineReducers({
  users,
  alerts,
  profiles,
  posts,
});
