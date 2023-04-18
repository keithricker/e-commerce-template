import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBmkAZLsK9nHRibcKYMA74sQ1uWjKuVMYc",
    authDomain: "crown-db-90fc9.firebaseapp.com",
    databaseURL: "https://crown-db-90fc9.firebaseio.com",
    projectId: "crown-db-90fc9",
    storageBucket: "crown-db-90fc9.appspot.com",
    messagingSenderId: "1053207512331",
    appId: "1:1053207512331:web:a7bc1128af8132eb3dce0e"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    let userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (err) {
            console.error('error creating user', err.message)
            userRef = { ...userRef,error:err.message, nonExistent:true }
        }
    }
    return userRef;
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });
    return await batch.commit();
}

export const convertSnapshot = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const data = doc.data();
        return {
            ...data,
            id: doc.id,
        }
    });
    return transformedCollection.reduce((accumulated, collection) => {
        accumulated[collection.title.toLowerCase()] = collection;
        return accumulated;
    }, {});
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject)
    })
}

export async function fetchDocuments(name) {
    const collectionRef = firestore.collection(name);
    const snapshot = await collectionRef.get();
    const collectionsMap = await convertSnapshot(snapshot);
    return collectionsMap
  }

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);