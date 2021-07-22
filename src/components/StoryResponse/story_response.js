import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router";
import getAPI from "../api";

import LoadingScreen from "../loading_screen"
import XLSX from "xlsx";

function ChoiceTaken(props){
    return(
        <tr className='border border-red-700'>
            <td className='border border-red-700 text-center'>
                {props.prev_id}
            </td>
            <td className='border border-red-700'>
                {props.edge_text}
            </td>
            <td className='border border-red-700 text-center'>
                {props.next_id}
            </td>
            <td className='border border-red-700 text-center'>
                {props.timestamp}
            </td>
            <td className='border border-red-700 text-center'>
                {props.p1}
            </td>
            <td className='border border-red-700 text-center'>
                {props.p2}
            </td>
            <td className='border border-red-700 text-center'>
                {props.s1}
            </td>
            <td className='border border-red-700 text-center'>
                {props.s2}
            </td>
            <td className='border border-red-700 text-center'>
                {props.s3}
            </td>

        </tr>
    )
}
function Response(props) {
    const rowComponents  = props.choices_made.map( (d, i) => <ChoiceTaken {...d} key={i} />)
    return(
        <table className='table-fixed border border-red-700'>
        <thead>
            <tr>
                <th className='border border-red-700'>
                    Previous ID
                </th>
                <th className='border border-red-700'>
                    Replies
                </th>
                <th className='border border-red-700'>
                    Next ID
                </th>
                <th className='border border-red-700'>
                    Timestamp
                </th>
                <th className='border border-red-700 w-auto'>
                    P1
                </th>
                <th className='border border-red-700 w-auto'>
                    P2
                </th>
                <th className='border border-red-700'>
                    S1
                </th>
                <th className='border border-red-700'>
                    S2
                </th>
                <th className='border border-red-700'>
                    S3
                </th>
                
            </tr>
        </thead>
        <tbody>
            {rowComponents}
        </tbody>
    </table>
    )
}
function UserResponses(props){
    const user_id = props.user_id;
    const response_data = props.responses
    const username = props.username;
    
    const responseComponents  = response_data.map( (d, i) => <Response {...d} key={i} />)
    return(
        <div className='p-8 space-y-4 rounded-md shadow-md'>
            <h1 className='text-3xl text-red-700 font-semibold'>Username: {username}</h1>
            <div className='pl-8 flex flex-col space-y-3'>
                { responseComponents }
            </div>
        </div>
    )
}

function StoryResponse(props) {
    const [ userResponses, setUserResponses] = useState([]);
    const [ isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    useEffect( () => {
        const api = getAPI(props.token);
        api.get(`/api/story/${id}/response`)
        .then( res => {
            const data = res.data.data
            setUserResponses(data)
            setIsLoading(false)
        })
    }, [])
    
    function getExcelData(e) {
        const wb = XLSX.utils.book_new();
        const excel_data = []
        userResponses.forEach( ([user_id, user_data]) => {
            const {username, responses} = user_data;
            responses.forEach( ({timestamp, choices_made}, i) => {
                choices_made.forEach( choice => excel_data.push({'username':username, "attempt":(i+1), ...choice}))
            })
        }) 
        const ws = XLSX.utils.json_to_sheet(excel_data);
        XLSX.utils.book_append_sheet(wb, ws, "Data")
        XLSX.writeFile(wb, 'out.xlsx');
    }

    if(isLoading)
        return <LoadingScreen/>

    const userResponseComponents = userResponses.map( (data, index) => <UserResponses key={index} user_id={data[0]} username={data[1].username} responses={data[1].responses} />)
    return(
        <div className='max-w-full mt-8 space-y-8 mx-auto'>
            <h1 className='text-5xl p-3 border-b border-black font-bold text-center'>Form Responses</h1>
            <button className='px-3 py-2 bg-blue-500 text-white' onClick={getExcelData}>
                Export To Excel
            </button>
            {userResponseComponents}
        </div>
    );
    
}
// class StoryResponse extends Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             data:{},
//             loading:true
//         }
//         this.getExcelData = this.getExcelData.bind(this);
//     }
//     componentDidMount(){
//         const base64 = require("base-64");
//         const form_id = this.props.match.params.id;
//         const headers = new Headers();
//         headers.append("Authorization","Basic "+base64.encode(this.props.token+":boo"))
        
//         fetch(`/api/story/${form_id}/response`,{
//             methods:"GET",
//             headers:headers,       
//         })
//         .then( d => d.json())
//         .then(data => {
//             this.setState({
//                 data:data.data,
//                 loading:false
//             })
//         })
//     }
    // getExcelData(e){
    //     const wb = XLSX.utils.book_new();
    //     const excel_data = []
    //     this.state.data.forEach( ([user_id, user_data]) => {
    //         const {username, responses} = user_data;
    //         responses.forEach( response => excel_data.push({'username':username, ...response}))
    //     }) 
    //     const ws = XLSX.utils.json_to_sheet(excel_data);
    //     XLSX.utils.book_append_sheet(wb, ws, "Data")
    //     XLSX.writeFile(wb, 'out.xlsx');
    // }
//     render(){
//         if(this.state.loading)
//             return <LoadingScreen/>
//         const userResponseComponents = this.state.data.map( (data, index) => <UserResponse key={index} user_id={data[0]} username={data[1].username} responses={data[1].responses} />)
//         return(
//             <div className='max-w-full mt-8 space-y-8 mx-auto'>
//                 <h1 className='text-5xl p-3 border-b border-black font-bold text-center'>Form Responses</h1>
//                 <button className='px-3 py-2 bg-blue-500 text-white' onClick={this.getExcelData}>
//                     Export To Excel
//                 </button>
//                 {userResponseComponents}
//             </div>
//         );
//     }
// }

export default StoryResponse