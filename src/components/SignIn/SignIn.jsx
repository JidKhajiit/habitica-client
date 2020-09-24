import React from 'react';
import TextField from '@material-ui/core/TextField';
import '../../app.css';
import { Container } from '@material-ui/core';
import MyButton from '../smallComponents/Button'
import SubmitButton from '../../styles/SubmitButton'


const SignIn = (props) => {
    return (
        <Container className="card" >
            <div class="card-body">
                <h2 className="card-tytle">Welcome</h2>
                <TextField
                    required
                    id="outlined-login-input"
                    label="Login"
                    // defaultValue="Hello World"
                    variant="outlined"
                />
                <TextField
                    required
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                />
                <MyButton>Submit</MyButton>
                <p class="card-text"></p>
            </div>
        </Container>
    )
}

export default SignIn