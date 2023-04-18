import React from 'react';
import './sign-in-and-sign-up.styles.scss';
import {MuiSignIn} from '../../components/sign-in/sign-in.component';
import {MuiSignUp} from '../../components/sign-up/sign-up.component';

const SignInComponent = MuiSignIn
const SignUpComponent = MuiSignUp

const SignInAndSignUpPage = () => (
    <div className="sign-in-and-sign-up">
        <SignInComponent />
        <SignUpComponent />
    </div>
);
export default SignInAndSignUpPage;
