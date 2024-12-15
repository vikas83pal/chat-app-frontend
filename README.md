
# Real-Time Chat Application

A full-stack real-time chat application built with **React** for the frontend and **WebSockets** (via **SockJS** and **StompJS**) for real-time communication. The project enables users to engage in seamless messaging with personalized user authentication and message persistence.

## Key Features:
- **Real-Time Messaging**: Instant sending and receiving of messages using WebSockets.
- **User Authentication**: Secure login system to manage users and their messages.
- **Message Persistence**: Fetches previous messages when a user joins a room, allowing seamless continuity of conversations.
- **Responsive UI**: Mobile-first design that ensures a smooth experience on any device.
- **Message Display**: Displays the sender’s name, message content, and timestamp clearly.

## Future Enhancements:
- **File Sharing**: Integration of file sending and receiving capabilities for users.
- **Voice/Video Calling**: Future integration of voice and video calling features.
- **Group Chats**: Support for multiple users joining and chatting in a room.
- **Push Notifications**: Notify users of new messages, even when the app is not in the foreground.

## Technologies Used:
- **Frontend**: React, CSS, JavaScript
- **Backend**: Spring Boot (for WebSocket communication)
- **WebSocket Integration**: SockJS, StompJS
- **Database**: MongoDB (optional based on your backend design)

## How to Run:
1. Clone the repository:
   - For frontend
   ```bash
   git clone https://github.com/vikas83pal/chat-app-frontend
   ```
   - For backend
   ```bash
   git clone https://github.com/vikas83pal/chat-app-backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the application:
   ```bash
   npm run dev
   ```

## Screenshots

Here are some screenshots of the project:

![Screenshot 1](/src/assets/ss1.png)
![Screenshot 2](/src/assets/ss3.png)
![Screenshot 3](/src/assets/ss2.png)


## Demo
Link to a demo of the project [(Link)](https://chat-eight-lemon.vercel.app/).

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to modify the sections as per your requirements. 