import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore,doc,getDoc,setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDC56RO2vJcYk99BXYRInr3MO8elDexdbY",
  authDomain: "crown-clothing-ac92c.firebaseapp.com",
  projectId: "crown-clothing-ac92c",
  storageBucket: "crown-clothing-ac92c.appspot.com",
  messagingSenderId: "370799690604",
  appId: "1:370799690604:web:326f58d3b4b530c5cbe949"
};

const firebaseapp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});


export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) =>{
    const userDocRef = doc(db, 'users', userAuth.uid)
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists())

    //if user Data exists

    if(!userSnapshot.exists()){
        const {displayName , email} = userAuth;
        const createdAt = new Date();
    
    try{
        await setDoc(userDocRef, {
            displayName,
            email,
            createdAt
        });
    }catch(error){
        console.log('error creating the user', error.message)
    }

    return userDocRef;
    }



    //if user Data does not exists
    // create / set the doc with the data from userAuth in my collection



    //return userDocRef


} 

