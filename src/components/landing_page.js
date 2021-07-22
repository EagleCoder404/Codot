import logo from "../logo.png";
import {Link} from "react-router-dom";
function Dot(){
    return(
    <div className="text-xl text-yellow-dark">
        •
    </div>)
}

function NavLink(props){
    const state_style = props.active ? "text-black font-bold" : "text-purple";
    return (
    <div className={`${state_style} p-2`}>
        <span className="">
            {props.link_name}
        </span>
    </div>
    )
}

function GameBox(props){
    const story_link = props.story_id !== "#" ? "/narrator/"+props.story_id : "#"
    const color = props.color ? props.color : "bg-red-400";
    return(
        <Link class={`flex flex-col text-center justify-between p-2 rounded-3xl w-64 h-64 break-words ${color} hover:scale-110 transform transition-transform ease-in-out`} to={story_link}>
            <h2 className="text-white font-bold text-xl"> {props.tags} </h2>
            <h1 className="text-4xl font-bold font-inter text-white"> {props.title} </h1>
            <h2 className="font-bold"> Play Now </h2>
        </Link>
    )
}

function IDontKnow(props){
    return(
        <div class="flex flex-col space-y-5 text-gray-800">
            <div>
                <div class={`w-14 h-14 rounded-full bg-${props.color}`}>

                </div>
            </div>
            <div>
                <h1 className="font-extrabold text-lg mb-3">
                    {props.title}
                </h1>
                <p>
                    {props.content}
                </p>
            </div>
            <div>
                <button class={` p-4 font-bold text-sm rounded-2xl border-gray-400 border text-${props.color}`}>
                    What Users Say
                </button>
            </div>
        </div>
    )
}

