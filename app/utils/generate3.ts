const Generate = async () => {
    const files = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const x = Math.floor(Math.random() * files.length)
    const y = Math.floor(Math.random() * ranks.length)

    
    const randomFile = files[x];
    const randomRank = ranks[y];

    const pieces = ['r','b','k']
    

    const z = Math.floor(Math.random() * pieces.length)


    const randomPiece = pieces[z]
    var white = []

    if (randomPiece == "r"){
        white.push("Rook on " + randomFile + randomRank)
    }

    if (randomPiece == "b"){
        white.push("Bishop on " + randomFile + randomRank)
    }
    if (randomPiece == "k"){
        white.push("Knight on " + randomFile + randomRank)
    }
    const moves = []
    if (randomPiece == "r"){
        
        const direction = [[-1,0],[1,0],[0,-1],[0,1]]
        direction.forEach(dir => {
            const subset = []
            for (let i = 1; i < 8; i++){
                const a = x+1 +  (i*dir[0])
                const b = y + 1+ (i*dir[1])
                if (a > 8 || a < 1 || b > 8 || b < 1){
                    break;
                }
                if (a != x+ 1 || b != y+ 1){
                    subset.push([a,b])
                }

    
            }
            moves.push(subset);
            console.log(subset.length)
        })
    }
    if (randomPiece == "b"){
        
        const direction = [[-1,1],[1,1],[1,-1],[-1,-1]]
        direction.forEach(dir => {
            const subset = []
            for (let i = 1; i < 8; i++){
                const a = x+1 +  (i*dir[0])
                const b = y + 1+ (i*dir[1])
                if (a > 8 || a < 1 || b > 8 || b < 1){
                    break;
                }
                if (a != x+ 1 || b != y+ 1){
                    subset.push([a,b])
                }
    
            }
            moves.push(subset)

        })
    }
    if (randomPiece == "k"){
        const direction = [[2,1],[1,2]]
        let subset = []
        direction.forEach(dir => {
            

            const a = x+1 +  (dir[0])
            const b = y + 1+ (dir[1])

            if (a <=8 && a >= 1 && b <= 8 && b >= 1){
                subset.push([a,b])
            }
        })
        moves.push(subset)
        subset = []
        direction.forEach(dir => {

            const a = x+1 +  (-dir[0])
            const b = y + 1+ (dir[1])

            if (a <=8 && a >= 1 && b <= 8 && b >= 1){
                subset.push([a,b])
            }
        })
        moves.push(subset)
        subset = []

        direction.forEach(dir => {

            const a = x+1 +  (dir[0])
            const b = y + 1+ (-dir[1])

            if (a <=8 && a >= 1 && b <= 8 && b >= 1){
                subset.push([a,b])
            }
        })
        moves.push(subset)
        subset = []

        direction.forEach(dir => {

            const a = x+1 +  (-dir[0])
            const b = y + 1+ (-dir[1])

            if (a <=8 && a >= 1 && b <= 8 && b >= 1){
                subset.push([a,b])
            }
        })
        moves.push(subset)



    }

    const s = [[...white], [...moves]]

    return s;
  
    
}
export default Generate;



