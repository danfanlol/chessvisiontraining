'use client'
import "./page.css"
import { useRouter } from 'next/navigation';

import {getCharacter} from "../utils/helper"

import Files from "../../components/bits/Files"
import Ranks from "../../components/bits/Ranks"
import Pieces from "../../components/Pieces/Pieces"
import Generate from "../utils/generate3"

import { useEffect, useState} from 'react';
export default function Home() {

    const [position, setPosition] = useState(Array.from({ length: 8 }, () => Array(8).fill(0)));


    const router = useRouter();

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
      var r = document.documentElement;
      r.style.setProperty('--xfactor', '100%');
      r.style.setProperty('--yfactor', '100%');
      r.style.setProperty('--backgroundSize', '100%');
      r.style.setProperty("--left", ".25")
      r.style.setProperty("--bottom", ".25")
      r.style.setProperty("--width", "12.5%")
      r.style.setProperty("--height", "12.5%")

    }, []);
    const getClassName = (i,j) => {
      let c = "tile"
      c += (i+j) % 2 === 0 ? " tile--dark" : " tile--light"
      if (position[j][i - 2] === 1 && showPieces) {
        c += " attacking active";
      } else if (position[j][i - 2] === 1) {
        c += " attacking";
      }
      return c
    }
    const ranks = Array.from({length:8},(x,i) => 8-i)
    const files = Array.from({length:8},(x,i) => getCharacter(i+1))
    const [whiteMoves, setWhiteMoves] = useState([])
  
    
  
    const [showBoard, setShowBoard] = useState(false);
    const [showPieces, setShowPieces] = useState(false);
    const [showSolution,setShowSolution] = useState(false);
    const [possible,setpossiblemoves] = useState([])



    const generate = () => {
      
      const res = Generate()
      setWhiteMoves(res[0])
      const newPosition = Array.from({ length: 8 }, () => Array(8).fill(0));

      const possiblemoves = res[1] //will be a 2-day array
      const possiblemoves2 = possiblemoves.flat(1);

      let possibles = [] //converted version
      const alphabet = "abcdefgh"
      possiblemoves2.map((coordinate) => {
        // console.log(coordinate)
        newPosition[coordinate[0]-1][coordinate[1]-1] = 1
        possibles.push(alphabet[coordinate[0]-1] + coordinate[1])
      })
      setpossiblemoves(possiblemoves);
      setPosition(newPosition);
      
        
    }
    const goBack = () => {
        router.push("/")
    }
    const handleShowBoardChange = (e) => {
      setShowBoard(e.target.checked);
    };

    return <div>
      <div>
          <div style = {{textAlign:"center", marginTop:"30px", transform: "translateX(90px)"}}>
                <button style = {{ padding: "15px 40px", fontSize:"40px", borderRadius:".4em", outline:"none", border:"none",backgroundColor:"#333",color:"white"}} onClick = {generate}> Generate New Piece </button>
                <button style = {{transform: "translateX(280px)", padding: "15px 40px", fontSize:"40px", borderRadius:".4em", outline:"none", border:"none",backgroundColor:"#333",color:"white"}} onClick = {goBack}> Back </button>
                
          </div>
            <div style= {{display: "flex", justifyContent:"center", color: "white"}}>
                {whiteMoves.length != 0 ? <h1>  {whiteMoves[0]} </h1> : null}
            </div>
      </div>
    

            
    
      <div style = {{display: "flex", justifyContent: "center"}}>
        <label style = {{display: "flex", gap: "10px", marginRight: "20px"}}>
          <input type="checkbox" checked={showBoard} onChange={handleShowBoardChange}/>
          <h1 style= {{color: "white"}}> Show Board </h1>
        </label>

        {showBoard && <label style={{ display: 'flex', gap: '20px', marginRight: "20px"}}>
            <input
                type="checkbox"
                checked={showPieces}
                onChange={() => setShowPieces(!showPieces)}
            />
            <h1 style={{ color: 'white' }}>Show Piece</h1>
          </label>}
          <label style={{ display: 'flex', gap: '20px', marginRight: "20px"}}>
            <input
                type="checkbox"
                checked={showSolution}
                onChange={() => setShowSolution(!showSolution)}
            />
            <h1 style={{ color: 'white' }}>Show Solution</h1>
          </label>
          
      </div> 
      {showBoard && <div className="board">
  
            <Ranks ranks = {ranks}/>
            <div className='tiles'>
              {ranks.map((rank,i) => files.map((file,j) => 
              <div key={file + "-" + rank} className = {getClassName(9-i,j)}></div>
              ))}
            </div>
  
            {showPieces && <Pieces whitepieces = {whiteMoves} blackpieces = {[]} />}
            <Files files = {files} />
      </div>}
      {showSolution && <div style ={{marginTop: "35px"}}> 
        <h1 style = {{color:'white', textAlign:'center', fontSize:"38px"}}> Solution: </h1>
        <div style = {{display: "flex", justifyContent: "center" ,gap: "100px", color: "white"}}> 
          {possible[0].length != 0 && <div> {possible[0].map((item) => <h1> {"abcdefgh"[item[0]-1] + "" + item[1]} </h1>)} </div>}
          {possible[1].length != 0 && <div> {possible[1].map((item) => <h1> {"abcdefgh"[item[0]-1] + "" + item[1]} </h1>)} </div>}
          {possible[2].length != 0 && <div> {possible[2].map((item) => <h1> {"abcdefgh"[item[0]-1] + "" + item[1]} </h1>)} </div>}
          {possible[3].length != 0 && <div> {possible[3].map((item) => <h1> {"abcdefgh"[item[0]-1] + "" + item[1]} </h1>)} </div>}
        </div>

        </div>}
      </div>
  }
  