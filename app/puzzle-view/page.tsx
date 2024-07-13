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
  const [theme, setTheme] = useState("")


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
    updateBodyStyles({
      display: 'grid',
      placeContent: 'center',
      height: 'auto',
      background: 'var(--bg-color)',
    });
    if (savedTheme == "Individual"){
      var r = document.documentElement;
      r.style.setProperty('--xfactor', '87.5%');
      r.style.setProperty('--yfactor', '103.3%');
      r.style.setProperty('--backgroundSize', '90%');
      r.style.setProperty("--left", "1")
      r.style.setProperty("--bottom", ".2")
      r.style.setProperty("--width", "13%")
      r.style.setProperty("--height", "12%")
    }
    if (savedTheme == "Board"){
      var r = document.documentElement;
      r.style.setProperty('--xfactor', '100%');
      r.style.setProperty('--yfactor', '100%');
      r.style.setProperty('--backgroundSize', '100%');
      r.style.setProperty("--left", ".25")
      r.style.setProperty("--bottom", ".25")
      r.style.setProperty("--width", "12.5%")
      r.style.setProperty("--height", "12.5%")
      
    }
  }, []);
  const getClassName = (i,j) => {
    let c = "tile"
    c += (i+j) % 2 === 0 ? " tile--dark" : " tile--light"
    return c
  }
  const ranks = Array.from({length:8},(x,i) => 8-i)
  const files = Array.from({length:8},(x,i) => getCharacter(i+1))
  const [whiteMoves, setWhiteMoves] = useState([])
  const [blackMoves,setBlackMoves] = useState([])
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
  const handleShowBoardChange = (e) => {
    setShowBoard(e.target.checked);
    if (!e.target.checked) {
        setShowWhitePieces(false); // Ensure pieces checkbox is also unchecked if board checkbox is unchecked
        setShowBlackPieces(false);    }
  };
  const handleSolution = (e) => {
    setshowSolution(e.target.checked)
  }
  const goBack = () => {
    router.push("/")
}
  return <div>
    <div>
        <div style = {{textAlign:"center", marginTop:"30px", transform: "translateX(90px)"}}>
            <button style = {{padding: "15px 40px", fontSize:"40px", borderRadius:".4em", outline:"none", border:"none",backgroundColor:"#333",color:"white"}} onClick = {generate}> Generate New Puzzle </button>
            <button style = {{transform: "translateX(280px)", padding: "15px 40px", fontSize:"40px", borderRadius:".4em", outline:"none", border:"none",backgroundColor:"#333",color:"white"}} onClick = {goBack}> Back </button>

        </div>
        <div style= {{display: "flex", justifyContent:"center", gap: "300px", color: "white"}}>
          <div>
            {whiteMoves.length != 0 ? <h1 style = {{textAlign:"center"}}> White </h1> : null}
            {whiteMoves.map((piece) => <h2 style = {{textAlign:"center"}}> {piece} </h2> )}
          </div>
          <div>
            {whiteMoves.length != 0 ? <h1 style = {{textAlign:"center"}}> Black </h1> : null}
            {blackMoves.map((piece) => <h2 style = {{textAlign:"center"}}> {piece} </h2> )}
          </div>
        </div>
        <div>
        {moves[0] ? <h1 className = "ASD" style = {{textAlign: "center", color: "white"} }> {sidetoplay + "  " + moves[0]} </h1> : null}
        </div>
    </div>
          
  
    <div style = {{display: "flex", justifyContent: "center"}}>
      <label style = {{display: "flex", gap: "10px", marginRight: "20px"}}>
        <input type="checkbox" checked={showBoard} onChange={handleShowBoardChange}/>
        <h1 style= {{color: "white"}}> Show Board </h1>
      </label>
      {theme === "Individual" && showBoard && (
                  <label style={{ display: 'flex', gap: '20px', marginRight: "20px"}}>
                      <input
                          type="checkbox"
                          checked={showWhitePieces}
                          onChange={() => setShowWhitePieces(!showWhitePieces)}
                      />
                      <h1 style={{ color: 'white' }}>Show White</h1>
                  </label>
        )}
        {theme === "Individual" && showBoard && (
                  <label style={{ display: 'flex', gap: '20px', marginRight: "20px"}}>
                      <input
                          type="checkbox"
                          checked={showBlackPieces}
                          onChange={() => setShowBlackPieces(!showBlackPieces)}
                      />
                      <h1 style={{ color: 'white' }}>Show Black</h1>
                  </label>
        )}
        {theme === "Board" && showBoard && (
          <label style={{ display: 'flex', gap: '20px', marginRight: "20px"}}>
            <input
                type="checkbox"
                checked={showPieces}
                onChange={() => setShowPieces(!showPieces)}
            />
            <h1 style={{ color: 'white' }}>Show Pieces</h1>
          </label>
        )}
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

          {showWhitePieces && <Pieces whitepieces = {whiteMoves} blackpieces = {[]} />}
          {showBlackPieces && <Pieces whitepieces = {[]} blackpieces = {blackMoves} />}
          {showPieces && <Pieces whitepieces = {whiteMoves} blackpieces = {blackMoves} />}


          <Files files = {files} />
    </div>}
    {showSolution && <div style ={{marginTop: "35px"}}> 
      <h1 style = {{color:'white', textAlign:'center', fontSize:"38px"}}> Solution: </h1>
      {moves.map((x, i) => 
        i != 0 ? <h1 style={{color:'white', textAlign:"center"}}> {x} </h1> : null
      )}
      </div>}
    </div>
}
