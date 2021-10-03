import React, { useState, useEffect, Component } from "react";
import { Container, Form, Button, Checkbox, Header, Message, Segment, Grid} from "semantic-ui-react";
import axios from "axios";
import { BrowserRouter, Link } from "react-router-dom";

function Signup(props) {

    // const [username, setUsername] = useState('');
    // const [password,setPassword] = useState('');
    // const [balance, setBalance] = useState('');
    let username = "";
    let password = "";
    let balance = 0;

    function register(){
        const url = "http://localhost:8000/users/create";
        axios.post(url, {
            'username': username,
            'password': password,
            'balance': balance,
        })
        .then(response =>{
            console.log(response)
            if (response.data == null) {
                alert("Problem creating account");
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
        })
        .catch(err => {
            console.log(err)
            console.log('error')
        })
    }

    const postUsername = (event => {
        username = event.target.value;
    })

    const postPassword = (event => {
        password = event.target.value;
    })
    
    const postBalance = (event => {
        balance = event.target.value;
    })

    const handleSignin = () => {
        props.history.push('/')
    }


    return (
        <div className="login-container">
            <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" textAlign="center">
                    Create Account
                    </Header>
                    <Form size="large">
                        <Segment stacked>
                            <Form.Input
                            fluid
                            icon="user"
                            iconPosition="left"
                            placeholder="Username"
                            onChange={ postUsername }
                            />
                            <Form.Input
                            fluid
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password"
                            type="password"
                            onChange={ postPassword }
                            />
                            <Form.Input
                            fluid
                            icon="dollar sign"
                            iconPosition="left"
                            placeholder="Deposit Amount"
                            type="number"
                            step="0.01"
                            onChange={ postBalance }
                            />
                            <Button fluid size="large" 
                                    onClick={ register }              
                                    >
                                Sign Up
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        <BrowserRouter>
                            <p className="action-link">
                            Already have an account? <Link to="/">Log in</Link>
                            </p>
                        </BrowserRouter>
                    </Message>
                </Grid.Column>
            </Grid>
        </div>
        );

//     return (

//         <Container>
//                 <div className="signup-container">
//                     <div className="form-container">
//                         <h1>Create your account</h1>
//                         <Form >
//                             <label>
//                                 <div class="ui labeled input">
//                                     <div class="ui label"> http://</div>
//                                     <input type="text" placeholder="username"></input>
//                                 </div>
//                             </label>
//                             <br/>
//                             <div class="ui labeled input">
//                                 <div class="ui label"> http://</div>
//                                 <input type="text" placeholder="password"></input>
//                             </div>
//                             <br/>
//                             <div class="ui right labeled input">
//                                 <label for="amount" class="ui label">$</label>
//                                 <input type="text" placeholder="Amount" id="amount"/>
//                                 <div class="ui basic label">.00</div>
//                             </div>
//                             <br/>
//                             <Checkbox label="By continuing I agree to the Terms of Service and Privacy Policy."/>
//                         </Form>
//                         <Button type="submit">Create Account</Button>
                        

//                     </div>
//                 </div>
//             </Container>
//   );

}

export default Signup;
