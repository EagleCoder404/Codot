import getAPI from "../api"
import {useState, useEffect} from "react"
import { Link } from "react-router-dom"
import LoadingScreen from "../loading_screen"
function UserFeedback(props) {
    return(
        <div className="p-4 rounded-md shadow-md">
            <p className="text-xl pb-4 text-blue-500 font-semibold"> {props.text} </p>

            <div className="flex text-gray-500 flex-row space-x-3">
                <h1 className=""> {props.name} </h1>
                <h2> {props.email} </h2>
            </div>
            
        </div>
    )
}
export default function Feedback(props) {
    const [userFeedbacks, setUserFeedbacks] = useState([])

    useEffect(() => {
        const api = getAPI(props.token)
        // api.defaults.headers.common['Content-Type'] = "application/json";
        api.get("/api/feedbacks")
        .then( (d) => {
            setUserFeedbacks(d.data.data)
        })
        .catch( d => console.log(d))
    }, [])

    const userFeedbackComponents = userFeedbacks.map( d => <UserFeedback key={d.id} name={d.name} email={d.email} text={d.text} />)
    return(
        <div>
            <div className="p-4">
                <Link className="px-5 py-3 rounded-md text-white font-bold bg-blue-500" to="/corner">
                    Go Back
                </Link>
            </div>
            <div className="static max-w-4xl mx-auto pt-6">
                <h1 className="text-5xl text-center pb-8 font-bold">
                    User Feedback
                </h1>
                <div className="static flex flex-col space-y-12">
                    { userFeedbackComponents.length !== 0 ? userFeedbackComponents : <LoadingScreen/>}
                </div>
            </div>
        </div>
    )
}