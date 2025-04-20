const Chat = require("../models/chat"); // Renamed model file if you changed it
const { getIo } = require("../../socket");
const mongoose = require("mongoose");

// Save a new chat message
const saveMessage = async (req, res) => {
  console.log('end point hit');
  const { senderId, receiverId, message } = req.body;

  try {
    const newMessage = new Chat({ senderId, receiverId, message });
    const savedMessage = await newMessage.save();

    const io = getIo();
    if (io) {
      io.emit("newMessage", savedMessage); // Emit to all clients
    } else {
      console.error("❌ Socket.io instance is not defined");
    }

    res.status(201).json(savedMessage);
  } catch (error) {
    console.error("❌ Error saving message:", error);
    res.status(500).json({ error: "Failed to save message", details: error.message });
  }
};

// Get all messages between two users
const getMessages = async (req, res) => {
  console.log('get message endpoint hit');
  try {
    const { senderId, receiverId } = req.params;

    const senderObjectId = new mongoose.Types.ObjectId(senderId);
    const receiverObjectId = new mongoose.Types.ObjectId(receiverId);

    const messages = await Chat.find({
      $or: [
        { senderId: senderObjectId, receiverId: receiverObjectId },
        { senderId: receiverObjectId, receiverId: senderObjectId },
      ],
    }).sort({ timestamp: 1 }); // oldest to newest

    // Format messages for GiftedChat
    const formattedMessages = messages.map((message) => {
      return {
        _id: message._id.toString(),
        text: message.message, // Assuming `message.message` is the text content
        createdAt: message.timestamp, // Ensure timestamp is in the correct format
        user: {
          _id: message.senderId.toString(),
          name: message.senderName, // Ensure senderName is stored in your DB or fetch from user model
          avatar: message.senderAvatar, // Ensure senderAvatar is stored in your DB or fetch from user model
        },
      };
    });

    res.json({ messages: formattedMessages });
  } catch (error) {
    console.error("❌ Error fetching messages:", error);
    res.status(500).json({ error: "Failed to retrieve messages", details: error.message });
  }
};

module.exports = {
  saveMessage,
  getMessages,
};
