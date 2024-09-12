import React, { useState, useEffect, useRef } from "react";
// import echo from "./echo"; // Laravel Echo configuration
import { Box, TextField, Button, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";

const ChatMessage = ({ userId, channelId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messageEndRef = useRef(null);

  // Listen to messages in the chat channel
  useEffect(() => {
    // const channel = echo.channel(`chat.${channelId}`);

    // channel.listen(".MessageSent", (event) => {
    //   setMessages((prevMessages) => [...prevMessages, event.message]);
    // });

    // Clean up when the component is unmounted
    return () => {
    //   channel.stopListening(".MessageSent");
    //   echo.leaveChannel(`chat.${channelId}`);
    };
  }, [channelId]);

  // Scroll to the bottom when a new message arrives
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send message to the backend via API
    await fetch("/api/send-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        channel_id: channelId,
        message: message,
      }),
    });

    setMessage(""); // Clear the input field
  };

  return (
    <Paper elevation={3} sx={{ p: 2, width: '100%', height: '100vh', display: "flex", flexDirection: "column" }}>
      <Typography variant="h6" sx={{ mb: 10, mt: 10 }}>
        Chat Room
      </Typography>

      {/* Chat Messages */}
      <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 2 }}>
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={<Typography sx={{ fontWeight: msg.user_id === userId ? "bold" : "normal" }}>{msg.user.name}</Typography>}
                secondary={msg.content}
              />
            </ListItem>
          ))}
          <div ref={messageEndRef}></div>
        </List>
      </Box>

      {/* Message Input */}
      <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center" }}>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          sx={{ mr: 1 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>
    </Paper>
  );
};

export default ChatMessage;