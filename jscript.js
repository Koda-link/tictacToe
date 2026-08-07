function setGame(p1, p2, sym){
    let board = [
        [2, 3, 4], 
        [5, 6, 7], 
        [8, 9, 2]
    ];
    let players = [
        {
            name: ``,
            symbol: 2,
            wins: 0
        }, {
            name: ``,
            symbol: 2,
            wins: 0
        }
    ]

    players[0].name = p1;
    players[1].name = p2;
    sym === true ? (players[0].symbol = 0, players[1].symbol = 1) : (players[0].symbol = 1, players[1].symbol = 0);
    
    const getBoard = () => board;
    const message = `${players[0].name} >> ${players[0].symbol} && ${players[1].name} >> ${players[1].symbol}`;
    return {message, getBoard};
}

function newGame(){
    let roundCount = 0;
    let turnCount = 1;
    let sym1;
    let sym2;
    
    const firsTurn = () => {
        return Math.floor(Math.random() * 2) === 0 ? 
        (sym1 = players[0].symbol, sym2 = players[1].symbol) : (sym2 = players[0].symbol, sym1 = players[1].symbol);
    };
    
    function tach(x, y, symTurn){
        turnCount % 2 === 0 ? symTurn = sym2 : symTurn = sym1;
        board[x].splice(y, 1, symTurn);
        turnCount++;
    }

    function resetRound(){
    turnCount = 1;
    board = [
        [2, 3, 4], 
        [5, 6, 7], 
        [8, 9, 2]
    ];
    roundCount++;
    }

    function check(board){
        for(let i = 0 ; i > 2; i++){
            if(board => board.every( i => i === board[i][0] )){
                board[i][0] === players[0].symbol ? players[0].wins++ : players[1].wins++;
                resetRound();
            }
            else if(board[0][i] === board[1][i] && board[1][i] === board[2][i]){
               board[0][i] === players[0].symbol ? players[0].wins++ : players[1].wins++;
               resetRound()
            }

        }if((board[1][1] == board[0][0] && board[1][1] == board[2][2]) || 
            (board[1][1] == board[0][2] && board[1][1] == board[2][0])){
                board[1][1] === players[1].symbol ? players[1].wins++ : players[0].wins++;
                resetRound();
            } 
    }if(turncount >= 5){check()}
    else if(turncount >= 9){resetRound()}
    
    let winArchive = [];
    winArchive.push(players[0].symbol)
    let racha = 3;
    if(winArchive[winArchive.length - 1] === winArchive[winArchive.length - 2] && 
        winArchive[winArchive.length - 1] === winArchive[winArchive.length - 3]){
        winArchive[0] === players[0].symbol ? `Congrats ${players[0].name}! ${racha} a row`: `Congrats ${players[1].name}! ${racha} a row`;
        racha++;
    }else if(winArchive[winArchive.length - 1] !== winArchive[winArchive.length - 2]){racha = 3;}

}
function resetGame(){
    board = [
        [2, 3, 4], 
        [5, 6, 7], 
        [8, 9, 2]
    ];
    players = [
        {
            name: ``,
            symbol: 2,
            wins: 0
        }, {
            name: ``,
            symbol: 2,
            wins: 0
        }
    ]
    players[0].name = p1;
    players[1].name = p2;
    sym === true ? (players[0].symbol = 0, players[1].symbol = 1) : (players[0].symbol = 1, players[1].symbol = 0);

}