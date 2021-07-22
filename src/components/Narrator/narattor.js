import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import getAPI from "../api";
import Tutorial from "./tutorial"
import Loading from "../../loading";
import DelayedRender from "./DelayedRender";
import LoadingScreen from "../loading_screen";

function Choice(props){
    console.log(props.id)
    return(
        <button className="flex-1 px-4 py-3 font-bold  border bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:text-white transition-colors ease-in-out" onClick={ (e) => props.onClickHandler(props.id) }> 
            <div className='flex flex-row justify-center'>
                <span>
                    {props.text} 
                </span>
                <span className=" text-red-700 font-bold">
                    { props.id === null ? " DeadEnd " : ""}
                </span>                        
            </div>
        </button>
    )
}



function Narrator(props){

    const [storyId, setStoryId] = useState(useParams().id);
    const [isLoading, setIsLoading] = useState(true);
    const [nextId, setNextId] = useState(null);
    const [mainText, setMainText] = useState("");
    const [status, setStatus] = useState("");
    const [choices, setChoices] = useState([]);
    const [showTutoral, setShowTutorial] = useState(true)
    const [converstaionLoadingTime, setConversationLoadingTime] = useState(7000)

    useEffect( () => {
        setIsLoading(true)
        const api = getAPI(props.token);
        const url = nextId === null ? `/api/story/${storyId}` : `/api/story/${storyId}/cid/${nextId}`;
        api.get(url)
        .then( data => {
            const conversationSnippet = data.data;
            setMainText(conversationSnippet.mainText);
            setChoices(conversationSnippet.choices);
            setStatus(conversationSnippet.status)
            setIsLoading(false)
        })
        
    },[nextId]);
    
    function story_restart(){
        const api = getAPI(props.token);
        api.get(`/api/story/${storyId}/restart`)
        .then( res => {
            const { msg } = res.data
            if(msg == "done")
            {
                window.location.reload()              
                console.log("success")
            }
            else
                console.log("something went wrong")
        })
    }

    if(isLoading)
        return(<LoadingScreen/>);

    if(showTutoral)
        return(
            <div className="max-w-7xl shadow-lg p-6 mx-auto my-32 bg-white flex flex-col space-y-6">
                <Tutorial/>
                <div className="flex flex-row justify-end">
                    <button className="px-4 py-3 font-bold bg-blue-500 text-white rounded-md" onClick={e => setShowTutorial(false)}>
                        Start Story
                    </button>
                </div>
            </div>
        )

    if(status === "finished")
    {
        return(
            <div className="max-w-7xl p-6 border-green-500 border-2 mx-auto my-32 bg-white flex flex-col space-y-6">
                <h1 className="text-xl font-semibold">
                    {mainText}
                </h1>
                <div className="flex flex-row justify-end">
                    <button onClick={story_restart} className="px-4 py-3 font-bold bg-blue-500 text-white rounded-md">
                        Start Again ?
                    </button>
                </div>
            </div>
        )
    }

    if(status === "unfinished") {
        const choiceComponents = choices.map((choice, i ) => <Choice {...choice} key={i} onClickHandler={ setNextId } />)
        return(
            <div>
                <div className="max-w-7xl mx-auto my-32 bg-white flex flex-col space-y-10">
                    <div class='border-4 p-8 border-green-500 rounded-md'> 
                        {/* <div class='animate-widener-5 h-1 bg-green-400 rounded-md mb-8 mx-auto'></div> */}
                        <h1 className="text-lg text-center">
                            {mainText}
                        </h1>
                    </div>
                    <DelayedRender delay_for={converstaionLoadingTime} >
                        <div className="flex flex-row animate-fade-in space-x-6">
                            {choiceComponents}
                        </div>
                    </DelayedRender>
                </div>
            </div>                
        )

    }
}


export default Narrator;