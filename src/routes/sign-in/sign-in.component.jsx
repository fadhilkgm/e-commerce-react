import React from 'react';
import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'


const SignIn = () => {
    const logGoogleUser = async () =>{
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }
    return (
        <div>
            sign in page
            <button onClick={logGoogleUser}>signIn With google</button>
        </div>
    );
}

export default SignIn;
