import { useState } from "react";
import "./signinform.scss";
import FormInput from "../form-input/FormInput";
import Button from "../button/Button";
// import { UserContext } from "../../contexts/user.context";

import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "./../../utils/firebase/firebase.utils";

//default form fields ie, empty

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  //reseting the entered datas
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  //submit function

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      resetFormFields();
    } 
    catch (error) {
      switch(error.code){
        case 'auth/wrong-password':
          alert("incorrect password for email")
          break
        case 'auth/user-not-found':
          alert("no user associated with this email")
          break
        default:
          console.log(error)
      }
    console.log(error)
  }
  };

  //record the data in the input field and set the form fields into it 

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  //sign in with google method 

  const SignInWithGoogle = async () => {
   await signInWithGooglePopup();
    
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account</h2>
      <span>Sign up with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          inputOptions={{
            type: "email",
            required: true,
            onChange: handleChange,
            value: email,
            name: "email",
          }}
        />
        <FormInput
          label="Password"
          inputOptions={{
            type: "password",
            required: true,
            onChange: handleChange,
            value: password,
            name: "password",
          }}
        />
        <div className="buttons-container">
          <Button type="submit">
            Sign In
          </Button>
          <Button type="button" buttonType="google" onClick={SignInWithGoogle}>
            Google sign
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
