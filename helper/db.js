const mongoose = require('mongoose')
let uri ='mongodb+srv://sherzod:fWKGUBMVHPoNjfNH@cluster0.2yi1mgm.mongodb.net/socket-io'

module.exports = ()=>{
    mongoose.connect(uri, ()=>{
        console.log('MongoDB connected');
    })
}

/// yl5vqPNkKgBiFAkE