import Loading from "../loading"

export default function LoadingScreen(props) {
    return(
        <div className="absolute flex w-screen h-screen">
            <div className='m-auto'>
                <Loading/>
            </div>
        </div>
    )
}