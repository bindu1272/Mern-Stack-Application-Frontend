import { authAPI } from "../../utilities/apiVariables";
import { getLocalStrorage } from "../../utilities/authorization";

export const signup =
  (body) =>
  (dispatch, getState, { api, Toast }) => {
    return new Promise((resolve, reject) => {
      api({ ...authAPI.signupUser, body })
        .then((response) => {
          resolve(response.data);
          if (response.data.success) {
            Toast({
              type: "success",
              message: response.data.message,
              time: 3000,
            });
          } else {
            Toast({
              type: "error",
              message: response.data.message,
              time: 3000,
            });
          }
        })
        .catch((error) => {
          reject(
            Toast({ type: "error", message: error.toString(), time: 3000 })
          );
        });
    });
  };
  export const isAuthenticated =
  (body) =>
  (dispatch, getState, { api, Toast }) => {
    return new Promise((resolve, reject) => {
      api({ ...authAPI.isAuthenticated})
        .then((response) => {
          resolve(response.data);
          if (response.data.success) {
            Toast({
              type: "success",
              message: response.data.message,
              time: 3000,
            });
          } else {
            Toast({
              type: "error",
              message: response.data.message,
              time: 3000,
            });
          }
        })
        .catch((error) => {
          reject(
            Toast({ type: "error", message: error.toString(), time: 3000 })
          );
        });
    });
  };
  export const getUser =
  () =>
  (dispatch, getState, { api, Toast }) => {
    return new Promise((resolve, reject) => {
      let email=getLocalStrorage("email");
      api({ ...authAPI.getUser(email)})
        .then((response) => {
          resolve(response.data);
          if (response.data.success) {
            Toast({
              type: "success",
              message: response.data.message,
              time: 3000,
            });
          } else {
            Toast({
              type: "error",
              message: response.data.message,
              time: 3000,
            });
          }
        })
        .catch((error) => {
          reject(
            Toast({ type: "error", message: error.toString(), time: 3000 })
          );
        });
    });
  };





  export const signin =
  (body) =>
  (dispatch, getState, { api, Toast }) => {
    return new Promise((resolve, reject) => {
      api({ ...authAPI.signinUser, body })
        .then((response) => {
          resolve(response.data);
          if (response.data.success) {
            Toast({
              type: "success",
              message: response.data.message,
              time: 3000,
            });
          } else {
            Toast({
              type: "error",
              message: response.data.message,
              time: 3000,
            });
          }
        })
        .catch((error) => {
          reject(
            Toast({ type: "error", message: error.toString(), time: 3000 })
          );
        });
    });
  };

  export const updateProfile =
  (body) =>
  (dispatch, getState, { api, Toast }) => {
    return new Promise((resolve, reject) => {
      api({ ...authAPI.updateProfile, body })
        .then((response) => {
          resolve(response.data);
          if (response.data.success) {
            Toast({
              type: "success",
              message: response.data.message,
              time: 3000,
            });
          } else {
            Toast({
              type: "error",
              message: response.data.message,
              time: 3000,
            });
          }
        })
        .catch((error) => {
          reject(
            Toast({ type: "error", message: error.toString(), time: 3000 })
          );
        });
    });
  };