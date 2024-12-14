import React from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router'
import ChatIcon from "../../assets/chat-icon.gif"
import { useState } from 'react'
import axios from 'axios'
import ChatContext from '../context/chatContext'
import { useNavigate } from 'react-router'
import { useContext } from 'react'


const home = () => {

  const navigate = useNavigate();


  const [details, setDetails] = useState({
    "userName": "",
    "roomId": ""
  })

  const { roomId, user, connected, setRoomId, setUser, setConnected } = useContext(ChatContext);
  const handleInputChange = (event) => {
    setDetails({
      ...details,
      [event.target.name]: event.target.value
    })
  }

  const validate = () => {
    if (details.userName === "" || details.roomId === "") {
      toast.error("Invalid Input Field!!");
      return false;
    } else {
      return true;
    }
  }

  const roomCreate = async () => {
    if (validate()) {
      try {
        const response = await axios.post("http://localhost:8080/api/rooms", details, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 201) {
          toast.success("Room created successfully!");
          console.log("Room Created:", response.data);
          setRoomId(details.roomId);
          setUser(details.userName);
          setConnected(true);
          // joinRoom();
          navigate("/chatpage")
        } else {
          toast.error("Failed to create room!");
        }
      } catch (error) {
        console.error("Error creating room:", error);
        toast.error("Room already exits");
      }
    }


  };

  
  const joinRoom = async () => {
    if (validate()) {
      try {
        const res = await axios.get(`http://localhost:8080/api/rooms/${details.roomId}`);
        if (res.status === 200) {
          console.log("Room details:", res.data);
          toast.success("Joined the room successfully.");
          setRoomId(details.roomId);
          setUser(details.userName);
          setConnected(true);
          navigate("/chatpage");
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            toast.error("Room not found. Please check the Room ID.");
          } else {
            toast.error("Failed to join the room. Please try again later.");
          }
        } else {
          toast.error("Network error. Please check your connection.");
        }
        console.error("Error joining room:", error);
      }
    }
  };
  
  
  
  





  return (
    <>
      <div className='bg-white/30 backdrop-blur-lg z-0 sticky top-0 shadow-2xl'>
        <nav>
          <ul className='flex flex-row flex-wrap text-white space-x-4  p-4 cursor-pointer'>
            <Link to={"/"}>Home</Link>
            <Link to={"/about"}>About Us</Link>
            <Link to={"/contact"}>Contact Us</Link>
          </ul>
        </nav>
      </div>

      <div className="flex justify-center items-center mt-40">
        <div className="bg-violet-200  flex flex-col items-center rounded-2xl p-5 space-y-4 shadow-2xl shadow-black">
          <div>
            <img src={ChatIcon} alt="" className='w-20' />
          </div>
          <h1 className="font-serif text-xl text-center">
            Chat App
          </h1>
          <div className="flex flex-col w-full space-y-2">
            <label htmlFor="username" className="text-sm">Your Name</label>
            <input onChange={handleInputChange}
              value={details.userName}
              type="text"
              name='userName'
              placeholder="Enter your name"
              className="bg-violet-50 text-sm p-2 rounded-md w-full  focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all duration-200 focus:shadow-2xl focus:shadow-black"
            />
          </div>
          <div className="flex flex-col w-full space-y-2">
            <label htmlFor="room-id" className="text-sm">Room ID / Create Room Id</label>
            <input
              onChange={handleInputChange}
              value={details.roomId}
              type="text"
              placeholder="Enter room ID"
              name='roomId'
              className="bg-violet-50 text-sm p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all duration-200 focus:shadow-2xl focus:shadow-black"

            />
          </div>
          <div className="flex gap-10 justify-around">
            <button onClick={joinRoom} className="bg-blue-400 px-4 py-2 rounded-md hover:bg-blue-800 text-white">
              Join Room
            </button>
            <button onClick={roomCreate} className="bg-green-500 px-4 py-2 hover:bg-green-800 rounded-md text-white">
              Create Room
            </button>
          </div>
        </div>
      </div>


    </>
  )
}

export default home