function FeatureList(props) {
    const listItemCompoenents = props.features.map( (content, index) => <ListItem content={content} key={index} color={props.color} />)
    return(
        <div className="flex-1 flex flex-col justify-between px-3 py-8 space-y-8 text-gray-800 rounded-xl hover:shadow-lg hover:scale-110 transform transition-transform ease-in-out">
            <div className="flex flex-col space-y-8">
                <h1 className="text-4xl font-bold font-inter">
                    {props.title}
                </h1>
                {listItemCompoenents}
            </div>
            <button className="px-8 py-4 border border-gray-400 rounded-2xl text-purple font-bold">
                Send Your Suggestions
            </button>
        </div>
    )
}
function ListItem(props) {
    const color = props.color ? props.color : "gray-300";
    return(
    <div className="flex flex-row space-x-3">
        <div className="">
            <svg width="32" height="32" viewBox="0 0 32 32" className={`fill-current text-${color}`} fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="16"  />
                <path d="M20.96 13L14.8 19.16L12 16.36" stroke="#2D3436" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <div className="pt-1">
            {props.content}
        </div>
    </div>)
}
export default function LandingPage(){
    return(
    <>
    <div class='font-inter'>
        <div class="p-3 flex flex-row space-x-24 shadow-lg justify-center bg-white">
            <div>
                <img src={logo}  class='w-32'/>
            </div>
            <nav class="flex flex-row space-x-6 items-center ">
                <NavLink link_name="Home" active/>
                <Dot/>
                <NavLink link_name="Stories"/>
                <Dot/>
                <NavLink link_name="About Codot"/>
                <Dot/>
                <NavLink link_name="What Users Say"/>
            </nav>
            <div class='flex flex-row space-x-3 items-center'>
                <Link className='px-8 py-3 bg-black font-bold text-white rounded-full font-inter text-lg' to="/login">
                        Sign In
                </Link>
                <Link className='px-8 py-3 bg-purple font-bold text-white rounded-full font-inter text-lg' to="/register">
                    Register
                </Link>
            </div>
        </div>
        <div className="z-20 relative">
            <div className="max-w-7xl px-11 mx-auto  border-l border-r  border-white flex-col space-y-16 z-20 relative">

                    <div className=" text-center py-16 leading-10 text-md">
                            "It was surprising how I could be a part of the stories on CoDot, getting to decide <br/>
                            how the story will proceed by making my own decisions. And what blew my mind was that I have met friends <br/>
                            based on my experiences in the stories, wiating for the new features!" <br/>
                        <span className="text-xl font-extralight">
                            - Ashim Khushboo, Software Engineer at Dell EMC
                        </span>
                    </div>


                    <div className="flex flex-col space-y-16">
                        <h1 class="text-center text-6xl font-inter font-extrabold text-gray-800">
                            Stories: Entertain, Engage, Meet, Grow
                        </h1>
                        <div className="flex flex-row  justify-between space-x-8">
                            <div className="bg-fuschia flex flex-col font-bold text-gray-800 justify-between rounded-xl p-4">
                                <h2 className="text-center"> We Will Be</h2>
                                <h2 className="text-center"> Evolving from readable <br/> content to</h2>
                                <h2 className="text-center"> audible and watchable </h2>
                            </div>
                            <div className=" grid grid-cols-3 gap-10">
                                    <GameBox tags="Intellectual. Impactful." title="Under The Stars" color="bg-codot-green" story_id="41"/>
                                    <GameBox tags="Adventure. Provoking." title="The Tripling Ride" color="bg-purple-light"/>
                                    <GameBox tags="Mystery. Thriller." title="Murder in Rain" color="bg-codot-blue" />
                                    <GameBox tags="Adventure. Shero." title="She-olo Traveler" color="bg-pink"/>
                                    <GameBox tags="Fun. Feel Good." title="College Clubs" color="bg-orange"/>
                                    <Link className="flex flex-col text-center justify-center p-2 rounded-3xl w-64 h-64 break-words bg-purple" to="/corner">
                                        <button class="px-6 py-3 max-w-max mx-auto text-2xl bg-white rounded-full font-bold text-purple">
                                            View All
                                        </button>
                                    </Link>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-5 text-gray-800 pt-16">
                        <h1 className="font-bold text-xl ">
                            CoDot - Adventure in Your Pocket
                        </h1>
                        <p className="leading-10">
                        On CoDot you don’t just read/listen/watch a story but interact with it.<br/>
                        Yes, your decisions lead you to a unqiue plot. <br/>
                        Basically, in our Stories you are the ‘Harry Potter’, ‘Arjuna’, ‘Sansa Stark’, ‘Sherlock’, ‘Aladin’, ‘Napoleon’! <br/>
                        And as per your interactions with the Stories, you get to meet new people - mentors, friends, lovers, whosoever you seek! <br/>
                        </p>
                    </div>

                    <div class='flex flex-row justify-between text-justify space-x-16  place-content-stretch'>
                        <IDontKnow title="Entertain" content="You discover the best of Stories: Readable/ Audible/ Watchable on CoDot handpicked from the choicest" color="pink" />
                        <IDontKnow title="Engage" content="You receive choices in a story and the story proceeds as you decide, not just entertainment but an experience" color="codot-blue" />
                        <IDontKnow title="Meet" content="Based on your experiences in the stories and preferences, you meet people who complement you naturally" color="purple" />
                        <IDontKnow title="Grow" content="Overall, with CoDot you grow: your Perspective, your Intelligence, your ability to take decisions " color="codot-green" />
                    </div>

                    <div className="pt-32 flex flex-col space-y-16">
                        <h1 className="text-center font-extrabold text-6xl font-inter text-gray-800"> Upcoming Features </h1>
                        <h2 className="text-center font-extrabold text-2xl font-inter text-gray-400">We are{" "}
                          <span className="relative">
                            <span className="text-purple-dark z-20 relative ">
                            building a better
                            </span>
                            <div className="h-2.5 w-28 rounded bg-yellow-dark  right-0 bottom-0 z-0 absolute"></div>
                          </span>
                          {" "}version everyday
                        </h2>
                        <div className="flex flex-row justify-evenly  space-x-32">
                            <FeatureList title="Stories" features={["Animated Live Action", "Collaborated Content with branded stories like your favorite movies and TV series"]}/>
                            <FeatureList title="AI Introductions" features={["Get introduced to people who are interesting to you, can make you grow, potential best friends, lovers - whosoever you want", "Receive icebreakers", "No matching as per your DP but an AI Superconnector who seeks what you seek"]} color="yellow-dark"/>
                            <FeatureList title="Rewards" features={["Meet with Achievers and Stars", "Get introduced to nearby users", "Submit Your Own Stories"]} color="codot-green-light"/>
                        </div>
                    </div>
                    <div className="pt-32 flex flex-col space-y-16">
                        <h1 className="text-center font-extrabold text-6xl font-inter text-gray-800"> What Users Say</h1>
                        <div className="text-center flex flex-col space-y-8 text-gray-800">
                            <h1 className=" text-lg">
                                "I have grown as a person with all the stories and interactions on CoDot!"
                            </h1>
                            <h2 className="text-xl">
                                - Gurukiran, Software Engineer at DXC Technology
                            </h2>

                            <h1 className=" text-lg">
                                "I made great friends on my Himalayan trek. Maybe because of the similar vibes and intensity, it is a similarexperience on CoDot."
                            </h1>
                            <h2 className="text-xl">
                            - Debrati
                            </h2>
                        </div>
                    </div>
                    <div className="pt-64 text-sm text-gray-500">
                        <div className='flex-row  flex justify-between space-x-6 '>
                            <div>
                                <div>
                                    <p className="pb-3 text-gray-400 font-semibold tracking-widest">
                                        FOLLOWS US
                                    </p>
                                    <div className="flex flex-row space-x-4">
                                        <a href="#">
                                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="40" height="40" rx="20" fill="#FFEAA7"/>
                                            <path d="M25 10H22C20.6739 10 19.4021 10.5268 18.4645 11.4645C17.5268 12.4021 17 13.6739 17 15V18H14V22H17V30H21V22H24L25 18H21V15C21 14.7348 21.1054 14.4804 21.2929 14.2929C21.4804 14.1054 21.7348 14 22 14H25V10Z" stroke="#6C5CE7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </a>
                                        <a href="#">
                                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M24 16C25.5913 16 27.1174 16.6321 28.2426 17.7574C29.3679 18.8826 30 20.4087 30 22V29H26V22C26 21.4696 25.7893 20.9609 25.4142 20.5858C25.0391 20.2107 24.5304 20 24 20C23.4696 20 22.9609 20.2107 22.5858 20.5858C22.2107 20.9609 22 21.4696 22 22V29H18V22C18 20.4087 18.6321 18.8826 19.7574 17.7574C20.8826 16.6321 22.4087 16 24 16V16Z" stroke="#6C5CE7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M14 17H10V29H14V17Z" stroke="#6C5CE7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="#6C5CE7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                                <div className="pt-7">
                                    <p className="pb-3 text-gray-400 font-semibold tracking-widest">
                                        INFORMATION
                                    </p>
                                    <div className="grid grid-cols-3 gap-14 gap-y-8  text-gray-700 text-md">
                                        <a>
                                            About Fapster App
                                        </a>
                                        <a>
                                            Onhovered / Active
                                        </a>
                                        <a>
                                            We are Hiring !
                                        </a>
                                        <a>
                                            Get in Touch
                                        </a>
                                        <a>
                                            Privacy Policy
                                        </a>
                                        <a>
                                            Reources
                                        </a>
                                        <a>
                                            Things We Like
                                        </a>
                                        <a>
                                            Terms of Service
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className="pb-3 text-gray-400 font-semibold tracking-widest">
                                        FOLLOWS US
                                    </p>
                                    <p className="text-3xl font-bold text-purple">
                                        instagram ID
                                    </p>
                                </div>
                                <div className="pt-7 flex flex-col space-y-3">
                                    <p className=" text-gray-400 font-semibold tracking-widest">
                                        KEEP IN TOUCH
                                    </p>
                                    <div className="flex flex-row space-x-4">
                                        <input type='text' className="px-4 py-2 rounded-lg bg-gray-200 text-black" placeholder='Your Name' value="Your Name"/>
                                        <input type='text' className="px-4 py-2 rounded-lg bg-gray-200 text-black" placeholder='Your Name' value="E-Mail"/>
                                    </div>
                                    <div className="flex flex-row space-x-4">
                                        <textarea value="Leave Your Message Here" className="px-4 py-2 rounded-lg bg-gray-200 text-purple">

                                        </textarea>
                                        <button className="px-16 py-3 font-bold text-white bg-purple rounded-lg text-3xl">
                                            Send
                                        </button>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="overflow-hidden pt-32">
                            <Wave/>
                        </div>
                    </div>

            </div>

        <OrangeBlock/>
        </div>


    </div>
    </>
    )
}

