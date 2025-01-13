import { useEffect, useState } from "react";
import { getAllVideos, addComment, rateVideo } from "../services/videoService";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const data = await getAllVideos();
        // Initialize comment and rating fields for each video
        const videosWithFields = data.map((video) => ({
          ...video,
          comment: "",
          rating: 0,
        }));
        setVideos(videosWithFields);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleComment = async (videoId, text) => {
    try {
      const response = await addComment(videoId, { text });
      // Update the videos state with the new comment
      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video._id === videoId
            ? {
                ...video,
                comments: [...video.comments, { text }],
                comment: "", // Clear input field
              }
            : video
        )
      );
      setMessage(response.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to add comment.");
    }
  };

  const handleRating = async (videoId, rating) => {
    try {
      const response = await rateVideo(videoId, { rating });
      // Update the videos state with the new rating
      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video._id === videoId
            ? {
                ...video,
                ratings: [...video.ratings, rating],
                rating: 0, // Clear input field
              }
            : video
        )
      );
      setMessage(response.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to add rating.");
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Videos</h2>
      {loading && <p className="text-gray-500 text-center">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}
      <div className="space-y-6">
        {videos.map((video) => (
          <div
            key={video._id}
            className="flex flex-col md:flex-row bg-gray-800 rounded-lg shadow-md p-4"
          >
            <div className="md:w-1/3">
              <video controls className="w-full h-auto rounded-lg">
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="md:w-2/3 md:ml-6">
              <h3 className="text-lg font-semibold text-white">
                {video.title}
              </h3>
              <p className="text-gray-400">{video.description}</p>
              <div className="mt-4">
                <h4 className="font-semibold mb-2 text-white">Comments:</h4>
                <div className="space-y-2 mb-4">
                  {video.comments?.length > 0 ? (
                    video.comments.map((comment, idx) => (
                      <p key={idx} className="text-gray-300">
                        - {comment.text}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-500">No comments yet.</p>
                  )}
                </div>
                <textarea
                  placeholder="Add a comment"
                  value={video.comment}
                  onChange={(e) =>
                    setVideos((prevVideos) =>
                      prevVideos.map((v) =>
                        v._id === video._id
                          ? { ...v, comment: e.target.value }
                          : v
                      )
                    )
                  }
                  className="w-full border border-gray-600 rounded-md p-2 mb-2 bg-gray-700 text-white"
                />
                <button
                  onClick={() => handleComment(video._id, video.comment)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Comment
                </button>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold mb-2 text-white">
                  Rate This Video:
                </h4>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={video.rating}
                    min="1"
                    max="5"
                    onChange={(e) =>
                      setVideos((prevVideos) =>
                        prevVideos.map((v) =>
                          v._id === video._id
                            ? {
                                ...v,
                                rating: Math.min(
                                  Math.max(e.target.value, 1),
                                  5
                                ),
                              }
                            : v
                        )
                      )
                    }
                    className="w-16 border border-gray-600 rounded-md p-2 bg-gray-700 text-white"
                  />
                  <button
                    onClick={() => handleRating(video._id, video.rating)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  >
                    Rate
                  </button>
                </div>
                <p className="text-gray-400 mt-2">
                  Average Rating:{" "}
                  {video.ratings?.length > 0
                    ? (
                        video.ratings.reduce((sum, rating) => sum + rating, 0) /
                        video.ratings.length
                      ).toFixed(1)
                    : "No ratings yet"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;
