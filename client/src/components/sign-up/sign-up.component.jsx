import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { userThunks } from '../../store/redux/user/user-slice';
import './sign-up.styles.scss';

const SignUp = () => {
    const dispatch = useDispatch()
    const signUp = () => dispatch(userThunks.signUp())
    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { displayName, email, password, confirmPassword } = userCredentials;
    const handleSubmit = async event => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }
        signUp({ displayName, email, password });
    }
    const handleChange = event => {
        const { name, value } = event.target;
        setUserCredentials({...userCredentials,[name]: value});
    }
    return (
        <div className='sign-up'>
            <h3 className="title">I do not have an account</h3> 
            <span>Sign up with your email and password</span> 
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput 
                    type="text"
                    name="displayName"
                    value={displayName}
                    onChange={handleChange}
                    label='Display Name'
                    required
                />
                <FormInput 
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    label='Email'
                    required
                />
                <FormInput 
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    label='Password'
                    required
                />
                <FormInput 
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    label='Confirm Password'
                    required
                />
                <CustomButton type="submit">Sign Up</CustomButton>
            </form>
        </div>
    );
}

export default SignUp