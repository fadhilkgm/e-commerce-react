import { useState } from "react";
import './signupform.scss'
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/FormInput";
import Button from './../button/Button';

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  // resetting the entered data

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  //submit function

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("password do not match!");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );      
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation error", error);
      }
    }
  };


  //record the data in the input field and set the form fields into it 

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };


  return (
    <div className="sign-up-container">
    <h2>Don't have an account?</h2>
      <span>Sign up with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="DisplayName"
          inputOptions={{
            type: "text",
            required: true,
            onChange: handleChange,
            value: displayName,
            name: "displayName",
          }}
        />
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
        <FormInput
          label="Confirm Password"
          inputOptions={{
            type: "password",
            required: true,
            onChange: handleChange,
            value: confirmPassword,
            name: "confirmPassword",
          }}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
