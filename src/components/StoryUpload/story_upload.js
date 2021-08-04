import React, { Component, useState } from "react";
import { Link } from "react-router-dom"
import getAPI from "../api"
function StoryUpload(props) {

    const [storyName, setStoryName] = useState("");
    const storyFileInputRef = React.createRef()

    function submitHandler(e) {
        e.preventDefault();
        const formData = new FormData();
        const story_name = storyName
        const story_file = storyFileInputRef.current.files[0]

        const api = getAPI(props.setToken)
        api.defaults.headers.common['Content-Type'] = "multipart/form-data";
        formData.append("story_name", story_name)
        formData.append("story_file", story_file)
        api.post("/story/parse", formData)
            .then(e => alert("Uploaded"))
            .catch(e => console.log(e))
    }

    return (
        <div className='max-w-3xl mx-auto'>
            <div className="pb-32 pt-8 "> 
                <Link className="px-5 py-3 bg-blue-500 text-white font-bold rounded-md" to="/corner">
                    Go Back
                </Link>
            </div>

            <form className="flex flex-col space-y-6" onSubmit={submitHandler}>

                <div>
                    <label className='font-semibold  text-xl block mb-2'>
                        Step 1 : Enter Story Name
                    </label>
                    <input type='text' className="px-5 py-3   w-full border-2  focus:border-blue-500 focus:outline-none ease-in  transition rounded-md" value={storyName} onChange={(e) => setStoryName(e.target.value)} required/>
                </div>

                <div className="p-0.5 border bg-blue-500"></div>

                <div class="flex flex-col space-y-4">
                    <h1 className=' font-bold text-justify'>
                        If you want to see the format 
                    </h1>
                    <p>
                        Here's an  <a href="https://docs.google.com/spreadsheets/d/1a9xmTWvrfbJHFiURQzlDMlXBYJjNeqNPGZCV3oiyzpI/edit?usp=sharing" target="_blank" className="text-blue-500 hover:underline font-semibold"> Example Story Data File</a> you can compare this with your data file and make sure, they're of the same format, pay close attention to the <span className="text-yellow-500 font-semibold">yellow highlighted </span>   cells in the example file.
                    </p>
                    <h2 className="font-semibold">
                        If you want to read the format
                    </h2>
                    <ul className="space-y-4 list-decimal pl-3">
                        <li>
                            First Sheet should have the script, and the second sheet should have the number mappings
                        </li>
                        <li>
                            Script Sheet
                            <ul className="pl-10 space-y-2 list-disc">
                                <li>
                                    The first column in the last empty row should have ### in it
                                </li>
                                <li>
                                    "If 0" Should have the initial conversation, or the first conversation. 
                                </li>
                                <li>
                                    Make Sure there's a space between "If" and a number example: "If 1" , "If 2", "When 2", "When 23".
                                </li>
                                <li>
                                    If first column has a cell like "If23" or "When25" it would cause errors
                                </li>
                            </ul>
                        </li>
                        <li>
                            Number Mapping Sheet
                            <ul className="pl-10 space-y-2 list-disc">
                                <li>
                                    it should have a row from initial conversation to the next two converstaions, i.e. | 0 | 1 | 2 | 
                                    check out the example story data file for clearer information
                                </li>
                                <li>
                                    Make sure there are no empty rows in between mappings, cause it stops processing when it reaches the first empty row in number mapping
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <div className="p-0.5 border bg-blue-500"></div>

                <div>
                    <label className='font-semibold  text-xl block mb-2'>
                        Step 2 : Upload Story Data File
                    </label>
                    <input type='file' ref={storyFileInputRef}  required/>
                </div>

                <div>
                    <button className='px-4 py-2 bg-blue-500 text-white font-bold rounded-md'>
                        Submit
                    </button>
                </div>

            </form>

        </div>
    )
}

export default StoryUpload;