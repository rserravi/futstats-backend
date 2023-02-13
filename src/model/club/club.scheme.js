const mongoose = require("mongoose")
const ClubScheme = mongoose.Schema ({
    clubname: {
        type: String,
        maxLenght: 50,
        required: true
    },
    slogan: {
        type: String,
        maxlenght: 200,
        required: false
    },
    shield: {
        fileName: {
            type: String,
            required: false,
        },
        file: {
            data: Buffer,
            contentType: String,
        },
        uploadTime: {
            type: Date,
            default: Date.now,
        },
        type: {
            type: String,
            maxLenght: 20
        }
    },
    
    emails: [],
    address: [],
    phones: [],
    social: [],
    teams:[{
        name: {
            type: String,
            maxLenght: 100
        },
        colors: {
            primary: { type: String, maxLenght:8},
            secondary: { type: String, maxLenght:8},
        },
        category: {
            type: String,
            maxLenght: 50
        },
        competition: {
            type: String,
            maxLenght: 50
        },
        players:[{
            userId: {
                type: String,
                required: true
            },
            playerName: {
                type: String,
            },
            dorsal: {
                type: Number,
            },
            position:{
                type: String,
            },
            nationality:{
                type: String
            },
            licence:{
                type: String
            }
            
        }]
        
    }],
    venues:[],
    managers:[],

});
 
module.exports ={
   ClubScheme
}