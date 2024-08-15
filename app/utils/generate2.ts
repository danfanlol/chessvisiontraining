
const Generate = async () => {
    const list = ["r4rk1/p1pp1ppp/bpP5/4Pp2/8/5R1P/PBP3N1/3R2K1 b - - 0 21","r2qk2r/2p2ppp/ppp5/2b1P3/5Pn1/2P5/PPQ3PP/RNB2R1K b kq - 4 14","r4rk1/2p2ppp/ppQ5/4q3/5B2/2P3n1/PP4PP/RN3RK1 b - - 2 16"]
    try {
      const response = await fetch("/positions.txt");
      const text = await response.text();
      const lines = text.split('\n');
      const random = Math.floor(Math.random() * (lines.length-1 + 1));
      const board = lines[random]
      var index = 0
      var rowpos = 7
      const response2 = await fetch("/moves.txt");
      const text2 = await response2.text();
      const lines2 = text2.split('\n');
      console.log(lines2)
      const moves = [lines2[random]]
      var whitepawn = []
      var whiteknight = []
      var whiteQueen = []
      var whiteKing = []
      var whitebishop = []
      var whiterook = []
      var blackpawn = []
      var blackknight = []
      var blackQueen = []
      var blackKing = []
      var blackbishop = []
      var blackrook = []
      var sidetomove;
      for (let i = 0; i < board.length; i++) {
          const character = board.charAt(i)
          const letters = "01234567"
          const letters2 = "ABCDEFGH"
          if (character == " "){
              if (board.charAt(i+1) == "w"){
                  sidetomove = "White to Play ";
              }
              else{
                  sidetomove = "Black to Play";
              }
              break;
          }
          if (character == "/"){
                  index = 0
                  rowpos -= 1
          }
          else if (character.match(/[a-z]/i)){
              var white = "0"
              if (character == character.toUpperCase()){
                white = "1"
              }
              rowpos += 1
              if (character.toUpperCase() == "R"){
                  white == "1" ? whiterook.push("Rook on " + letters2[letters[index]] + rowpos) : blackrook.push("Rook on " + letters2[letters[index]] + rowpos)
              }
              if (character.toUpperCase() == "N")
                white == "1" ? whiteknight.push("Knight on " + letters2[letters[index]] + rowpos) : blackknight.push("Knight on " + letters2[letters[index]] + rowpos)
              if (character.toUpperCase() == "K")
                white == "1" ? whiteKing.push("King on " + letters2[letters[index]] + rowpos) : blackKing.push("King on " + letters2[letters[index]] + rowpos)
              if (character.toUpperCase() == "P")
                white == "1" ? whitepawn.push("Pawn on " + letters2[letters[index]] + rowpos) : blackpawn.push("Pawn on " + letters2[letters[index]] + rowpos)
              if (character.toUpperCase() == "B")
                white == "1" ? whitebishop.push("Bishop on " + letters2[letters[index]] + rowpos) : blackbishop.push("Bishop on " + letters2[letters[index]] + rowpos)
              if (character.toUpperCase() == "Q")
                white == "1" ? whiteQueen.push("Queen on " + letters2[letters[index]] + rowpos) : blackQueen.push("Queen on " + letters2[letters[index]] + rowpos)
              index += 1
              rowpos -= 1
          }
          else{
              index += Number(character)
          }
        }
        const see : string[] = [...whitepawn,...whitebishop,...whiteknight,...whiterook,...whiteQueen,...whiteKing]
        const see2 = [...blackpawn,...blackbishop,...blackknight,...blackrook,...blackQueen,...blackKing]
        return [see,see2,sidetomove,moves] 
    } catch (error) {
      console.error(error);
      return [[], [], "ERROR (probably ran out of requests...)",[]]
    }
  
    
}
export default Generate;




