import { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../../components/SideBar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { MessageCircle, CheckCircle2, Clock4, Star } from "lucide-react";
import { endpoint } from "../../apiEndpoint";

function Messages() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    axios
      .get(`${endpoint}/notifications/my-notifications`, {
        withCredentials: true,
      })
      .then((res) => {
        setNotifications(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch notifications:", err);
      });
  }, []);

  const handleOpenModal = (notificationId) => {
    markAsRead(notificationId);
    setActiveModal(notificationId);
    setRating(0);
    setFeedback("");
  };

  const handleSubmitFeedback = () => {
    if (!rating) return;
    // You can POST this to an endpoint here.
    console.log("Submitted:", { rating, feedback });
    setActiveModal(null);
  };

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(dateString));
  };

  //API to mark notifications as read
  const markAsRead = async (notificationId) => {
    try {
      const res = await axios.put(
        `${endpoint}/notifications/my-notifications/${notificationId}/mark-as-read`,
        {},
        { withCredentials: true }
      );

      // Update local state
      setNotifications((prev) =>
        prev.map((note) =>
          note.notification_id === notificationId ? res.data : note
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar className="z-10" />
      <div className="flex flex-1 bg-gray-50 relative">
        <SideBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <main
          className={`flex-1 p-4 sm:p-6 bg-gray-50 transition-all duration-300 ${
            showSidebar
              ? "lg:ml-[calc(18rem)] ml-0"
              : "lg:ml-[calc(18rem)] ml-0"
          }`}
        >
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md max-w-[90%] sm:max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
              <MessageCircle className="text-blue-600" />
              Messages
            </h2>

            {notifications.length === 0 ? (
              <p className="text-gray-600 text-sm">
                No notifications available.
              </p>
            ) : (
              <ul className="space-y-4">
                {notifications.map((note) => (
                  <li
                    key={note.notification_id}
                    className="flex justify-between items-start border border-gray-100 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition cursor-pointer"
                    onClick={() => {
                      markAsRead(note.notification_id);
                      if (note.message.includes("Were you satisfied")) {
                        handleOpenModal(note.notification_id);
                      }
                    }}
                  >
                    <div>
                      <p className="text-sm text-gray-800">{note.message}</p>
                      <div className="flex items-center text-xs text-gray-500 mt-2 gap-2">
                        <Clock4 size={14} />
                        {formatDate(note.notification_date)}
                      </div>
                    </div>
                    <div className="text-sm font-medium text-blue-600 flex items-center gap-1">
                      {note.status === "read" ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span>Read</span>
                        </>
                      ) : (
                        <>
                          <Clock4 className="w-4 h-4 text-yellow-500" />
                          <span>Unread</span>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>

        {/* MODAL */}
        {activeModal && (
          <div className="absolute inset-0 backdrop-blur-sm bg-white/20 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-lg w-[90%] max-w-md">
              <h3 className="text-lg font-semibold mb-4 text-center">
                Rate Our Service
              </h3>
              <div className="flex justify-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 cursor-pointer transition ${
                      (hover || rating) >= star
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(star)}
                    fill={(hover || rating) >= star ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <textarea
                rows={3}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Optional feedback..."
                className="w-full border rounded-lg p-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitFeedback}
                  disabled={!rating}
                  className={`px-4 py-2 text-sm rounded text-white transition ${
                    rating
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-blue-300 cursor-not-allowed"
                  }`}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Messages;