function OrangeBlock(){
    return(
        <svg className="absolute top-0 right-0 z-0" width="842" height="794" viewBox="0 0 842 794" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="251" width="1376.03" height="767.907" rx="99" transform="rotate(-45 0 251)" fill="#FFEAA7"/>
            <g clip-path="url(#clip0)">
            <path d="M795.704 273.661C799.397 273.661 802.391 270.668 802.391 266.975C802.391 263.282 799.397 260.288 795.704 260.288C792.011 260.288 789.018 263.282 789.018 266.975C789.018 270.668 792.011 273.661 795.704 273.661Z" fill="#FDCB6E"/>
            <path d="M817.992 251.373C821.685 251.373 824.679 248.379 824.679 244.686C824.679 240.994 821.685 238 817.992 238C814.299 238 811.306 240.994 811.306 244.686C811.306 248.379 814.299 251.373 817.992 251.373Z" fill="#FDCB6E"/>
            <path d="M840.281 273.661C843.973 273.661 846.967 270.668 846.967 266.975C846.967 263.282 843.973 260.288 840.281 260.288C836.588 260.288 833.594 263.282 833.594 266.975C833.594 270.668 836.588 273.661 840.281 273.661Z" fill="#FDCB6E"/>
            <path d="M751.128 318.238C754.82 318.238 757.814 315.244 757.814 311.551C757.814 307.858 754.82 304.865 751.128 304.865C747.435 304.865 744.441 307.858 744.441 311.551C744.441 315.244 747.435 318.238 751.128 318.238Z" fill="#FDCB6E"/>
            <path d="M773.416 295.949C777.109 295.949 780.102 292.956 780.102 289.263C780.102 285.57 777.109 282.576 773.416 282.576C769.723 282.576 766.729 285.57 766.729 289.263C766.729 292.956 769.723 295.949 773.416 295.949Z" fill="#FDCB6E"/>
            <path d="M795.704 318.238C799.397 318.238 802.391 315.244 802.391 311.551C802.391 307.858 799.397 304.865 795.704 304.865C792.011 304.865 789.018 307.858 789.018 311.551C789.018 315.244 792.011 318.238 795.704 318.238Z" fill="#FDCB6E"/>
            <path d="M817.992 295.949C821.685 295.949 824.679 292.956 824.679 289.263C824.679 285.57 821.685 282.576 817.992 282.576C814.299 282.576 811.306 285.57 811.306 289.263C811.306 292.956 814.299 295.949 817.992 295.949Z" fill="#FDCB6E"/>
            <path d="M840.281 318.238C843.973 318.238 846.967 315.244 846.967 311.551C846.967 307.858 843.973 304.865 840.281 304.865C836.588 304.865 833.594 307.858 833.594 311.551C833.594 315.244 836.588 318.238 840.281 318.238Z" fill="#FDCB6E"/>
            <path d="M706.551 362.814C710.244 362.814 713.238 359.82 713.238 356.128C713.238 352.435 710.244 349.441 706.551 349.441C702.858 349.441 699.865 352.435 699.865 356.128C699.865 359.82 702.858 362.814 706.551 362.814Z" fill="#FDCB6E"/>
            <path d="M728.839 340.526C732.532 340.526 735.526 337.532 735.526 333.839C735.526 330.147 732.532 327.153 728.839 327.153C725.147 327.153 722.153 330.147 722.153 333.839C722.153 337.532 725.147 340.526 728.839 340.526Z" fill="#FDCB6E"/>
            <path d="M751.128 362.814C754.82 362.814 757.814 359.82 757.814 356.128C757.814 352.435 754.82 349.441 751.128 349.441C747.435 349.441 744.441 352.435 744.441 356.128C744.441 359.82 747.435 362.814 751.128 362.814Z" fill="#FDCB6E"/>
            <path d="M773.416 340.526C777.109 340.526 780.102 337.532 780.102 333.839C780.102 330.147 777.109 327.153 773.416 327.153C769.723 327.153 766.729 330.147 766.729 333.839C766.729 337.532 769.723 340.526 773.416 340.526Z" fill="#FDCB6E"/>
            <path d="M795.704 362.814C799.397 362.814 802.391 359.82 802.391 356.128C802.391 352.435 799.397 349.441 795.704 349.441C792.011 349.441 789.018 352.435 789.018 356.128C789.018 359.82 792.011 362.814 795.704 362.814Z" fill="#FDCB6E"/>
            <path d="M817.992 340.526C821.685 340.526 824.679 337.532 824.679 333.839C824.679 330.147 821.685 327.153 817.992 327.153C814.299 327.153 811.306 330.147 811.306 333.839C811.306 337.532 814.299 340.526 817.992 340.526Z" fill="#FDCB6E"/>
            <path d="M840.281 362.814C843.973 362.814 846.967 359.82 846.967 356.128C846.967 352.435 843.973 349.441 840.281 349.441C836.588 349.441 833.594 352.435 833.594 356.128C833.594 359.82 836.588 362.814 840.281 362.814Z" fill="#FDCB6E"/>
            <path d="M728.839 385.102C732.532 385.102 735.526 382.109 735.526 378.416C735.526 374.723 732.532 371.729 728.839 371.729C725.147 371.729 722.153 374.723 722.153 378.416C722.153 382.109 725.147 385.102 728.839 385.102Z" fill="#FDCB6E"/>
            <path d="M751.128 407.391C754.82 407.391 757.814 404.397 757.814 400.704C757.814 397.011 754.82 394.018 751.128 394.018C747.435 394.018 744.441 397.011 744.441 400.704C744.441 404.397 747.435 407.391 751.128 407.391Z" fill="#FDCB6E"/>
            <path d="M773.416 385.102C777.109 385.102 780.102 382.109 780.102 378.416C780.102 374.723 777.109 371.729 773.416 371.729C769.723 371.729 766.729 374.723 766.729 378.416C766.729 382.109 769.723 385.102 773.416 385.102Z" fill="#FDCB6E"/>
            <path d="M795.704 407.391C799.397 407.391 802.391 404.397 802.391 400.704C802.391 397.011 799.397 394.018 795.704 394.018C792.011 394.018 789.018 397.011 789.018 400.704C789.018 404.397 792.011 407.391 795.704 407.391Z" fill="#FDCB6E"/>
            <path d="M817.992 385.102C821.685 385.102 824.679 382.109 824.679 378.416C824.679 374.723 821.685 371.729 817.992 371.729C814.299 371.729 811.306 374.723 811.306 378.416C811.306 382.109 814.299 385.102 817.992 385.102Z" fill="#FDCB6E"/>
            <path d="M840.281 407.391C843.973 407.391 846.967 404.397 846.967 400.704C846.967 397.011 843.973 394.018 840.281 394.018C836.588 394.018 833.594 397.011 833.594 400.704C833.594 404.397 836.588 407.391 840.281 407.391Z" fill="#FDCB6E"/>
            <path d="M773.416 429.679C777.109 429.679 780.102 426.685 780.102 422.992C780.102 419.299 777.109 416.306 773.416 416.306C769.723 416.306 766.729 419.299 766.729 422.992C766.729 426.685 769.723 429.679 773.416 429.679Z" fill="#FDCB6E"/>
            <path d="M795.704 451.967C799.397 451.967 802.391 448.973 802.391 445.281C802.391 441.588 799.397 438.594 795.704 438.594C792.011 438.594 789.018 441.588 789.018 445.281C789.018 448.973 792.011 451.967 795.704 451.967Z" fill="#FDCB6E"/>
            <path d="M817.992 429.679C821.685 429.679 824.679 426.685 824.679 422.992C824.679 419.299 821.685 416.306 817.992 416.306C814.299 416.306 811.306 419.299 811.306 422.992C811.306 426.685 814.299 429.679 817.992 429.679Z" fill="#FDCB6E"/>
            <path d="M840.281 451.967C843.973 451.967 846.967 448.973 846.967 445.281C846.967 441.588 843.973 438.594 840.281 438.594C836.588 438.594 833.594 441.588 833.594 445.281C833.594 448.973 836.588 451.967 840.281 451.967Z" fill="#FDCB6E"/>
            <path d="M817.992 474.255C821.685 474.255 824.679 471.262 824.679 467.569C824.679 463.876 821.685 460.882 817.992 460.882C814.299 460.882 811.306 463.876 811.306 467.569C811.306 471.262 814.299 474.255 817.992 474.255Z" fill="#FDCB6E"/>
            <path d="M840.281 496.543C843.973 496.543 846.967 493.55 846.967 489.857C846.967 486.164 843.973 483.171 840.281 483.171C836.588 483.171 833.594 486.164 833.594 489.857C833.594 493.55 836.588 496.543 840.281 496.543Z" fill="#FDCB6E"/>
            </g>
            <defs>
            <clipPath id="clip0">
            <rect width="209" height="285" fill="white" transform="translate(633 238)"/>
            </clipPath>
            </defs>
        </svg>
    )
}

function Wave(){
    return(
        <svg width="1440" height="102" viewBox="0 0 1440 102" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-0.333822 543.58L-0.583526 17.1366C-0.583526 17.1366 102.172 49.726 220.913 17.2075C339.654 -15.311 399.901 2.67057 565.331 59.0554C730.762 115.44 808.875 7.45977 1046 50.0384C1283.12 92.6171 1251.81 -46.9066 1439.77 17.611C1439.81 95.8883 1440.01 483.507 1440.04 544.056C1295.17 544.008 -0.333822 543.58 -0.333822 543.58Z" fill="#FFEAA7"/>
        </svg>
    )
}
