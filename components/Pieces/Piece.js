import "./Piece.css"

const Piece = ({rank,file,piece}) => {
    return <div className={`piece ${piece} p-${rank}${file}`}> </div>
}
export default Piece