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
  return <div>
    <div style={{display:"flex",marginTop:"40px", justifyContent:"center", gap:"40px"}}>
      <button className = "mateButton" onClick = {relay}> Mate in 2 </button>
      <button className = "mateButton" onClick = {relay2}> Winning Positions </button>
    </div>
  </div>
}
