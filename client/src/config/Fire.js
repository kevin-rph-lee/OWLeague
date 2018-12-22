import firebase from 'firebase';
const config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
    apiKey: "AIzaSyDTeKnnIAOJJ7TNMCro4RKvVikgkfO2jLE",
    authDomain: "owleague-695e2.firebaseapp.com",
    databaseURL: "https://owleague-695e2.firebaseio.com",
    projectId: "owleague-695e2",
    storageBucket: "owleague-695e2.appspot.com",
    messagingSenderId: "250781333219"
};
const fire = firebase.initializeApp(config);
export default fire;