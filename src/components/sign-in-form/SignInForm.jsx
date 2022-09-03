import { useState } from "react";
import "./signinform.scss";
import FormInput from "../form-input/FormInput";
import Button from "../button/Button";


import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "./../../utils/firebase/firebase.utils";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
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

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };
  const SignInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
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
