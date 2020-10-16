import React from 'react';
import TextField from '@material-ui/core/TextField';
import '../../app.scss';
import '../../styles/inputText.scss'
import './index.scss';
import { Container, InputAdornment, IconButton, InputLabel, OutlinedInput, FormControl } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Link, Redirect } from 'react-router-dom';
import MyButton from '../smallComponents/SubmitButton'
import { useDispatch, useSelector } from 'react-redux';
import { authUser } from '../../redux/actions/myUserActionCreator';
import { showAlert } from '../../redux/actions/appActionCreator';


export default props => {
    const dispatch = useDispatch();
    const { personalInfo: { login = "", password = "" }, isAuth } = useSelector(state => state.myUser)
    const [inputValues, setInputValues] = React.useState({
        login,
        password,
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setInputValues({ ...inputValues, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setInputValues({ ...inputValues, showPassword: !inputValues.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSupmitButton = () => {
        if(inputValues.login.trim() && inputValues.password.trim()) {
            dispatch(authUser(inputValues));
        } else {
            dispatch(showAlert('Please, enter login and password.'));
        }
        
    }

    return (
        isAuth ?
        <Redirect to='private' /> :
        <Container className="card auth sign-in-page" >
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
                        type={inputValues.showPassword ? 'text' : 'password'}
                        value={inputValues.password}
                        onChange={handleChange('password')}
                        onKeyUp={(event => event.key === "Enter" && handleSupmitButton())}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {inputValues.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={70}
                    />
                </FormControl>
                <MyButton onClick={handleSupmitButton}>LOGIN</MyButton>
                <div className="link-to-sing-up">
                    <p className="card-text" style={{ display: "inline" }}>Don't have an account? </p>
                    <Link to="/signup">Sign Up</Link>
                </div>
            </div>
        </Container>
    )
}