const Generate = async () => {
      const url = 'https://chess-puzzles.p.rapidapi.com/?themes=%5B%22mateIn2%22%5D&rating=1000&themesType=ONE&playerMoves=2&count=1';

      const options = {
          method: 'GET',
          headers: {
              'x-rapidapi-key': '2fa891e387mshc8e62118361177cp18a7ebjsn9f9b011a24e3',
              'x-rapidapi-host': 'chess-puzzles.p.rapidapi.com'
          },
      };

      try {
        const object = {
          puzzles: [
            {
              puzzleid: 'csRNO',
              fen: '2rk2nr/pp4Qp/4pp2/qB1p1b2/P2P4/1Pb5/2P1NPPP/R3K2R w KQ - 0 14',
              rating: 1636,
              ratingdeviation: 151,
              moves: [Array],
              themes: [Array]
            }
          ]
        }
        const moves = ["d3e4","f6e4","f5e7","f1f8"]
        const board = object.puzzles[0].fen
        // const response = await fetch(url, options);
        // const result = await response.json();
        // const board = result.puzzles[0].fen
        // const moves = result.puzzles[0].moves
   

        var index = 0
        var rowpos = 7
        
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
                    sidetomove = "White just played ";
                }
                else{
                    sidetomove = "Black just played";
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
                    white == 1 ? whiterook.push("Rook on " + letters2[letters[index]] + rowpos) : blackrook.push("Rook on " + letters2[letters[index]] + rowpos)
                }
                if (character.toUpperCase() == "N")
                  white == 1 ? whiteknight.push("Knight on " + letters2[letters[index]] + rowpos) : blackknight.push("Knight on " + letters2[letters[index]] + rowpos)
                if (character.toUpperCase() == "K")
                  white == 1 ? whiteKing.push("King on " + letters2[letters[index]] + rowpos) : blackKing.push("King on " + letters2[letters[index]] + rowpos)
                if (character.toUpperCase() == "P")
                  white == 1 ? whitepawn.push("Pawn on " + letters2[letters[index]] + rowpos) : blackpawn.push("Pawn on " + letters2[letters[index]] + rowpos)
                if (character.toUpperCase() == "B")
                  white == 1 ? whitebishop.push("Bishop on " + letters2[letters[index]] + rowpos) : blackbishop.push("Bishop on " + letters2[letters[index]] + rowpos)
                if (character.toUpperCase() == "Q")
                  white == 1 ? whiteQueen.push("Queen on " + letters2[letters[index]] + rowpos) : blackQueen.push("Queen on " + letters2[letters[index]] + rowpos)
                index += 1
                rowpos -= 1
            }
            else{
                index += Number(character)
            }
          }
          const see = [...whitepawn,...whitebishop,...whiteknight,...whiterook,...whiteQueen,...whiteKing]
          const see2 = [...blackpawn,...blackbishop,...blackknight,...blackrook,...blackQueen,...blackKing]
          return [see,see2,sidetomove,moves] 
      } catch (error) {
        console.error(error);
        return [[], [], "ERROR (probably ran out of requests...)",[]]
      }
    
      
}
export default Generate;
