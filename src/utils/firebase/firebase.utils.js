import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword , signInWithEmailAndPassword} from 'firebase/auth'
import { getFirestore,doc,getDoc,setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDC56RO2vJcYk99BXYRInr3MO8elDexdbY",
  authDomain: "crown-clothing-ac92c.firebaseapp.com",
  projectId: "crown-clothing-ac92c",
  storageBucket: "crown-clothing-ac92c.appspot.com",
  messagingSenderId: "370799690604",
  appId: "1:370799690604:web:326f58d3b4b530c5cbe949"
};

// eslint-disable-next-line no-unused-vars
const firebaseapp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});


export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) =>{
    const userDocRef = doc(db, 'users', userAuth.uid)
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    //if user Data exists

    if(!userSnapshot.exists()){
        const {displayName , email} = userAuth;
        const createdAt = new Date();
    
    try{
        await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInformation
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

export const createAuthUserWithEmailAndPassword = async (email, password) =>{
if(!email || !password) return;
return await createUserWithEmailAndPassword(auth, email, password);
}
export const signInAuthUserWithEmailAndPassword = async (email, password) =>{
if(!email || !password) return;
return await signInWithEmailAndPassword(auth, email, password);
}
