import React, { Component, useState } from "react";
import getAPI from "../api"
function StoryUpload(props) {

    const [storyName, setStoryName] = useState("");
    const storyFileInputRef = React.createRef()

    function submitHandler(e) {
        e.preventDefault();
        const formData = new FormData();
        const story_name = storyName
        const story_file = storyFileInputRef.current.files[0]
        const api = getAPI(props.token)
        formData.append("story_name", story_name)
        formData.append("story_file", story_file)
        api.post("/story/parse", formData)
            .then(e => alert("Uploaded"))
            .catch(e => console.log(e))
    }

    return (
        <div className='max-w-3xl mx-auto p-6 mt-6'>
            <form className="flex flex-col space-y-6" onSubmit={submitHandler}>

                <div>
                    <label className='font-semibold  text-md block mb-2'>
                        Story Name
                    </label>
                    <input type='text' className="px-5 py-3   w-full border-2  focus:border-blue-500 focus:outline-none ease-in  transition rounded-md" value={storyName} onChange={(e) => setStoryName(e.target.value)} />
                </div>

                <div>
                    <label className='font-semibold  text-md block mb-2'>
                        Story Data File
                    </label>
                    <br />
                    <input type='file' ref={storyFileInputRef} />
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