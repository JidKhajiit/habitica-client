import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import '../../app.scss';
import '../../styles/inputText.scss';
import './index.scss';
import { Container, InputAdornment, IconButton, InputLabel, OutlinedInput, FormControl } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Link } from 'react-router-dom';
import MyButton from '../smallComponents/SubmitButton'
import { useDispatch } from 'react-redux';
import { createUser } from '../../redux/actions/myUserActionCreator';


export default props => {
    const dispatch = useDispatch()
    const [inputValues, setInputValues] = useState({
        login: '',
        password: '',
        firstName: '',
        lastName: ''
    });
    const [spy, setSpy] = useState(false);

    const handleChange = (prop) => (event) => {
        setInputValues({ ...inputValues, [prop]: event.target.value });
      };

    const handleClickShowPassword = () => {
        setSpy(!spy);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSupmitButton = () => {
        dispatch(createUser(inputValues));
        props.history.push('/signin')
    }

    return (
        <Container className="card auth sign-up-page" >
            <div className="card-body">
                <h2 className="card-tytle">Welcome</h2>
                <TextField
                    // required
                    id="outlined-login-input"
                    label="Login"
                    variant="outlined"
                    value={inputValues.login}
                    onChange={handleChange('login')}
                />
                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={spy ? 'text' : 'password'}
                        value={inputValues.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {spy ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={70}
                    />
                </FormControl>
                <TextField
                    // required
                    id="outlined-first-name-input"
                    label="First name"
                    variant="outlined"
                    value={inputValues.firstName}
                    onChange={handleChange('firstName')}
                />
                <TextField
                    // required
                    id="outlined-last-name-input"
                    label="LastName"
                    variant="outlined"
                    value={inputValues.lastName}
                    onChange={handleChange('lastName')}
                />
                <MyButton onClick={handleSupmitButton}>REGISTER</MyButton>
                <div className="link-to-sing-in">
                    <p className="card-text" style={{ display: "inline" }}>Have an account? </p>
                    <Link to="/signin">Sign In</Link>
                </div>


            </div>
        </Container>
    )
}