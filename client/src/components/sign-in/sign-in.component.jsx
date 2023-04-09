import React, { useState } from 'react';
import './sign-in.styles.scss';
import FormInput from '../ui/form-input/form-input.component';
import CustomButton from '../ui/custom-button/custom-button.component'
import { useDispatch } from 'react-redux'
import { userThunks } from '../../store/redux/user/user-slice';

const SignIn = () => {
    
    const dispatch = useDispatch()
    const googleSignIn = (...args) => dispatch(userThunks.googleSignIn(...args))
    const emailSignIn = (...args) => dispatch(userThunks.emailSignIn(...args))
    const [userCredentials, setCredentials] = useState({email: '', password: ''});
    const { email, password } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        await emailSignIn(email, password);
    }

    const handleChange = event => {
        const { value, name } = event.target;
        setCredentials({ ...userCredentials, [name]: value });
    }

    return (
        <div className="sign-in">
            <h3>I already have an account</h3>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput name="email" type="email" handleChange={handleChange} value={email} label="email" required />
                <FormInput 
                    name="password" 
                    type="password" 
                    value={password}
                    handleChange={handleChange}
                    label="password"
                    required 
                />
                <div className="buttons">
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton type="button" onClick={googleSignIn} className="google-sign-in"> Sign In With Google </CustomButton>
                </div>
            </form>
        </div>
    )
}
export default SignIn
