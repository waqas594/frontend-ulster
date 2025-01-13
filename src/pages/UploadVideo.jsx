import { useState } from "react";
import { uploadVideo } from "../services/videoService";

const UploadVideo = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "hi",
    ageRating: "G",
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("genre", formData.genre);
    data.append("ageRating", formData.ageRating);
    data.append("video", file);

    try {
      const response = await uploadVideo(data);
      setMessage(response.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Upload failed.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-4 text-white">
          Upload Video
        </h2>
        <form onSubmit={handleUpload} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter video title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white"
            />
          </div>
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              placeholder="Enter video description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Video File
            </label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white"
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Upload
          </button>
        </form>
        {/* Message */}
        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes("failed") ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadVideo;
