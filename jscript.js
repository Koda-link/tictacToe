function setGame(name1, name2, whoMark){
    let board = [
        [2, 3, 4], 
        [5, 6, 7], 
        [8, 9, 2]
    ];
    let players = [];
    function newPlayer(name){
        let mark = 2;
        let wins = 0;
        const won = () => {wins++;};
        const getWin = () => wins;
        return {name, mark, getWin, won}
    };

    const p1 = newPlayer(`${name1}`);
    const p2 = newPlayer(`${name2}`);
    players.push(p1);
    players.push(p2);

    whoMark === true ? (players[0].mark = 0, players[1].mark = 1) : (players[0].mark = 1, players[1].mark = 0);

    const turns = { t1: 2, t2: 2 };
    const firsTurn = () => {
        return Math.floor(Math.random() * 2) === 0 ? 
        (turns.t1 = players[0].mark, turns.t2 = players[1].mark) : (turns.t2 = players[0].mark, turns.t1 = players[1].mark);
    };
    firsTurn();

    const message = `${players[0].name} >> ${players[0].mark}  && ${players[1].name} >> ${players[1].mark}`;

    const geTurns = () => turns;
    const getBoard = () => board;
    const getPlayers = () => players;
    return {message, getBoard, geTurns, getPlayers};
};

function newGame(){

    let board = set.getBoard();

    players = set.getPlayers(); 

    let turns = set.geTurns();
    const {t1, t2} = turns;

    let turnCount = 0;
    let roundCount = 0;

    let yourTurn;
    // const geTount = () => turnCount;
    
    function resetRound(){
    turnCount = 0;
    board = [
        [2, 3, 4], 
        [5, 6, 7], 
        [8, 9, 2]
    ];
    roundCount++;
    return roundCount;
    };

    function marking(x, y){
        turnCount += 1;
        turnCount % 2 === 0 ? yourTurn = t2 : yourTurn = t1;
        board[x].splice(y, 1, yourTurn);
        if(turnCount >= 5){return check()};
        return {board, turnCount};
    };
    
    function check(){
        console.log(`checking`);
        for(let i = 0 ; i < 2; i++){
            if(board[i].every((e) => e === board[i][1])){
                return board[i][0] === players[0].mark ? players[0].won(): players[1].won(), resetRound();
            }
            else if(board[0][i] === board[1][i] && board[1][i] === board[2][i]){
               return board[0][i] === players[0].mark ? players[0].won() : players[1].won(), resetRound(); 
            }
        }if((board[1][1] == board[0][0] && board[1][1] == board[2][2]) || 
            (board[1][1] == board[0][2] && board[1][1] == board[2][0])){
                return board[1][1] === players[1].mark ? players[1].won() : players[0].won(), resetRound();
        }
        else if(turnCount == 9){return resetRound()}
        else{return {board, turnCount}}
    }
    return {marking, resetRound, board, players, turns};
    
    // let winArchive = [];
    // winArchive.push(players[0].symbol)
    // let racha = 3;
    // if(winArchive[winArchive.length - 1] === winArchive[winArchive.length - 2] && 
    //     winArchive[winArchive.length - 1] === winArchive[winArchive.length - 3]){
    //     winArchive[0] === players[0].symbol ? `Congrats ${players[0].name}! ${racha} a row`: `Congrats ${players[1].name}! ${racha} a row`;
    //     racha++;
    // }else if(winArchive[winArchive.length - 1] !== winArchive[winArchive.length - 2]){racha = 3;}

}
const set = setGame(`Ginni`, `Bo`, false);
const now = newGame(); 
// function resetGame(){

// }