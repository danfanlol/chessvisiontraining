'use client'
import { useRouter } from 'next/navigation';



export default function Home() {
    const router = useRouter();

    const goBack = () => {
        router.push("/")
    }
    return <div>
        
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <h1 style={{ transform: "translateX(100px)", fontSize: "40px", color: "white" }}>FAQ</h1>
            <button style={{ transform: "translateX(480px)", padding: "15px 40px", fontSize: "40px", borderRadius: ".4em", outline: "none", border: "none", backgroundColor: "#333", color: "white" }} onClick={goBack}>
                Back
            </button>
        </div>
        <div style = {{ textAlign:"left", paddingLeft: "40px"}}>
            <h2> <i style = {{color:"white" }} >Who is this intended for? </i> </h2>
            <h3 style = {{color: "#e0e0e0", maxWidth: "1900px"}}> This website is primarily intended for experienced chess players who are ready to hone their blindfold chess skills to further improve their play. 

            </h3>
            <br/>
            <h2> <i style = {{color:"white" }} > Can I still use this website if I am new to chess? </i> </h2>
            <h3 style = {{color: "#e0e0e0", maxWidth: "1900px"}}> The beginner exercises are very useful for teaching chess notation and the rules of the game. All exercises come with the board along with the solution.

            </h3>
            <br/>
            <h2> <i style = {{color:"white" }} > What about the intermediate and advanced exercises? </i> </h2>
            <h3 style = {{color: "#e0e0e0", maxWidth: "1800px"}}> In both the intermediate and advanced modes, you will be given positions to model internally. In the intermediate mode, you must find the most winning move for the side to play. In the advanced mode, one side will blunder resulting in a checkmating sequence you must find.
            </h3 >
            <br/> 
            <h2> <i style = {{color:"white" }} > What are the settings? </i> </h2>
            <h3 style = {{color: "#e0e0e0", maxWidth: "1800px"}}> In the settings page, you have the option to choose whether you want to see all the pieces at once, or if you would like to see a certain side instead.
            </h3 >

        </div>

    </div>
}