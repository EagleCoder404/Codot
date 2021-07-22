import tutorial_image from "./tutorial.png"

export default function Tutorial(props){
    return(
        <div>
            <h1 className="text-5xl font-bold text-center">
                Tutorial
            </h1>
            <img src={tutorial_image} />
        </div>
    )
}