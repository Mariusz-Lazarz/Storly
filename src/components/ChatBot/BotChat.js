import React, { useState, useEffect, useRef } from "react";
import "../../App.css";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faTimes,
  faMinus,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const BotChat = () => {
  const chatEndRef = useRef(null);
  const [typing, setTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      sender: "bot",
      message:
        "Hello, I'm happy to help you today. Kindly be aware that Mariusz developed me, and I'm not an AI feature. I can comprehend basic instructions related to Storly, such as: delete account, list item, order history, reset password etc, by recognizing specific keywords.",
    },
  ]);

  const keywordReplies = {
    "how,can,i,list,a,item":
      "To post an item, please ensure you are logged in, then go to the main page and click the `Add` button..",
    "hi,hello,how,are,you": "Hello I'm fine, How can I help you today?",
    "great,thank,you,perfect,nice":
      "I'm happy to hear that, let me know if you have any other questions",
    "how,can,i,delete,my,account,change,password":
      "To remove your account or change password, kindly click on the user icon located at the right of the navigation bar, then proceed to the user data panel.",
    "how,can,i,see,edit,my,items,product,item,products":
      "To manage your products, kindly click on the user icon located at the right of the navigation bar, then proceed to the editing panel.",
    "how,can,i,see,my,orders,order,history,bought,products,items":
      "To check list of your orders, kindly click on the user icon located at the right of the navigation bar, then proceed to the order history panel.",
    "how,can,i,add,item,to,favourites,wishlist,favourite,like,loved":
      "To include a specific item in your favorites, visit the product's detail page and select the `Add to Favorite` button. Following this action, the items will appear in your wishlist, accessible via the user panel.",
  };

  const getBotReply = (userInput) => {
    const normalizedInput = userInput.toLowerCase();

    let maxMatchCount = 0;
    let bestReply =
      "I'm sorry, I didn't understand that. Can you please rephrase or ask another question?";

    for (let keywords in keywordReplies) {
      const matchCount = keywords
        .split(",")
        .filter((keyword) => normalizedInput.includes(keyword)).length;

      if (matchCount > maxMatchCount) {
        maxMatchCount = matchCount;
        bestReply = keywordReplies[keywords];
      }
    }

    return bestReply;
  };

  const handleUserMessageChange = (event) => {
    setUserMessage(event.target.value);
  };

  const handleUserMessageSubmit = (event) => {
    event.preventDefault();
    if (!userMessage) return;
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { sender: "user", message: userMessage },
    ]);

    setUserMessage("");

    const botReply = getBotReply(userMessage);

    setTyping(true);
    setTimeout(() => {
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { sender: "bot", message: botReply },
      ]);
      setTyping(false);
    }, 2000);
  };

  const minimizeChat = () => {
    setIsChatMinimized(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setIsChatMinimized(false);
    setChatHistory([{ sender: "bot", message: "How can I help you?" }]);
  };

  useEffect(() => {
    if (isChatOpen && !isChatMinimized) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, isChatOpen, isChatMinimized]);

  return (
    <>
      <CSSTransition
        in={isChatOpen && !isChatMinimized}
        timeout={300}
        classNames="chat-transition"
        unmountOnExit
      >
        <div className="fixed bottom-4 right-4 z-50 bg-gray-200 p-4 rounded-md w-80 md:w-96 max-w-sm shadow-lg flex flex-col h-[60vh]">
          <div className="flex gap-2 justify-between">
            <div className="flex gap-2">
              <div className="yellow-glow w-5 h-5 bg-gradient-to-br from-green-400 to-green-600 rounded-full animate-pulse shadow-lg"></div>
              <span>Online</span>
            </div>
            <div className="flex gap-2">
              <button onClick={minimizeChat} className="mb-2 self-start">
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <button onClick={closeChat} className="mb-2 self-end">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
          <div className="overflow-y-auto flex-1">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`mb-2 flex flex-col ${
                  chat.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <span className="mb-1 font-bold">
                  {chat.sender === "user" ? "You" : "Mano"}
                </span>
                <p
                  className={`p-2 rounded-md ${
                    chat.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300"
                  } max-w-xs`}
                >
                  {chat.message}
                </p>
              </div>
            ))}
            {typing && (
              <div className="flex flex-col items-start">
                <span className="mb-1 font-bold">Bot</span>
                <p className="bg-gray-300 p-2 rounded-md max-w-xs">
                  <span className="dots">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </span>
                </p>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={handleUserMessageSubmit} className="mt-4 flex">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full px-4 py-2 border rounded-l-full focus:outline-none focus:border-blue-500"
              value={userMessage}
              onChange={handleUserMessageChange}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-r-full hover:bg-blue-600 focus:outline-none w-10"
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </form>
        </div>
      </CSSTransition>

      {(!isChatOpen || isChatMinimized) && (
        <div
          className="fixed bottom-20 right-10 flex items-center justify-center p-4 rounded-full bg-blue-500 text-white cursor-pointer animate-pulse z-50"
          onClick={() => {
            setIsChatOpen(true);
            setIsChatMinimized(false);
          }}
        >
          <FontAwesomeIcon icon={faComments} size="2x" />
          <span className="absolute top-0 right-0 py-1 px-2 bg-red-500 rounded-full text-xs">
            {chatHistory.length}
          </span>
        </div>
      )}
    </>
  );
};

export default BotChat;
