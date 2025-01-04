import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  getUserProfile,
  getUserGoogleProfile,
} from "../../../../services/Auth";
import { apiUrl } from "../../../../config/Api";

const socket = io("http://103.72.96.123");

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [messagesReceivers, setMessagesReceivers] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [receivers, setReceivers] = useState(null);

  const [cookies] = useCookies(["token"]);
  const [userProfile, setUserProfile] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (messagesReceivers.length > 0) {
      const firstReceiverId = messagesReceivers[0].receiver_id;
      setActiveChat(firstReceiverId);
      setReceivers(firstReceiverId);
    }
  }, [messagesReceivers]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let data;
        try {
          data = await getUserProfile(cookies.token);
          setUserProfile(data);
        } catch (e) {
          console.log(
            "Đăng nhập thường không thành công, thử đăng nhập Google..."
          );
          data = await getUserGoogleProfile(cookies.token);
          setUserProfile(data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error);
        setError("Lỗi khi lấy dữ liệu người dùng.");
        setLoading(false);
        navigate("/login");
      }
    };

    fetchUser();
  }, [cookies.token, navigate]);

  useEffect(() => {
    chatReceivers();

    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [userProfile]);

  const chatReceivers = async () => {
    if (!userProfile || !userProfile.user_id) {
      return;
    }
    try {
      const response = await axios.get(
        `${apiUrl}/chat-receivers/${userProfile.user_id}`
      );
      setMessagesReceivers(response.data);
      setActiveChat(response.data[0].user_id);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const fetchMessages = async (receiverId) => {
    try {
      const response = await axios.get(
        `${apiUrl}/messages/${userProfile.user_id}/${receiverId}`
      );
      setMessages(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const deleteMessages = async (messageId) => {
    try {
      const response = await axios.delete(`${apiUrl}/messages/${messageId}`);
      console.log(response.data);
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== messageId)
      );
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleChatClick = (userId) => {
    setActiveChat(userId);
    fetchMessages(userId);
  };

  const handleSendMessage = async (receiverId) => {
    if (message.trim()) {
      try {
        const response = await fetch(`${apiUrl}/messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender_id: userProfile.user_id,
            receiver_id: receiverId,
            message: message.trim(),
          }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Message sent:", result.message);

          const currentTimestamp = new Date().toISOString();

          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender_id: userProfile.user_id,
              receiver_id: receiverId,
              message: message.trim(),
              timestamp: currentTimestamp,
              image_user: userProfile.image_user,
            },
          ]);
          const currentActiveChat = activeChat;
          await chatReceivers();
          setActiveChat(currentActiveChat);
          await fetchMessages(receiverId);
          setMessage("");
        } else {
          console.error("Error sending message");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const currentUserId = userProfile?.user_id;

  return (
    <div>
      <div className="chat-container mt-3">
        <div className="d-flex me-4">
          <Link to={"/profile"} className="btn circle-button">
            <i className="fas fa-arrow-left"></i>
          </Link>
        </div>
        <div className="chat-list">
          {[...messagesReceivers]
            .sort((a, b) => {
              const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
              const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
              return timeB - timeA;
            })
            .map((receiver) => (
              <div
                key={receiver.user_id}
                className={`chat-item ${
                  activeChat === receiver.user_id ? "chat-item-active" : ""
                }`}
                onClick={() => {
                  handleChatClick(receiver.user_id);
                  fetchMessages(receiver.user_id);
                }}
              >
                <img
                  src={receiver.image_user || "https://placehold.co/50x50"}
                  alt={`Profile picture of ${receiver.full_name}`}
                />
                <div className="chat-info">
                  <span>{receiver.full_name || "Unknown User"}</span>
                  <p>{receiver.message || "Sent message"}</p>
                  {receiver.timestamp && (
                    <p className="date">{formatDate(receiver.timestamp)}</p>
                  )}
                </div>
              </div>
            ))}
        </div>

        <div className="chat-content">
          {activeChat && (
            <div className="chat-header">
              <img
                src={
                  messagesReceivers.find(
                    (receiver) => receiver.user_id === activeChat
                  )?.image_user || "https://placehold.co/50x50"
                }
                alt={`Profile picture of ${
                  messagesReceivers.find(
                    (receiver) => receiver.user_id === activeChat
                  )?.full_name || "Unknown User"
                }`}
              />
              <div>
                <span>
                  {messagesReceivers.find(
                    (receiver) => receiver.user_id === activeChat
                  )?.full_name || "Unknown User"}
                </span>
                <p>
                  @
                  {messagesReceivers.find(
                    (receiver) => receiver.user_id === activeChat
                  )?.username || "unknown_user"}
                </p>
              </div>
            </div>
          )}

          <div className="chat-overflowY">
            {activeChat ? (
              <>
                {messages.map((msg) => (
                  <div className="container mt-5" key={msg.id}>
                    <div className="chat-time">{formatDate(msg.timestamp)}</div>
                    {msg.sender_id === currentUserId ? (
                      <div className="chat-message chat-message-right position-relative">
                        <div className="d-flex align-items-center">
                          <div className="dropdown message-dropdown message-menu">
                            <button
                              className="btn p-0 p-2"
                              type="button"
                              id={`menu-${msg.id}`}
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fas fa-ellipsis-h text-black"></i>{" "}
                            </button>
                            <ul
                              className="dropdown-menu "
                              aria-labelledby={`menu-${msg.id}`}
                            >
                              <li>
                                <button
                                  className="dropdown-item"
                                  onClick={() => deleteMessages(msg.id)}
                                >
                                  Xóa
                                </button>
                              </li>
                            </ul>
                          </div>
                          <div className="chat-message d-flex align-items-start">
                            <div className="d-block message-content">
                              {msg.message?.trim() && (
                                <div className="chat-text">{msg.message}</div>
                              )}

                              {msg.image && (
                                <Link
                                  to={`/blog/detail/${msg.blog_id}`}
                                  class="card mt-2"
                                  style={{ width: "18rem" }}
                                >
                                  <img
                                    src={msg.image}
                                    class="card-img-top"
                                    alt="..."
                                  />
                                  <div class="card-body bg-light">
                                    <span>{msg.title || "Unknown User"}</span>
                                  </div>
                                </Link>
                              )}
                            </div>
                            {msg.receiver_id === currentUserId ? (
                              <Link
                                to={`/author/${msg.receiver_id}`}
                                className="chat-avatar mr-5"
                              >
                                <img
                                  alt="User avatar on the right"
                                  height="40"
                                  src={
                                    msg.image_user ||
                                    "https://placehold.co/40x40"
                                  }
                                  width="40"
                                />
                              </Link>
                            ) : (
                              <Link
                                to={`/profile`}
                                className="chat-avatar mr-5"
                              >
                                <img
                                  alt="User avatar on the right"
                                  height="40"
                                  src={
                                    msg.image_user ||
                                    "https://placehold.co/40x40"
                                  }
                                  width="40"
                                />
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="chat-message position-relative  d-flex align-items-start">
                        {msg.receiver_id === currentUserId ? (
                          <Link
                            to={`/author/${msg.receiver_id}`}
                            className="chat-avatar mr-5"
                          >
                            <img
                              alt="User avatar on the right"
                              height="40"
                              src={
                                msg.image_user || "https://placehold.co/40x40"
                              }
                              width="40"
                            />
                          </Link>
                        ) : (
                          <Link to={`/profile`} className="chat-avatar mr-5">
                            <img
                              alt="User avatar on the right"
                              height="40"
                              src={
                                msg.image_user || "https://placehold.co/40x40"
                              }
                              width="40"
                            />
                          </Link>
                        )}
                        <div className="d-block message-content">
                          {msg.message?.trim() && (
                            <div className="chat-text">{msg.message}</div>
                          )}
                          {msg.image && (
                            <Link
                              to={`/blog/detail/${msg.blog_id}`}
                              class="card mt-2"
                              style={{ width: "18rem" }}
                            >
                              <img
                                src={msg.image}
                                class="card-img-top"
                                alt="..."
                              />
                              <div class="card-body bg-light">
                                <span>{msg.title || "Unknown User"}</span>
                              </div>
                            </Link>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <div className="empty-chat p-3">
                Select a conversation to view messages
              </div>
            )}
          </div>

          {activeChat && (
            <div className="chat-footer">
              <input
                type="text"
                placeholder="Send message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSendMessage(activeChat);
                  }
                }}
              />
              <i
                className="bi bi-send"
                onClick={() => handleSendMessage(activeChat)}
              ></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
