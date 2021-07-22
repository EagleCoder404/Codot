import { Component } from "react";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import Login from "./components/login";
import FormList  from "./components/FormList/form_list";
import Register from "./components/register";
import Narrator from "./components/Narrator/narattor"
import StoryUpload from "./components/StoryUpload/story_upload";
import StoryResponse from "./components/StoryResponse/story_response";
import LandingPage from "./components/landing_page"

function PrivateRoute (props) {
    return (
      <Route path={props.path}>
          {
              props.authed !== null ?
              props.children :
              <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
          }
      </Route>
    )
}

class App extends Component{
    constructor(props){
        super(props)
        this.state ={
            username:sessionStorage.getItem('username'),
            token:sessionStorage.getItem('token'),
            tokenEndTime:sessionStorage.getItem('tokenEndTime'),
            userType:sessionStorage.getItem('userType'),
            tokenCheckerId:null,
        }
        this.setUserDetails = this.setUserDetails.bind(this)
        this.logout = this.logout.bind(this);
        this.tokenChecker = this.tokenChecker.bind(this);
    }

    tokenChecker(){
        const now  = new Date()
        const end = new Date(Number(this.state.tokenEndTime))
        if ( now > end)
        {
            this.logout()
        }
    }

    componentDidMount(){
        if(this.state.token !== null)
        {

            const id = setInterval(this.tokenChecker, 1000);
            this.setState({
                tokenCheckerId:null,
                tokenCheckerId:id
            })
        }
    }

    setUserDetails( token, tokenDuration, username, usertype){

        const now = new Date();
        const endTime = now.getTime() + tokenDuration*1000
        const tokenEndTime = new Date( endTime ).getTime();
        const id = setInterval(this.tokenChecker, 1000);

        this.setState({
            token:token,
            username:username,
            tokenEndTime:tokenEndTime,
            userType:usertype,
            tokenCheckerId:id
        })

        sessionStorage.setItem("token", token)
        sessionStorage.setItem("username", username)
        sessionStorage.setItem("tokenEndTime", tokenEndTime)
        sessionStorage.setItem("userType", usertype)
    }

    logout(){
        clearInterval(this.state.tokenCheckerId)

        this.setState({
            token:null,
            username:null,
            tokenEndTime:null,
            userType:null,
            tokenCheckerId:null,
        })
        sessionStorage.clear()
    }

    render(){
        return(
            <BrowserRouter>
                {/* <nav className="p-3 text-lg bg-blue-500 text-white font-bold space-x-3 flex flex-row justify-center">
                    <Link to='/' className="px-8 py-2 bg-blue-300 rounded-md text-white transition transform ease-in-out hover:scale-105">Home</Link>
                    <Link to='/upload_story' className="px-8 py-2 bg-blue-300 rounded-md text-white transition transform ease-in-out hover:scale-105">Upload Story</Link>
                    {
                        (this.state.token === null) ?
                        <>
                            <Link to='/login' className="px-8 py-2 bg-blue-300 rounded-md text-white transition transform ease-in-out hover:scale-105">Login</Link>
                            <Link to='/register' className="px-8 py-2 bg-blue-300 rounded-md text-white transition transform ease-in-out hover:scale-105">Register</Link>
                        </>
                        :
                        <>
                            <Link to='/' className="px-8 py-2 bg-blue-300 rounded-md text-white transition transform ease-in-out hover:scale-105" onClick={this.logout}>Logout</Link>
                        </>

                    }



                </nav> */}

                <Switch>




                    <Route path="/story/:id/responses">
                        <StoryResponse token={this.state.token} />
                    </Route>

                    <PrivateRoute path="/narrator/:id" authed={this.state.token}>
                        <Narrator token={this.state.token }/>
                    </PrivateRoute>

                    <Route path="/login">
                        <Login setToken={this.setUserDetails} />
                    </Route>

                    <Route path="/upload_story">
                        <StoryUpload setToken={this.state.token} />
                    </Route>

                    <Route path="/register">
                        <Register/>
                    </Route>
                    <Route path="/corner">
                      <FormList mode={this.state.userType} token={this.state.token}/>
                    </Route>
                    <Route path="/">
                        {/* <FormList mode={this.state.userType} token={this.state.token}/> */}
                        <LandingPage/>
                    </Route>

                </Switch>

            </BrowserRouter>
        )
    }

}

export default App
