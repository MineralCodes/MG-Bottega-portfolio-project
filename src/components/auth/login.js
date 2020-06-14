import React, { Component } from 'react';
import axios from 'axios';
 
export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errorMessage: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        axios.post(
            "https://api.devcamp.space/sessions",
            {
                client: {
                    email: this.state.email,
                    password: this.state.password
                }
            },
            { withCredentials: true }
        )
        .then(response => {
            if(response.data.status === "created"){
                this.props.handleSuccessfulAuth();
            } else {
                this.setState({
                    errorMessage: "oops wrong email or username"
                })
            }
        }

        )
        .catch(err => {
            this.props.handleUnSuccessfulAuth();
        })
        event.preventDefault();
        
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            errorMessage: ""
        })
    }
    
    render() {
        return (
            <div>
                <h1>Login to access your dashboard</h1>

                <div>{this.state.errorMessage}</div>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="email"
                        name="email"
                        placeholder="Your email"
                        value={this.state.email}
                        onChange={this.handleChange} 
                    />

                    <input 
                        type="password"
                        name="password"
                        placeholder="Your passwrod"
                        value={this.state.password}
                        onChange={this.handleChange} 
                    />

                    <div>
                        <button className="btn" type="submit">Login</button>
                    </div>
                </form>
            </div>
        );
    }
}