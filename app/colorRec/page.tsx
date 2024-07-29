'use client'
import "./page.css"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {getCharacter} from "../utils/helper"
import Files from "../../components/bits/Files"
import Ranks from "../../components/bits/Ranks"
import Pieces from "../../components/Pieces/Pieces"
import Generate from "../utils/generate"
export default function Home() {
  const router = useRouter();
  const [square, setSquare] = useState("")
  const [showSolution, setshowSolution] = useState(false);
  const [color, setColor] = useState("")

  const updateBodyStyles = (styles) => {
    const body = document.querySelector('body');
    if (body) {
      Object.assign(body.style, styles);
  }
  }
  useEffect(() => {
    updateBodyStyles({
      display: 'grid',
      placeContent: 'center',
      height: 'auto',
      background: 'var(--bg-color)',
    });
  }, []);
  const getClassName = (i,j) => {
    let c = "tile"
    c += (i+j) % 2 === 0 ? " tile--dark" : " tile--light"
    return c
  }
  const ranks = Array.from({length:8},(x,i) => 8-i)
  const files = Array.from({length:8},(x,i) => getCharacter(i+1))

  const [showBoard, setShowBoard] = useState(false);

  const generate = async () => {
    
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const x = Math.floor(Math.random() * files.length)
    const y = Math.floor(Math.random() * ranks.length)
    const randomFile = files[x];
    const randomRank = ranks[y];
    //if both are odd or even, it is black 
    //if both differ, it is white
    if (((x+1) % 2 == 0 && (y+1) % 2 == 0) || ((x+1) % 2 != 0 && (y+1) % 2 != 0)){
      setColor("Dark")
    }
    else{
      setColor("Light")
    }
    setSquare(randomFile + randomRank)
    setshowSolution(false);
  }
  const handleSolution = (e) => {
    setshowSolution(e.target.checked)
  }
  const handleShowBoardChange = (e) => {
    setShowBoard(e.target.checked);

  };
  const goBack = () => {
    router.push("/")
}
  return <div>
    <div>
        <div style = {{textAlign:"center", marginTop:"30px", transform: "translateX(90px)"}}>
            <button style = {{padding: "15px 40px", fontSize:"40px", borderRadius:".4em", outline:"none", border:"none",backgroundColor:"#333",color:"white"}} onClick = {generate}> New Square </button>
            <button style = {{transform: "translateX(280px)", padding: "15px 40px", fontSize:"40px", borderRadius:".4em", outline:"none", border:"none",backgroundColor:"#333",color:"white"}} onClick = {goBack}> Back </button>

        </div>
        <div style= {{display: "flex", justifyContent:"center", color: "white"}}>
          {square != "" ? <h1> {square} </h1> : null}
        </div>
    </div>
          
  
    <div style = {{display: "flex", justifyContent: "center"}}>
      <label style = {{display: "flex", gap: "10px", marginRight: "20px"}}>
        <input type="checkbox" checked={showBoard} onChange={handleShowBoardChange}/>
        <h1 style= {{color: "white"}}> Show Board </h1>
      </label>
      <label style = {{display: "flex", gap: "10px"}}>
        <input type="checkbox" checked = {showSolution} onChange={handleSolution} />
        <h1 style= {{color: "white"} }> Show Solution </h1>
      </label>

    </div> 
    {showBoard && <div className="board">

          <Ranks ranks = {ranks}/>
          <div className='tiles'>
            {ranks.map((rank,i) => files.map((file,j) => 
            <div key={file + "-" + rank} className = {getClassName(9-i,j)}></div>
            ))}
          </div>



          <Files files = {files} />
    </div>}
    {showSolution == true ? <h1 style = {{color:"white", textAlign:"center"}}> {color} </h1>: null}
    </div>
}
