'use client'
import { useEffect } from 'react';

import "./cs.css"

import {getCharacter} from "./utils/helper"

import { useRouter } from 'next/navigation';

export default function Home() {
  const updateBodyStyles = (styles) => {
    const body = document.querySelector('body');
    if (body) {
      Object.assign(body.style, styles);
  }
  }
  useEffect(() => {
    updateBodyStyles({
      display: 'block',
      placeContent: 'normal',
      height: 'auto',
      background: '#202020',
    });
  }, []);
  const router = useRouter();

  const relay = () => {
    router.push("/puzzle-view")
  }
  const relay2 = () => {
    router.push("/puzzle-view2")
  }
  const relay3 = () => {
    router.push("/settings")
  }
  const relayToColor =() => {
    router.push("/colorRec")
  }
  const relayToAttacking =() => {
    router.push("/attacking")
  }
  const relaytoabout = () => {
    router.push("/about")
  }
  
  return <div>
    <div style = {{justifyContent:"center", display:"flex", borderBottom:"2px solid #d0d0d0", paddingBottom: "10px"}}>
      <h1 style = {{transform: "translateX(-290px)", color: "white", textAlign:"center", fontFamily:"avenir"}}> Chess Vision Training</h1>
      <h1 style = {{transform: "translateX(50px)",color: "white", textAlign:"center"}}> <i> "Chess, first of all, is art" - Mikhail Tal  </i></h1>

      <button onClick = {relaytoabout} style = {{transform: "translateX(280px)", padding: "15px 40px", fontSize:"40px", borderRadius:".4em", outline:"none", border:"none",backgroundColor:"#333",color:"white"}}> FAQ </button>
      <button onClick = {relay3} style = {{transform: "translateX(300px)", padding: "15px 40px", fontSize:"40px", borderRadius:".4em", outline:"none", border:"none",backgroundColor:"#333",color:"white"}}> Settings </button>

    </div>
    <h1 style = {{color:"white", textAlign:"center", marginTop:"40px"}}> Beginner Exercises </h1>
    <div style={{ display:"flex",marginTop:"40px", justifyContent:"center", gap:"40px", borderBottom:"2px solid #d0d0d0", paddingBottom: "60px"}}>

      <button className = "mateButton" onClick = {relayToColor}> Color Recognition </button>
      <button className = "mateButton" onClick = {relayToAttacking}> Attacking Squares </button>
    </div>
    <h1 style = {{color:"white", textAlign:"center", marginTop:"40px"}}> Intermediate Exercises </h1>
    <div style={{ display:"flex",marginTop:"40px", justifyContent:"center", gap:"40px", borderBottom:"2px solid #d0d0d0", paddingBottom: "60px"}}>

      <button className = "mateButton" onClick = {relay2}> Winning Positions </button>
    </div>
    <h1 style = {{color:"white", textAlign:"center", marginTop:"40px"}}> Advanced Exercises </h1>
    <div style={{ display:"flex",marginTop:"40px", justifyContent:"center", gap:"40px", borderBottom:"2px solid #d0d0d0", paddingBottom: "60px"}}>
      <button className = "mateButton" onClick = {relay}> Checkmates </button>
    </div>
  
  </div>
}
