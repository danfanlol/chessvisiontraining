'use client'

import { useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {

    const router = useRouter();

    const [theme, setTheme] = useState("")
    useEffect(() => {

        const savedTheme = localStorage.getItem('ToggleColorsPreference');
        if (savedTheme){
            setTheme(savedTheme)
        }
    }, [])
    const toggle = () => {
        const newTheme = theme === 'Board' ? 'Individual' : 'Board';
        setTheme(newTheme);
        localStorage.setItem('ToggleColorsPreference', newTheme);
    }
    const goBack = () => {
        router.push("/")
    }
    return (
        <div>
            <div style={{justifyContent:'center', display:'flex', transform: "translateX(60px)"}}>
                <h1 style = {{color:"white", fontSize:"40px"}}> Settings </h1>
                <button style = {{transform: "translateX(400px)", padding: "15px 40px", fontSize:"40px", borderRadius:".4em", outline:"none", border:"none",backgroundColor:"#333",color:"white"}} onClick = {goBack}> Back </button>

            </div>
            <div style = {{display:"flex", justifyContent:"center"}}>
                <label style = {{display: "flex", gap: "10px", marginRight: "20px"}}>
                <input onChange = {toggle} type="checkbox" checked={theme === "Individual"}/>
                <h1 style= {{color: "white"} }> Allow White and Block Toggles </h1>
                </label>
            </div>
        </div>
    )
}