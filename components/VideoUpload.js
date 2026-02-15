"use client"

import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "@/service/api";
import { useStore } from "@/store";

function VideoUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [meta, setMeta] = useState({
    title: "",
    description: "",
  });
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const fetchVideos = useStore((state) => state.fetchVideos);

  function handleFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  }

  function formFieldChange(event) {
    setMeta({
      ...meta,
      [event.target.name]: event.target.value,
    });
  }

  function handleForm(formEvent) {
    formEvent.preventDefault();
    if (!selectedFile) {
      toast.error("Please select a video file!");
      return;
    }
    saveVideoToServer(selectedFile, meta);
  }

  function resetForm() {
    setMeta({
      title: "",
      description: "",
    });
    setSelectedFile(null);
    setUploading(false);
    setProgress(0);
    // Reset file input value manually if needed, or rely on key change
  }

  async function saveVideoToServer(video, videoMetaData) {
    setUploading(true);
    setProgress(0);

    try {
      let formData = new FormData();
      formData.append("title", videoMetaData.title);
      formData.append("description", videoMetaData.description);
      formData.append("file", video);

      let response = await api.post(
        `/api/v1/videos`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(progress);
          },
        }
      );

      // Fetch updated videos list
      await fetchVideos();

      toast.success("Video uploaded successfully!");
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload video.");
      setUploading(false);
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleForm} className="space-y-6">

        {/* File Input Area */}
        <div className="group relative border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            accept="video/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="p-8 flex flex-col items-center justify-center text-center">
            {selectedFile ? (
              <div className="space-y-2">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </div>
                <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">{selectedFile.name}</p>
                <p className="text-xs text-blue-600">Click to change</p>
              </div>
            ) : (
              <div className="space-y-2 text-gray-500">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-white transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                </div>
                <p className="text-sm font-medium"><span className="text-blue-600">Click to upload</span> or drag and drop</p>
                <p className="text-xs">MP4, WebM or Ogg</p>
              </div>
            )}
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Video Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={meta.title}
              onChange={formFieldChange}
              placeholder="e.g. My Amazing Trip"
              className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block p-2.5"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Description</label>
            <textarea
              name="description"
              id="description"
              rows="3"
              value={meta.description}
              onChange={formFieldChange}
              placeholder="Tell viewers about your video..."
              className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block p-2.5"
              required
            ></textarea>
          </div>
        </div>

        {/* Progress Bar */}
        {uploading && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
            <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={uploading}
          className={`w-full text-white bg-[#2D2926] hover:bg-black focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-3 text-center transition-all ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {uploading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Uploading {progress}%
            </span>
          ) : "Publish Video"}
        </button>
      </form>
    </div>
  );
}

export default VideoUpload;