import { useEffect, useState } from "react"

export default function DelayedRender(props) {
    const [ ready, setReady ] = useState(false)
    const [ threadID , setThreadID ] = useState(null)

    
    useEffect( () => {
        const id = setTimeout(() => setReady(true), props.delay_for);
        setThreadID(id);
        return end
    }, [])

    function end() {
        clearTimeout(threadID);
        setReady(true)
    }

    if (ready)
        return(
            <>
                {props.children}
            </>    
        )

    return(
        <div class='flex flex-row justify-center'>
            <button class='px-4 py-3  border bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-500 hover:text-white transition-colors ease-in-out' onClick={end}>
                Say Something
            </button>
        </div>
    )

}