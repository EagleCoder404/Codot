import { React, Component } from "react";
import { BrowserRouter, Switch, Route, Link, Redirect} from "react-router-dom";
import Register from "./register"

class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            username:"",
            password:"",
            submitted:false,
            isLoginFail:false,
        }
        console.log(this.props.location)
    }

    onChange(event){
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    async loginUser(){
        this.setState({
            isLoginFail:false,
        })
        const username = this.state.username
        const password =  this.state.password
        let base64 = require('base-64')
        let url = '/api/login'
        let headers = new Headers()
        headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password))
        const token = await fetch(url,{
            method:'GET',
            headers:headers
        }).then(d => {
            if (d.status === 401)
                return {msg:"error"}
            else 
                return d.json()
        })
        return token
    }

    async onSubmit(event){
        event.preventDefault()
        const { token, duration, user_type, msg } = await this.loginUser()
        if ( msg === "error")
        {
            this.setState({
                isLoginFail:true
            })
            console.log("login fail")
            return;
        }
        this.setState({
            submitted:true
        })
        this.props.setToken(token, duration , this.state.username, user_type)
    }

    render(){
        return(
                        
                        <div className="max-w-lg mx-auto  mt-32 p-8 rounded-md  border-red-700 shadow-lg bg-white">
                            { this.state.submitted ? <Redirect to="/"/> : ""}
                            <div className='bg-clip bg-blue-500 fixed left-0 top-0'></div>
                            <h1 className='text-4xl font-bold text-blue-500 text-center mb-8'>
                                Login
                            </h1>
                            <form onSubmit={(e) => this.onSubmit(e)} className=' space-y-8'>
                                    <div>
                                        <label className='font-semibold  text-md block mb-2'>Username</label>
                                        <input name='username' className='px-5 py-3   w-full border-2  focus:border-green-700 focus:outline-none ease-in  transition rounded-md' value={this.state.username}  type='text' onChange={(e)=>this.onChange(e)} required autoComplete="off"/>
                                    </div>
                                    <div>
                                        <label className="font-semibold  text-md block mb-2">Password</label>
                                        <input name='password' className='px-5 py-3   w-full border-2 focus:border-green-700 focus:outline-none ease-in transition rounded-md' value={this.state.password}  type='password' onChange={(e)=>this.onChange(e)} required autoComplete="off"/>
                                    </div>
                                    { this.state.isLoginFail ? 
                                        <div className='font-bold text-red-700'>
                                            Login Failed
                                        </div>
                                    :
                                    ""
                                    }
                                    <div className="space-x-3">
                                        <input name='login' className='px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:opacity-90 transition-opacity ease-linear' type='submit' value="login"/>
                                        <Link to="/register" className="px-4 py-2 inline-block border border-blue-500 text-blue-500 font-bold rounded-md hover:bg-blue-500 hover:text-white transition ease-linear">Register</Link>
                                    </div>
                            </form>
                        </div>
        );

    }

}

export default Login;