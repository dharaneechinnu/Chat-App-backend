const messageModel = require('../Model/MessageModel');

const createMessage = async(req,res) =>{
    const {chatId,senderId,text} = req.body;

    const message = new messageModel({
        chatId,
        senderId,
        text
    })
    try {
        const response = await messageModel.create(message)
        res.status(200).json(response);
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
        }
}

const getmessages = async (req, res) => {
    const { chatId } = req.params;
  
    if (!chatId) {
      return res.status(400).json({ error: "Chat ID is required" });
    }
  
    try {
      const messages = await messageModel.find({ chatId });
  
      if (!messages) {
        return res.status(404).json({ error: "Messages not found" });
      }
  
      res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  


module.exports = {createMessage,getmessages}