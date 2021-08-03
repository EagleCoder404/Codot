import { Component } from "react";
import { Link } from "react-router-dom";
import NoFormCreated from "../Illustrations/NoFormCreated";
import Loading from "../../loading";

function getAPI(token){
    const axios = require("axios");
    const base64 = require("base-64")
    const axios_instance = axios.create({
            headers:{
                    'Authorization': 'Basic '+base64.encode(token+":boo"),
                    'Content-Type': 'application/json'
            }
    });
    return axios_instance;
}

function FormEntry(props){
    let link = "";
    if(props.form_type !== "story")
        link=`/form/${props.form_id}/fill`
    else
        link=`/narrator/${props.form_id}`
    return(
        <div className='p-6 shadow-md rounded-lg hover:scale-105 transform transition hover:shadow-lg'>
            <div>
                <h3 className='mt-1 text-3xl font-extrabold capitalize'>
                    {props.form_name}
                </h3>
                <p className='font-light text-sm text-gray-800'> {props.form_desc} </p>
            </div>

            <h1 className='font-semibold'>
                Form Link :  
                { props.form_type !== "story" ? 
                 <Link className="font-base text-blue-500 hover:underline" to={`/form/${props.form_id}/fill`}> {window.location.host+link}</Link>
                :
                 <Link className="font-base text-blue-500 hover:underline" to={`/narrator/${props.form_id}`}>{window.location.host+link}</Link>
                }
            </h1>
            <div className={`mt-6 flex flex-row space-x-6 ${ props.mode === 'admin' ? "" : "hidden" }`} >
                {/* <Link onClick={props.resetHandler} className={`px-3 py-2 font-bold border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-colors ease-in-out`} to="#">
                    Reset
                </Link> */}
                <Link className={`px-3 py-2 font-bold border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-colors ease-in-out`} to={`/story/${props.form_id}/responses`}>
                    Responses
                </Link>
            </div>

        </div>
    )
}

class FormList extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading:true,
            form_entries:[

            ]
        }
        this.resetStory = this.resetStory.bind(this)
    }
    componentDidMount(){
        const token = this.props.token;
        console.log(token)
        const headers = new Headers();
        let base64 = require("base-64");
        headers.append("Authorization","Basic "+base64.encode(token+":boo"))
        headers.append("Content-Type","application/json")

        fetch("/api/form/all",{
            method:"GET",
            headers:headers
        })
        .then(d => d.json())
        .then( data => {    
            if( data.length > 0)
            {
                const form_entries = data
                this.setState({
                    form_entries:form_entries,
                    isLoading:false,
                })
            }
            this.setState({
                isLoading:false
            })
        })
    }

    resetStory(story_id){
        const api = getAPI(this.props.token)
        api.get(`/api/story/${story_id}/reset`)
        .then( d => console.log(d))
    }

    render(){
        if(this.state.isLoading)
            return(
                <div className="absolute flex w-screen h-screen">
                    <div class='m-auto'>
                        <Loading/>
                    </div>
                </div>
            )
        const FormEntryComponents = this.state.form_entries.map((form_entry, index) => <FormEntry key={index} form_id={form_entry.id} mode={this.props.mode} form_name={form_entry.heading} resetHandler={(e) => this.resetStory(form_entry.id)} form_desc={form_entry.description} form_type={form_entry?.type} />)
        return(
            <div className="max-w-4xl py-8 mx-auto space-y-8 ease-in-out transition transform">
                <div className="flex flex-row justify-start space-x-6 border-b border-l border-blue-500 p-3 ">
                    <Link className=" px-5 py-3 rounded-md bg-blue-500 font-semibold text-white" to="/">
                        Landing Page
                    </Link>
                    {this.props.mode === "admin" ? 
                    <Link className=" px-5 py-3 rounded-md bg-blue-500 font-semibold text-white" to="/upload_story">
                        Upload Story
                    </Link> : ""}
                </div>
                { FormEntryComponents.length > 0 ? FormEntryComponents : <NoFormCreated/> }
            </div>
        );
    }
}

export default FormList;