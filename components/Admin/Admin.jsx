// components/Admin/Admin.jsx
"use client";
import React, { useState } from "react";
import axios from "axios";
import { invitease_api } from "@/configs/axiosConfig";

export default function Admin() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    year: "",
    category: "",
    tags: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userid, setUserid] = useState("johnistein2000@gmail.com");

  const uploadToCloudinary = async (file) => {
    try {
      const { data: sig } = await invitease_api.post("/cloud/signature", {
        userid: userid,
      });

      const form = new FormData();
      form.append("file", file);
      form.append("api_key", sig.apiKey);
      form.append("timestamp", sig.timestamp);
      form.append("signature", sig.signature);
      form.append("folder", `Invitease/Users/${userid}`);

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`,
        form,
        {
          onUploadProgress: (e) => {
            setUploadProgress(Math.round((e.loaded * 100) / e.total));
          },
        }
      );
      return res.data.secure_url;
    } catch (error) {
      console.log(error.message);
      return;
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!selectedImage) return setError("Select image first");
      const url = await uploadToCloudinary(selectedImage);

      await invitease_api.post("/gallery/upload", {
        image: url,
      });

      setSelectedImage(null);
      setImagePreview(null);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Upload failed");
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <main className="relative flex min-h-full w-full max-w-[1080px] flex-row items-center lg:gap-6 md:gap-4 gap-2">
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg w-[500px] space-y-3"
        >
          <div className="w-full border p-2 flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
          {imagePreview && (
            <img src={imagePreview} className="w-full h-48 object-cover" />
          )}

          {error && <p className="text-red-500">{error}</p>}
          {loading && uploadProgress > 0 && <p>Uploading: {uploadProgress}%</p>}

          <button
            type="button"
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={() => {}}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
