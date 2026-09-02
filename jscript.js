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
        const won = () => {wins++; };
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
    let players = set.getPlayers(); 
    let turns = set.geTurns();
    const {t1, t2} = turns;

    let turnCount = 0;
    let roundCount = 0;
    let yourTurn;
    
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
            return board[i][0] === players[0].mark ? (players[0].won(), congrats(players[0].mark)) : (players[1].won(), congrats(players[1].mark)), 
                resetRound();
            }
            else if(board[0][i] === board[1][i] && board[1][i] === board[2][i]){
            return board[0][i] === players[0].mark ? (players[0].won(), congrats(players[0].mark)) : (players[1].won(), congrats(players[1].mark)), 
               resetRound(); 
            }
        }if((board[1][1] == board[0][0] && board[1][1] == board[2][2]) || 
            (board[1][1] == board[0][2] && board[1][1] == board[2][0])){
            return board[1][1] === players[1].mark ? (players[1].won(), congrats(players[1].mark)) : (players[0].won(), congrats(players[0].mark)), 
                resetRound();
        }
        else if(turnCount == 9){return congrats(2), resetRound()}
        else{return {board, turnCount}}
    }

    let streak = 2;
    let winArchive = [];
    function congrats(winner){
        winArchive.push(winner);
        if(winArchive[winArchive.length - 1] === winArchive[winArchive.length - 2] && 
        winArchive[winArchive.length - 1] === winArchive[winArchive.length - 3]){
        streak++;
        return winArchive[winArchive.length - 1] === 2 ? console.log(`All ${streak} rounds are ties!`)  : 
        winArchive[winArchive.length - 1] === players[0].mark ?
        console.log(`Congrats ${players[0].name}! ${streak} in  a row`): console.log(`Congrats ${players[1].name}! ${streak} in a row`);
        }
        else if(roundCount < 3){return console.log(`Go on`);}
        else if(winArchive[winArchive.length - 1] !== winArchive[winArchive.length - 2]){streak = 2; console.log(`Streakbreak`);}
    }
    let getArchive = () =>  winArchive;
    let getSteak = () =>  streak;
    return {marking, resetRound, board, players, turns, getArchive, getSteak};
}
let set = setGame(`Ginni`, `Bo`, false);
let now = newGame(); 

function resetGame(){
    set = setGame(`Jojo`, `Vee`, true);
    now = newGame(); 
}