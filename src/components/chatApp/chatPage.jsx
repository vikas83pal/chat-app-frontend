import React, { useContext, useRef, useState, useEffect } from 'react';
import File from "../../assets/file.png";
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import ChatContext from '../context/chatContext';

const chatPage = () => {
    const { user, roomId, connected } = useContext(ChatContext);
    const navigate = useNavigate();

    // Redirect to home page if not connected
    useEffect(() => {
        if (!connected) {
            navigate("/");
        }
    }, [connected, navigate]);

    const [message, setMessage] = useState([]);
    const [input, setInput] = useState('');
    const [stompClient, setStompClient] = useState(null);
    const boxRef = useRef(null);

    useEffect(() => {
        // Check if the stompClient is already established to prevent infinite connection
        if (!stompClient) {
            const sock = new SockJS("http://localhost:8080/chat");
            const client = Stomp.over(sock);
    
            client.connect({}, () => {
                setStompClient(client);
                toast.success("Connected");
    
                client.subscribe(`/topic/room/${roomId}`, (message) => {
                    const newMessage = JSON.parse(message.body);
                    console.log("Received Message:", newMessage); // Log the incoming message structure
                    setMessage((prevMessages) => [...prevMessages, newMessage]);
                });
                
            });
        }
    
        // Cleanup WebSocket connection when component is unmounted
        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, [roomId]); // This ensures it runs only when the roomId changes (not on every render)
    
    const sendMessage = async () => {
        if (stompClient && connected && input.trim()) {
          console.log(input);
    
          const message = {
            sender: user,
            content: input,
            roomId: roomId,
          };
    
          stompClient.send(
            `/app/sendmessages/${roomId}`,
            {},
            JSON.stringify(message)
          );
          setInput("");
        }
      };

    // Fetch previous messages when the room is joined
    useEffect(() => {
        const loadMessages = async () => {
            console.log("Room ID:", roomId); // Log the roomId to ensure it's correct
    
            try {
                const response = await fetch(`/api/rooms/${roomId}/messages`);
    
                if (!response.ok) {
                    const errorDetails = await response.text();
                    throw new Error(`Failed to fetch messages: ${errorDetails}`);
                }
    
                const fetchedMessages = await response.json();
                console.log("Fetched Messages:", fetchedMessages); // Log fetched messages
                setMessage(fetchedMessages); 
            } catch (error) {
                toast.error('Error loading messages');
                console.error('Error loading messages:', error);
            }
        };
    
        if (roomId) {
            loadMessages();
        }
    }, [roomId]);

    // Scroll to the latest message
    useEffect(() => {
        if (boxRef.current) {
            boxRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [message]); // Dependency on `message`

    return (
        <div>
            <nav className='flex justify-between items-center bg-white/30 p-3 fixed w-full top-0 rounded-lg z-10'>
                <div className='flex items-center'>
                    <span className='font-serif'>Room ID: {roomId}</span>
                </div>
                <div className='flex items-center'>
                    <span className='font-serif'>User: {user}</span>
                </div>
                <button onClick={() => { navigate("/"); toast.success("Successfully Logout!"); }} className='bg-red-500 rounded-md cursor-pointer hover:bg-green-500 px-4 py-2'>Logout</button>
            </nav>
    
            <div className="flex flex-col h-screen pt-[72px] pb-[90px]">
                <main className="h-[90vh] mx-20 overflow-auto p-4 bg-gradient-to-b from-pink-800/20 to-white/30 rounded-lg z-10">
                    {message.map((msg, key) => (
                        <div key={key} className={`flex ${msg.senderId === user ? "justify-end" : "justify-start"}`}>
                            <div className={`border bg-white/30 px-3 py-2 w-fit mb-2 rounded-lg ${msg.senderId === user ? "bg-white/30 rounded-lg" : "bg-pink-200 rounded-lg"}`}>
                                <p className='font-serif font-bold'>{msg.senderId}</p>
                                <p className='font-serif'>{msg.content}</p>
                                <span className='text-gray-500 text-xs'>{new Date(msg.timestamp).toLocaleString()}</span>
                            </div>
                        </div>
                    ))}
                    <div ref={boxRef}></div>
                </main>
            </div>
    
            <footer className="bg-white/30 p-4 fixed bottom-2 inset-x-0 flex items-center rounded-xl mx-auto w-full max-w-screen-md">
                <div className="flex w-full items-center space-x-2">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                sendMessage();
                            }
                        }}
                        type="text"
                        placeholder="Type a message"
                        className="flex-grow p-2 rounded-full bg-violet-50 font-serif text-black focus:outline-none focus:ring-2 focus:ring-violet-400 focus:shadow-md"
                    />
                    <img src={File} alt="Attach File" className="w-10 bg-transparent cursor-pointer" />
                    <button onClick={sendMessage} className="bg-green-500 rounded-lg px-4 py-2">Send</button>
                </div>
            </footer>
        </div>
    );
    
};

export default chatPage;
