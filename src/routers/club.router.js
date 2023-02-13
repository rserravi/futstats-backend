const express = require("express");

const { insertClub, getClubbyId, insertTeam, getTeambyId, deleteTeambyId, insertPlayer, getPlayerbyId } = require("../model/club/club.model")

const router = express.Router();

router.all("/", (req, res, next) =>{
   //res.json({message: "return form club router"});
   next();
});

/////////////////////
//                 //
//   CLUB CRUD     //
//                 //
/////////////////////

//Create new Club
router.post("/", async(req, res) => {
   const {clubname, shield, slogan, address, phones, social, emails, venues, managers } = req.body;

   try {
            
      const newClubObj = {
            clubname,
            shield,
            slogan,
            address,
            phones,
            social,
            emails,
            venues,
            managers,
      }

       const result = await insertClub(newClubObj);
       console.log("Insert Club Result",result);
       //Send confirmation email
       res.json({status: "success", message: "New club created.", result});

   } catch(err){
       console.log(err)
       let message = "Unable to create new club at the moment. Pleaset contact administrator"
       res.json({status:"error", message});
   }
});

//Get club from Id
router.get("/", async (req, res)=>{
    
    const _id = req.body._id;
    console.log(req.body._id);
    if (_id){

        let clubFound = await getClubbyId(_id);
        if (clubFound === null){
            res.json({status:"error", message:"Not Found"})
        }
        res.json({status:"success", club:clubFound});
    }
    return ({status: "error", message: "no ID indicated"})
})

/////////////////////
//                 //
//   TEAM CRUD     //
//                 //
/////////////////////

//Insert team in a club
router.post("/team", async (req, res)=>{

    console.log("EN POST CLUB/TEAM")
    const _id = req.body.clubId;
    const team = req.body.team;
    if (_id) {
        if (team){
            let clubFound = await getClubbyId(_id);
            if (clubFound === null){
                res.json({status:"error", message:"Club Not Found"})
            }
            
            await insertTeam(_id, team).then((data)=>{
                console.log("Result of insertTeacm return in Post club/team", data)
                return res.json({status: "success", message:"Team Added to Club"});
            })
            .catch((error)=>{
                return res.json({status:"error", error});
            })
        }
        return ({status: "error", message: "no TEAM indicated"})
    }
    return ({status: "error", message: "no ID indicated"})
})

//Get team by _id;
router.get("/team", async (req, res)=>{
    const _id = req.body.teamId;
    if (_id){

        let teamFound = await getTeambyId(_id);
        if (teamFound === null){
            res.json({status:"error", message:"Not Found"})
        }
        res.json({status:"success", teamFound});
    }
    return ({status: "error", message: "no ID indicated"})
})

//Delete team by _id
router.delete("/team", async (req, res)=>{
    const _id = req.body.teamId;
    if (_id){

        let teamFound = await deleteTeambyId(_id);
        if (teamFound === null){
            res.json({status:"error", message:"Not Found"})
        }
        res.json({status:"success", teamFound});
    }
    return ({status: "error", message: "no ID indicated"})
})

/////////////////////
//                 //
//   PLAYER CRUD   //
//                 //
/////////////////////

//Insert player in a team in a club
router.post("/player", async (req, res)=>{

    const teamId = req.body.teamId;
    const player = req.body.player;
    if (teamId && player){
        await insertPlayer(teamId, player).then((data)=>{
            console.log("Result of insertTeacm return in Post club/team", data)
            return res.json({status: "success", message:"Player Added to Team and Club"});
        })
        .catch((error)=>{
            return res.json({status:"error", error});
        })

    }
    return ({status: "error", message: "no ID indicated"})
})

router.get("/player", async (req, res)=>{
    const _id = req.body.playerId;
    if (_id){

        let player = await getPlayerbyId(_id);
        if (player === null){
            res.json({status:"error", message:"Not Found"})
        }
        res.json({status:"success", player});
    }
    return ({status: "error", message: "no ID indicated"})
})

module.exports = router;