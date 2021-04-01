import { useContext, useState } from "react";
import "./Login.css";

import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { createUser, initLoginFrameWork, signInUser, handleSignOut } from "./loginManager";

initLoginFrameWork();

function Login() {
  const [isUser, setIsUser] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    message: "",
    state: "",
  });
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    password: "",
    confirmPassword: "",
    email: "",
    // isError: true,
  });

  const [loggedUser, setLoggedUser] = useContext(userContext);

  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { form: { pathname: "/" } };

  const handleInputChange = (event) => {
    let isInputValid;

    if (event.target.name === "name") {
      const re = /^[a-zA-Z '.-]*$/;
      isInputValid = re.test(event.target.value);
    }
    if (event.target.name === "email") {
      const re = /\S+@\S+\.\S+/;
      isInputValid = re.test(event.target.value);
    }
    if (event.target.name === "password") {
      const re = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%&*]{6,}$/;
      isInputValid = re.test(event.target.value);
    }
    if (event.target.name === "confirmPassword") {
      const re = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%&*]{6,}$/;
      isInputValid = re.test(event.target.value);
    }
    if (isInputValid) {
      const newUser = { ...user };
      newUser[event.target.name] = event.target.value;
      setUser(newUser);
    } else {
      const newUser = { ...user };
      newUser[event.target.name] = "";
      setUser(newUser);
    }
  };

  const handleMessage = (state, message) => {
    const newMessage = { ...alertMessage };
    newMessage.state = state;
    newMessage.message = message;
    setAlertMessage(newMessage);
  };

  const handleClearInput = () => {
    document.getElementById("signup-form").reset();
  };

  const handleFormSubmit = (event) => {
    if (!isUser) {
      if (user.email && user.password === user.confirmPassword) {
        createUser(user.name, user.email, user.password).then((res) => {
          handleMessage("success", "Your account have been created successfully");
          handleClearInput();
        });
      } else {
        if (!(user.password === user.confirmPassword)) {
          handleMessage("error", "Password And Confirm Password not matched");
        }
        if (user.email === "") {
          handleMessage("error", "Please use correct email");
        }
      }
    } else {
      signInUser(user, user.email, user.password).then((res) => {
        setUser(res);
        setLoggedUser(res);
        handleMessage("success", "Successfully Signed In");
        history.replace(from);
      });
    }

    event.preventDefault();
  };

  const signOut = () => {
    handleSignOut().then(() => {
      handleMessage("", "");
      setUser({});
      setLoggedUser({});
    });
  };

  return (
    <div className="content">
      <div className="container">
        {/* <div className="logo">
          <img src={logo} alt="" />
        </div> */}
        <div className={`message ${alertMessage.state}`}>
          <p>{alertMessage.message}</p>
        </div>
        {!loggedUser.isSignedIn && (
          <form onSubmit={handleFormSubmit} action="" id="signup-form" className="signup-form">
            {!isUser && (
              <div className="single-input">
                <input onChange={handleInputChange} type="text" name="name" placeholder="Name" />
              </div>
            )}

            <div className="single-input">
              <input onChange={handleInputChange} type="text" name="email" placeholder="Email" />
            </div>

            <div className="single-input">
              <input onChange={handleInputChange} type="password" name="password" placeholder="Password" />
            </div>

            {!isUser && (
              <div className="single-input">
                <input onChange={handleInputChange} type="password" name="confirmPassword" placeholder="Confirm Password" />
              </div>
            )}

            <button className="signin-button">{isUser ? "Sign In" : "Sign Up"}</button>
          </form>
        )}

        {!loggedUser.isSignedIn && (
          <div className="signup-footer">
            {isUser ? (
              <p>
                Create a new account here. <span onClick={() => setIsUser(false)}>Sign Up</span>
              </p>
            ) : (
              <p>
                Already Have an account? <span onClick={() => setIsUser(true)}>Sign In</span>
              </p>
            )}
          </div>
        )}

        {loggedUser.isSignedIn && (
          <div className="user-info">
            <h1>Your Name: {loggedUser.name}</h1>
            <h3>Your Email: {loggedUser.email}</h3>
            <button className="signin-button sign-out" onClick={signOut}>
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
