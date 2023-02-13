const { getUserbyId } = require("../user/user.model.js");
const {ClubScheme} = require("./club.scheme.js");
const {findTeamIndexFromClub, extractTeamFromClub, findPlayerById} = require("./club.utils")
const mainDataBaseName = process.env.MAIN_DATABASE_NAME;

/////////////////////
//                 //
//   CLUB CRUD     //
//                 //
/////////////////////

const insertClub = clubObj => { 
    return new Promise(async (resolve, reject)=>{ 
 
        const dbConnection = await global.clientConnection
        const db = await dbConnection.useDb(mainDataBaseName)
        const Club = await db.model("club",ClubScheme)
 
        Club(clubObj)
        .save()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
 };

const getClubbyId = clubId =>{
    return new Promise(async (resolve,reject)=>{

        const dbConnection = await global.clientConnection
        const db = await dbConnection.useDb(mainDataBaseName)
        const Club = await db.model("club",ClubScheme)

        if((!clubId)) return false;
        try{
            Club.findOne({"_id": clubId}, (error, data)=>{
            if(error){
                reject(error);
            }
            resolve(data);
            }
        ).clone();
        } catch (error) {
            reject(error);
        }
    });
}

/////////////////////
//                 //
//   TEAM CRUD     //
//                 //
/////////////////////

const insertTeam = (_id, team) =>{
    return new Promise(async (resolve, reject)=>{
        const dbConnection = await global.clientConnection
        const db = await dbConnection.useDb(mainDataBaseName)
        const Club = await db.model("club",ClubScheme)

        foundClub = await Club.findOne({"_id": _id}, (error, data)=>{
            if(error){
                reject(error);
            }
                const teams =  data.teams;
                teams.push(team);
                try {
                    Club.findOneAndUpdate(
                        {_id},
                        {$set:{"teams": teams}},
                        {new: true}, (error, data) =>{
                            if(error){
                                reject(error);
                            }
                            resolve(data);
                        }
                    ).clone();
                } catch (error) {
                    reject(error);
                }
            }
        )
    })
}

const getTeambyId = (_id)=>{
    return new Promise(async (resolve,reject)=>{

        const dbConnection = await global.clientConnection
        const db = await dbConnection.useDb(mainDataBaseName)
        const Club = await db.model("club",ClubScheme)

        if((!_id)) return false;
        try{
            Club.findOne({"teams._id": _id}, (error, data)=>{
            if(error){
                reject(error);
            }
            const teamIndex = findTeamIndexFromClub(_id, data);
            resolve(data.teams[teamIndex]);
            }
        ).clone();
        } catch (error) {
            reject(error);
        }
    });
}

const deleteTeambyId = (_id)=>{
    return new Promise(async (resolve,reject)=>{

        const dbConnection = await global.clientConnection
        const db = await dbConnection.useDb(mainDataBaseName)
        const Club = await db.model("club",ClubScheme)

        if((!_id)) return false;
        try{
            Club.findOne({"teams._id": _id}, (error, data)=>{
            if(error){
                reject(error);
            }
            const teamIndex = findTeamIndexFromClub(_id, data);
            const teams = data.teams;
            teams.splice(teamIndex, 1);
            const clubId = data._id;
            try {
                Club.findOneAndUpdate(
                    {clubId},
                    {$set:{"teams": teams}},
                    {new: true}, (error, data) =>{
                        if(error){
                            reject(error);
                        }
                        resolve(data);
                    }
                ).clone();
            } catch (error) {
                reject(error);
            }
            }
        ).clone();
        } catch (error) {
            reject(error);
        }
    });
}
 
/////////////////////
//                 //
//   PLAYER CRUD   //
//                 //
/////////////////////

const insertPlayer = (teamId, player) =>{
    return new Promise(async (resolve, reject)=>{
        const dbConnection = await global.clientConnection
        const db = await dbConnection.useDb(mainDataBaseName)
        const Club = await db.model("club",ClubScheme)
        console.log(teamId);

        Club.findOne({"teams._id": teamId}, async (error,data)=>{
            if(error){
                reject(error);
            }
                const teams = data.teams;
                console.log(teams);
                const clubId = data._id;
                var foundTeamIndex = findTeamIndexFromClub(teamId, data);
                var foundTeam = extractTeamFromClub(teamId, data)

                if (foundTeamIndex === null)
                        reject({status:"error", message:"Invalid team Id"})
                    
                //console.log("FOUND TEAM", foundTeam);
                foundTeam.players.push(player);
                teams[foundTeamIndex]= foundTeam;
                data.teams = teams;
                console.log(data);
                try {
                    Club.findOneAndUpdate(
                        {clubId},
                        {$set:{"teams": teams}},
                        {new: true}, (error, data) =>{
                            if(error){
                                reject(error);
                            }
                            resolve(data);
                        }
                    ).clone();
                } catch (error) {
                    reject(error);
                }
        })
    })
}

const getPlayerbyId = (player) =>{
    console.log("GET PLAYER BY ID", player)
    return new Promise(async (resolve,reject)=>{

        const dbConnection = await global.clientConnection
        const db = await dbConnection.useDb(mainDataBaseName)
        const Club = await db.model("club",ClubScheme)

        if((!player)) return false;
        try{
            Club.findOne({"teams.players._id": player}, async (error, data)=>{
            if(error){
                reject(error);
            }
            //console.log(data)
            const playerData = findPlayerById(player, data);
            
            await getUserbyId(playerData.userId).then((userData)=>{
                console.log( playerData, userData);
                const playerReturn = {
                    "username": userData.username,
                    "playerName": playerData.playerName,
                    "firstname": userData.firstname,
                    "lastname": userData.lastname,
                    "picture": userData.picture,
                    "birthdate": userData.birthdate,
                    "nationality": playerData.nationality,
                    "dni": userData.dni,
                    "gender": userData.gender,
                    "emails": userData.emails,
                    "address": userData.address,
                    "phones": userData.phones,
                    "social": userData.social,
                    "dorsal": playerData.dorsal,
                    "position": playerData.position,
                    "licence": playerData.licence
                }
                resolve(playerReturn);
            })
           
            }
        ).clone();
        } catch (error) {
            reject(error);
        }
    });
}

 module.exports = {
    insertClub,
    getClubbyId,
    insertTeam,
    deleteTeambyId,
    insertPlayer,
    getPlayerbyId,
    getTeambyId
 };