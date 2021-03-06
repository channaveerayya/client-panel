import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
// Reducers
import notifyReducer from './reducers/notifyReducer'
import settingsReducer from './reducers/settingsReducer'

const firebaseConfig = {
    apiKey: "AIzaSyDCT1a19yLRLhyovjCY078J9MFAc3_uvr8",
    authDomain: "clientpanel-5cbb8.firebaseapp.com",
    databaseURL: "https://clientpanel-5cbb8.firebaseio.com",
    projectId: "clientpanel-5cbb8",
    storageBucket: "clientpanel-5cbb8.appspot.com",
    messagingSenderId: "719568763998",
    appId: "1:719568763998:web:1ca2d32fce348886d848cf",
    measurementId: "G-H9SH7DY7ZR"
};

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Init firebase instance
firebase.initializeApp(firebaseConfig);
// Init firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    notify: notifyReducer,
    setting: settingsReducer
});

//check for settings in local storage
if (localStorage.getItem('settings') == null) {
    //default settings
    const defaultSettings = {
        disableBalanceOnAdd: true,
        disableBalanceOnEdit: false,
        allowRegistration: false
    }

    // set to local storage
    localStorage.setItem('settings', JSON.stringify(defaultSettings))
}

// Create initial state
const initialState = { setting: JSON.parse(localStorage.getItem('settings')) };

// Create store
const store = createStoreWithFirebase(
    rootReducer,
    initialState,
    compose(
        reactReduxFirebase(firebase),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;


