import axios from "axios";
import React, { useState } from "react";

const CreateMusic = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    music: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("image", formData.image);
      data.append("music", formData.music);

      const res = await axios.post(
        "http://localhost:3000/api/music/upload",
        data,
        {
          withCredentials: true,
        }
      );

      console.log("SUCCESS:", res.data);

    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
    }
    
  };

  return (
    <div className="min-h-screen bg-[#1f2933] flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-[#2C3947] p-6 rounded-xl shadow-lg">

        <h1 className="text-white text-xl mb-6 text-center">
          Create Music
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-white text-black outline-none"
          />

          {/* Image */}
          <div>
            <label className="text-sm text-gray-300 block mb-1">
              Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full text-sm text-white"
            />
          </div>

          {/* Music */}
          <div>
            <label className="text-sm text-gray-300 block mb-1">
              Music
            </label>
            <input
              type="file"
              name="music"
              onChange={handleChange}
              className="w-full text-sm text-white"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-black py-2 rounded hover:bg-yellow-400 transition"
          >
            Upload
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateMusic;