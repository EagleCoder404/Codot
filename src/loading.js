import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function Loading(props){
    return(
            <Loader
                type="Oval"
                color="#00BFFF"
                height={64}
                width={64}
            />
    )
}
export default Loading;