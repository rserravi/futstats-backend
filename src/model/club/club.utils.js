const extractTeamFromClub = (teamId, club) => {
    const teams = club.teams;
    //console.log(teams);
    var foundTeam = null;

    for (let i = 0; i < teams.length; i++) {
        if (teams[i]._id.toString() === teamId){
            foundTeam = teams[i];
            //foundTeamIndex = i;
        }  
    }
    return foundTeam;
}

const findTeamIndexFromClub = (teamId, club) => {
    const teams = club.teams;
    //console.log(teams);
    var foundTeamIndex = null;
    
        for (let i = 0; i < teams.length; i++) {
        if (teams[i]._id.toString() === teamId){
            
            foundTeamIndex = i;
        }  
    }
    return foundTeamIndex;
}

const findTeamIndexOfPlayer = (playerId, club) =>{
    const teams = club.teams;
    var foundTeamIndex = null;
    for (let i = 0; i < teams.length; i++) {
        for (let playerIndex = 0; i< teams.players.length; playerIndex++){
            if (teams[i].players[playerIndex]._id.toString()=== playerId){
                foundTeamIndex = i;
            }
        }
    }
}

const findPlayerById = (playerId, club) =>{
    const teams = club.teams;
    var playerFound = null;
    for (let i = 0; i < teams.length; i++) {
        const players = teams[i].players;
        for (let playerIndex = 0; i< players.length; playerIndex++){    
            if (players[playerIndex]._id.toString()=== playerId){
                playerFound = players[playerIndex];
                break;
            }
        }
    }
    return playerFound;
}

module.exports = {extractTeamFromClub, findTeamIndexFromClub, findTeamIndexOfPlayer, findPlayerById}