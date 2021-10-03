import React, { useState, Component } from 'react';
import { Container, Form, Button, Checkbox, Header, Message, Segment, Grid, MenuHeader } from 'semantic-ui-react';
import { Link, BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import './Login.css';


function Login(props) {

    let username = "";
    let password = "";
    
    // const state = {
    //     credentials: {username: '', password: ''}
    // }
    const loginUser = async () => {
        const url = 'http://localhost:8000/users/login'
        axios.post(url, {
            'username': username,
            'password': password
        })
        .then((response) => {
            if (response.data == null) {
                alert("user does not exsist");
            }
            else {
                console.log(response.data);
                console.log(typeof(response.data))
                let response_deserialized = JSON.parse(response.data);
                let set_user_id_url = 'http://localhost:8000/users/setuserid'
                axios.post(set_user_id_url, {
                    'user_id': response_deserialized.id,
                }).then(response => {
                    window.location = '/dashboard';
                })
            }
            console.log("user logged in")
        })
    }

    const postUsername = (event => {
        username = event.target.value;
    })

    const postPassword = (event => {
        password = event.target.value;
    })

    const handleLogin = () => {
        props.history.push('/dashboard')
    }

    

    return (

        <div className="login-container">
            <MenuHeader>
            
            </MenuHeader>

            <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" textAlign="center">
                    Log-in to your account
                    </Header>
                    <Form size="large">
                    <Segment stacked>
                        <Form.Input
                        fluid
                        icon="user"
                        iconPosition="left"
                        placeholder="Username"
                        onChange= { postUsername }
                        />
                        <Form.Input
                        fluid
                        icon="lock"
                        iconPosition="left"
                        placeholder="Password"
                        type="password"
                        onChange= { postPassword }
                    
                        />
                        <Button 
                        fluid size="large"
                        onClick={ handleLogin }
                        >
                        Login
                        </Button>
                    </Segment>
                    </Form>
                    <Message>
                        <BrowserRouter>
                            <p className="action-link">
                            Don't have an account? <Link to="/signup" 
                                onClick={() => props.history.push('/signup')}>Signup</Link>
                            </p>
                        </BrowserRouter>
                    </Message>
                </Grid.Column>
            </Grid>
        </div>
        );


    // return (
    
    //     <Container>
    //         <div className="login-container">
    //             <div className="form-container">
    //                 <h1>Login</h1>
    //                     <Form >
    //                         <label>
    //                             Username: 
    //                             <input type="text" ></input>
    //                         </label>
    //                         <br/>
    //                         <label>
    //                             Password: 
    //                             <input type="text" ></input>
    //                         </label>
                        
    //                     </Form>
    //                 <Button type="submit">Login</Button>
    //                 <BrowserRouter>
    //                     <p className="action-link">
    //                         Don't have an account? <Link to="/signup">Signup</Link>
    //                     </p>
    //                 </BrowserRouter>
    //             </div>
    //         </div>
    //     </Container>
    // );
}

export default Login;