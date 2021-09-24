import React, { useContext } from 'react';

import * as firebase from 'firebase/app';

import firebaseConfig from './../../firebase.config';
import 'firebase/auth';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: '/' } };

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signInUser = { name: displayName, email: email };
                setLoggedInUser(signInUser);
                history.replace(from);
            })
            .catch((error) => {
                console.log(error);
                console.log(error.message);
            });
    };
    return (
        <div>
            <button onClick={handleGoogleSignIn}>Google SignIn</button>
        </div>
    );
};

export default Login;
