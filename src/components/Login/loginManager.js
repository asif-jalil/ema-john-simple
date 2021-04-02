import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";

export const initLoginFrameWork = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
};

export const createUser = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      updateUserProfile(name);
    })
    .catch((error) => {
      var errorMessage = error.message;
      // return errorMessage;
      console.log(errorMessage);
    });
};

export const signInUser = (user, email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      const data = res.user;
      const newInfo = { ...user };
      newInfo.isSignedIn = true;
      newInfo.name = data.displayName;
      newInfo.email = data.email;
      newInfo.isError = false;
      return newInfo;
    })
    .catch((error) => {
      // const newInfo = { ...user };
      // newInfo.isError = true;
      var errorMessage = error.message;
      console.log(errorMessage);
      // return errorMessage;
    });
};

const updateUserProfile = (name) => {
  const currentUser = firebase.auth().currentUser;
  currentUser
    .updateProfile({
      displayName: name,
    })
    .then(function () {
      // console.log("Display Name Added Successfully");
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const handleSignOut = () => {
  return firebase
    .auth()
    .signOut()
    .then(() => {})
    .catch((error) => {
      return error;
    });
};
