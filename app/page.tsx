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
  return <div>
    <div style={{transform: "translateX(160px)", display:"flex",marginTop:"40px", justifyContent:"center", gap:"40px"}}>
      <button className = "mateButton" onClick = {relay}> Mate in 2 </button>
      <button className = "mateButton" onClick = {relay2}> Winning Positions </button>
      <button onClick = {relay3} style = {{transform: "translateX(180px)", padding: "15px 40px", fontSize:"40px", borderRadius:".4em", outline:"none", border:"none",backgroundColor:"#333",color:"white"}}> Settings </button>
    </div>
  </div>
}
