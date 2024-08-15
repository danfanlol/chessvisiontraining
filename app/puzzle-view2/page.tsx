
'use client'
import "./page.css"
import { useRouter } from 'next/navigation';

import {getCharacter} from "../utils/helper"

import Files from "../../components/bits/Files"
import Ranks from "../../components/bits/Ranks"
import Pieces from "../../components/Pieces/Pieces"
import Generate from "../utils/generate2"

import { useEffect, useState} from 'react';
export default function Home() {
    const [theme, setTheme] = useState("")

    const router = useRouter();

    const updateBodyStyles = (styles) => {
      const body = document.querySelector('body');
      if (body) {
        Object.assign(body.style, styles);
      }
    }

    useEffect(() => {
      const savedTheme = localStorage.getItem('ToggleColorsPreference');
      if (savedTheme){
          setTheme(savedTheme)
      }
      else{ //new user 
        setTheme("Board")
      }
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
    const [whiteMoves, setWhiteMoves] = useState<string[]>([])
    const [blackMoves,setBlackMoves] = useState<string[]>([])
    const [moves,setMoves] = useState([])
  
    const [sidetoplay, setSidetoPlay] = useState("")
    
  
    const [showBoard, setShowBoard] = useState(false);
    const [showWhitePieces, setShowWhitePieces] = useState(false);
    const [showBlackPieces, setShowBlackPieces] = useState(false);
    const [showPieces, setShowPieces] = useState(false);

    const [showSolution, setshowSolution] = useState(false);
  
    const generate = async () => {
      
      const res = await Generate()
      setWhiteMoves(res[0])
      setBlackMoves(res[1])
      setSidetoPlay(res[2])
      setMoves(res[3])
  
    }
    const goBack = () => {
        router.push("/")
    }
    const handleShowBoardChange = (e) => {
      setShowBoard(e.target.checked);
      if (!e.target.checked) {
          setShowWhitePieces(false); // Ensure pieces checkbox is also unchecked if board checkbox is unchecked
          setShowBlackPieces(false);
      }
    };
    const handleSolution = (e) => {
      setshowSolution(e.target.checked)
    }
    return <div>
      <div>
          <div style = {{textAlign:"center", marginTop:"30px", transform: "translateX(90px)"}}>
                <button style = {{ padding: "15px 40px", fontSize:"40px", borderRadius:".4em", outline:"none", border:"none",backgroundColor:"#333",color:"white"}} onClick = {generate}> Generate New Puzzle </button>
                <button style = {{transform: "translateX(280px)", padding: "15px 40px", fontSize:"40px", borderRadius:".4em", outline:"none", border:"none",backgroundColor:"#333",color:"white"}} onClick = {goBack}> Back </button>

          </div>
          <div style= {{display: "flex", justifyContent:"center", gap: "300px", color: "white"}}>
            <div>
              {whiteMoves.length != 0 ? <h1 style = {{textAlign:"center"}}> White </h1> : null}
              {whiteMoves.map((piece, index) => <h2 key = {index} style = {{textAlign:"center"}}> {piece} </h2> )}
            </div>
            <div>
              {whiteMoves.length != 0 ? <h1 style = {{textAlign:"center"}}> Black </h1> : null}
              {blackMoves.map((piece, index) => <h2 key = {index} style = {{textAlign:"center"}}> {piece} </h2> )}
            </div>
          </div>
          <div>
          {sidetoplay != "" ? <h1 className = "ASD" style = {{textAlign: "center", color: "white"} }> {sidetoplay} </h1> : null}
          </div>
      </div>
            
    
      <div style = {{display: "flex", justifyContent: "center"}}>
        <label style = {{display: "flex", gap: "20px", marginRight: "20px"}}>
          <input type="checkbox" checked={showBoard} onChange={handleShowBoardChange}/>
          <h1 style= {{color: "white"}}> Board </h1>
        </label>
        {theme === "Individual" && showBoard && (
                  <label style={{ display: 'flex', gap: '20px', marginRight: "20px"}}>
                      <input
                          type="checkbox"
                          checked={showWhitePieces}
                          onChange={() => setShowWhitePieces(!showWhitePieces)}
                      />
                      <h1 style={{ color: 'white' }}>White</h1>
                  </label>
        )}
        {theme === "Individual" && showBoard && (
                  <label style={{ display: 'flex', gap: '20px', marginRight: "20px"}}>
                      <input
                          type="checkbox"
                          checked={showBlackPieces}
                          onChange={() => setShowBlackPieces(!showBlackPieces)}
                      />
                      <h1 style={{ color: 'white' }}>Black</h1>
                  </label>
        )}
        {theme === "Board" && showBoard && (
          <label style={{ display: 'flex', gap: '20px', marginRight: "20px"}}>
            <input
                type="checkbox"
                checked={showPieces}
                onChange={() => setShowPieces(!showPieces)}
            />
            <h1 style={{ color: 'white' }}>Pieces</h1>
          </label>
        )}
        <label style = {{display: "flex", gap: "10px"}}>
          <input type="checkbox" checked = {showSolution} onChange={handleSolution} />
          <h1 style= {{color: "white"} }> Solution </h1>
        </label>
      </div> 
      {showBoard && <div className="board">
  
            <Ranks ranks = {ranks}/>
            <div className='tiles'>
              {ranks.map((rank,i) => files.map((file,j) => 
              <div key={file + "-" + rank} className = {getClassName(9-i,j)}></div>
              ))}
            </div>
  
            {showWhitePieces && <Pieces whitepieces = {whiteMoves} blackpieces = {[]} />}
            {showBlackPieces && <Pieces whitepieces = {[]} blackpieces = {blackMoves} />}
            {showPieces && <Pieces whitepieces = {whiteMoves} blackpieces = {blackMoves} />}
            <Files files = {files} />
      </div>}
      {showSolution && <div style ={{marginTop: "35px"}}> 
        <h1 style = {{color:'white', textAlign:'center', fontSize:"38px"}}> Solution: </h1>
        {moves.map((x, i) => 
          <h1 key = {i} style={{color:'white', textAlign:"center"}}> {x} </h1>
        )}
        </div>}
      </div>
  }
  
