const chatmodel = require('../Model/ChatModel');



const CreateChat = async(req,res) =>{
      const {firstId,secondId} = req.body;
      try {
            const chat = await chatmodel.findOne({
                members:{$all :[firstId,secondId]}
            }) 
            if(chat) return res.status(200).json(chat);
            
            const newChat = new chatmodel({
                members:[firstId,secondId]
            })

            const response = await chatmodel.create(newChat);

            res.status(200).json(response);
      } catch (error) {
        console.log(error)
        res.status(500).json(error)
      }
}

const finduserchat = async(req,res) =>{
    const userId = req.params.userId;
    try {
        const chats = await chatmodel.find({
            members : {$in:[userId]},
        });
        res.status(200).json(chats);
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const findchat = async(req,res) =>{

    const {firstId,secondId} = req.params;
    try {
        const chats = await chatmodel.find({
            members : {$in:[firstId,secondId]},
        });
        res.status(200).json(chats);
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports = {CreateChat,finduserchat,findchat};