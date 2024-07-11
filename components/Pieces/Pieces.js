import "./Pieces.css"
import Piece from "./Piece"
const Pieces = ({whitepieces, blackpieces}) => {
    const alphabet = "ABCDEFGH"
    
    const position = Array(8).fill("").map(x=>new Array(8).fill(""))
    for (let i =0; i < whitepieces.length; i++){
      const properties = whitepieces[i].split(" ")
      if (properties[0] == "Pawn"){
        position[alphabet.indexOf(properties[2][0])][Number(properties[2][1]) - 1] = "wp"
      }
      if (properties[0] == "King"){
        position[alphabet.indexOf(properties[2][0])][Number(properties[2][1]) - 1] = "wk"
      }
      if (properties[0] == "Bishop"){
        position[alphabet.indexOf(properties[2][0])][Number(properties[2][1]) - 1] = "wb"
      }
      if (properties[0] == "Knight"){
        position[alphabet.indexOf(properties[2][0])][Number(properties[2][1]) - 1] = "wn"
      }
      if (properties[0] == "Rook"){
        position[alphabet.indexOf(properties[2][0])][Number(properties[2][1]) - 1] = "wr"
      }
      if (properties[0] == "Queen"){
        position[alphabet.indexOf(properties[2][0])][Number(properties[2][1]) - 1] = "wq"
      }
    }
    for (let i =0; i < blackpieces.length; i++){
      const properties = blackpieces[i].split(" ")
      if (properties[0] == "Pawn"){
        position[alphabet.indexOf(properties[2][0])][Number(properties[2][1]) - 1] = "bp"
      }
      if (properties[0] == "King"){
        position[alphabet.indexOf(properties[2][0])][Number(properties[2][1]) - 1] = "bk"
      }
      if (properties[0] == "Bishop"){
        position[alphabet.indexOf(properties[2][0])][Number(properties[2][1]) - 1] = "bb"
      }
      if (properties[0] == "Knight"){
        position[alphabet.indexOf(properties[2][0])][Number(properties[2][1]) - 1] = "bn"
      }
      if (properties[0] == "Rook"){
        position[alphabet.indexOf(properties[2][0])][Number(properties[2][1]) - 1] = "br"
      }
      if (properties[0] == "Queen"){
        position[alphabet.indexOf(properties[2][0])][Number(properties[2][1]) - 1] = "bq"
      }
    }
  
    return <div className="pieces"> {position.map((r,rank) => r.map((f,file) => position[rank][file] ? 
      <Piece key = {rank+"-" + file} rank = {rank} file = {file} piece = {position[rank][file]} />
      : null))} </div> 
  }

  export default Pieces