import { React, Component } from "react";
import { Redirect } from "react-router";
class Register extends Component{

    constructor(props){
        super(props);
        this.state = {
            username:"",
            password:"",
            viewState:"default",
            errors:[]
        }
    }

    onChange(event){
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    registerUser(){
        this.setState({
            viewState:"registering",
            errors:[],
        })
        const username = this.state.username
        const password =  this.state.password
        const data = {username:username,password:password}
        let url = '/api/register'
        let headers = new Headers()

        headers.append("Content-Type","application/json")
        fetch(url,{
            method:'POST',
            headers:headers,
            body:JSON.stringify(data),
        })
        .then(d => d.json())
        .then(d => {
            if( d.msg === "duplicate user")
            {
                this.setState({
                    viewState:"default"
                })
                const errors = this.state.errors.slice();
                errors.push("Username already taken")
                this.setState({
                    errors:errors
                })
            }
            else if( d.msg === "registered")
            {
                this.setState({
                    viewState:'registered'
                })
            }

        })
       
    }
    render(){
        if( this.state.viewState === "registered")
            return <Redirect to="/login" />
        return(
            
            <div className="max-w-lg mx-auto  mt-32 p-8 mb-32 rounded-md  border-red-700 shadow-lg bg-white">
            
                <div className='bg-clip bg-red-700 fixed left-0 top-0'></div>
                <h1 className='text-4xl font-bold text-red-700 text-center mb-8'>
                    Register
                </h1>
                <form onSubmit={(e) => this.onSubmit(e)} className=' space-y-8'>
                        <div>
                            <label className='font-semibold  text-md block mb-2'>First Name</label>
                            <input name='firstname' className='px-5 py-3   w-full border-2  focus:border-red-700 focus:outline-none ease-in  transition rounded-md'   type='text'  required autoComplete="off"/>
                        </div>
                        <div>
                            <label className="font-semibold  text-md block mb-2">Last Name</label>
                            <input name='lastname' className='px-5 py-3   w-full border-2 focus:border-red-700 focus:outline-none ease-in transition rounded-md'  type='text'  required autoComplete="off"/>
                        </div>
                        <div>
                            <label className='font-semibold  text-md block mb-2'>Username</label>
                            <input name='username' className='px-5 py-3   w-full border-2  focus:border-red-700 focus:outline-none ease-in  transition rounded-md' value={this.state.username}  type='text' onChange={(e)=>this.onChange(e)} required autoComplete="off"/>
                        </div>
                        <div>
                            <label className="font-semibold  text-md block mb-2">Password</label>
                            <input name='password' className='px-5 py-3   w-full border-2 focus:border-red-700 focus:outline-none ease-in transition rounded-md' value={this.state.password}  type='password' onChange={(e)=>this.onChange(e)} required autoComplete="off"/>
                        </div>
                        <div className='text-red-900 font-bold text-md'>
                            {this.state.errors.map( e => <h2> {e} </h2>)}
                        </div>
                        <button type='button' onClick={() => this.registerUser() } className={`px-4 py-2 flex flex-row bg-red-700 text-white font-bold rounded-md hover:opacity-90 transition-opacity ease-linear ${ this.state.viewState === "registering" ? "animate-pulse" : ""}`} >
                            Register
                        </button>
                </form>
            </div>
        );

    }

}

export default Register;