
import { initializeApp } from "firebase/app";
import { getAuth ,GoogleAuthProvider, signOut} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_APIKEY,
  authDomain: import.meta.env.VITE_REACT_APP_AUTHDOM,
  projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_STORE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_MSG_ID,
  appId: import.meta.env.VITE_REACT_APP_APPID,
};

const logout = async ()=> {
  const auth = getAuth()


  try {
    
      await signOut(auth)
     
      console.log('user Signed Out');
      
  } catch (error) {
    console.error(error);
    
  }
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
const db = getFirestore(app)
const storage = getStorage(app)
const firestore = getFirestore(app)

export {
    auth,
    googleProvider,
    logout,
    db,
    storage,
    firestore
}

