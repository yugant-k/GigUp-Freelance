import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

const createMessage = asyncHandler(async (req, res) => {
  const newMessage = new Message({
    conversationId: req.body.conversationId,
    userId: req.userId,
    desc: req.body.desc,
  });

   const savedMessage = await newMessage.save();
  if (!savedMessage) {
    return next(new ApiError(500, "Failed to save new message"));
  }

  const updatedConversation = await Conversation.findOneAndUpdate(
    { id: req.body.conversationId },
    {
      $set: {
        readBySeller: req.user.isSeller,
        readByBuyer: !req.user.isSeller,
        lastMessage: req.body.desc,
      },
    },
    { new: true }
  );

  if (!updatedConversation) {
    return next(new ApiError(500, "Failed to update conversation"));
  }

  res.status(201).json(new ApiResponse(201, savedMessage, "Message created successfully"));

});

const getMessages = asyncHandler(async (req, res) => {
    
    const messages = await Message.find({ conversationId: req.params.id });
    if(!messages){
        throw new ApiError(404, "Messages not found");
    }
    res.status(201).json(new ApiResponse(201, messages, "Messages Found"));
  
});

export {
    createMessage,
    getMessages
};