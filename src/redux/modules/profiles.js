import { showAlertMessage } from "./alerts";
import { api } from "../../utils";
import { logout } from "./users";

// Commincate With API
export const LOADING = "profile/Loading";
export const GET_PROFILE = "profile/GET_PROFILE";
export const GET_PROFILE_BY_ID = "profile/GET_PROFILE_BY_ID";
export const GET_PROFILES = "profile/GET_PROFILES";
export const UPDATE_PROFILE = "profile/UPDATE_PROFILE";
export const PROFILE_ERROR = "profile/PROFILE_ERROR";
export const UPLOAD_PROFILE_IMAGE = "profile/UPLOAD_PROFILE_IMAGE";
export const CLEAR_PROFILE = "profile/CLEAR_PROFILE";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await api.get("/profiles/me");
    console.log(res.data);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response?.statusText,
        status: err.response?.status,
      },
    });
  }
};
// Create or Update  (formData come from Reacr Form to send to server)

export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      dispatch({ type: LOADING });
      const res = await api.post("/profiles", formData);
      console.log(res.data);
      dispatch({ type: UPDATE_PROFILE, payload: res.data });
      dispatch(
        showAlertMessage(
          edit ? "Profile Updated" : "Profile Created",
          "success"
        )
      );
      if (!edit) {
        history.push("/home");
      }
    } catch (err) {
      const errors = err.response?.data?.error;
      if (errors) {
        errors.forEach((error) =>
          dispatch(showAlertMessage(error.msg, "error"))
        );
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response?.statusText,
          status: err.response?.status,
        },
      });
    }
  };
export const uploadProfileImage = (data) => {
  console.log(data);
  return async (dispatch) => {
    try {
      dispatch({ type: LOADING });
      const res = await api.post("/profiles/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Upload success:", res.data);
      // dispatch({ type: UPDATE_PROFILE, payload: res.data });
      dispatch(showAlertMessage("Profile image updated", "success"));

      return res.data;
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      dispatch(showAlertMessage("Image upload failed", "error"));
    }
  };
};

export const getProfiles = () => async (dispatch) => {
  try {
    dispatch({
      type: LOADING,
    });
    console.log("profiles: ");
    const res = await api.get("/profiles");
    console.log(res);
    console.log("profiles: " + res.data);
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response?.statusText, status: err.response?.status },
    });
  }
};

export const getProfileById = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING,
    });
    const res = await api.get(`/profiles/user/${userId}`);

    dispatch({
      type: GET_PROFILE_BY_ID,
      payload: res.data,
    });

    return res.data;
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response?.statusText, status: err.response?.status },
    });
  }
};

export const addExperience = (formData, history) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING,
    });
    // formData From client
    const res = await api.put("/profiles/experience", formData);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(showAlertMessage("Experience added", "success"));
    history.push("/home");
  } catch (err) {
    const errors = err.response?.data?.errors;

    if (errors) {
      errors.forEach((error) => dispatch(showAlertMessage(error.msg, "error")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response?.statusText,
        status: err.response?.status,
      },
    });
  }
};

export const addEducation = (formData, history) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING,
    });
    const res = await api.put("/profiles/education", formData);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(showAlertMessage("Education added", "success"));
    history.push("/home");
  } catch (err) {
    const errors = err.response?.data?.errors;

    if (errors) {
      errors.forEach((error) => dispatch(showAlertMessage(error.msg, "error")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response?.statusText,
        status: err.response?.status,
      },
    });
  }
};

export const deleteExperience = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING,
    });
    const res = await api.delete(`/profiles/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(showAlertMessage("Experience reomved", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response?.statusText,
        status: err.response?.status,
      },
    });
  }
};

export const deleteEducation = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING,
    });
    const res = await api.delete(`/profiles/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(showAlertMessage("Education reomved", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response?.statusText,
        status: err.response?.status,
      },
    });
  }
};

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      dispatch({
        type: LOADING,
      });
      await api.delete("/profiles");

      dispatch({ type: CLEAR_PROFILE });

      dispatch(showAlertMessage("Your account has been permanently deleted"));

      dispatch(logout());
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response?.statusText,
          status: err.response?.status,
        },
      });
    }
  }
};

const initialState = {
  profile: null,
  selectedProfile: null,
  profiles: [],
  loading: true,
  error: {},
  image: null,
};
export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOADING:
      return { ...state, loading: true };
    case GET_PROFILE:
    case UPDATE_PROFILE:
      console.log(payload);
      return {
        ...state,
        profile: payload,
        image: payload.image,
        loading: false,
      };
    case GET_PROFILE_BY_ID:
      console.log(payload);
      return { ...state, selectedProfile: payload, loading: false };
    case GET_PROFILES:
      return { ...state, profiles: payload, loading: false };
    case PROFILE_ERROR:
      return { ...state, error: payload, loading: false, profile: null };
    case CLEAR_PROFILE:
      return { ...state, profile: null, repos: [] };
    case UPLOAD_PROFILE_IMAGE:
      console.log(payload);
      return { ...state, image: payload, loading: false };
    default:
      return state;
  }
}
