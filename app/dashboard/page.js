"use client";

import { useState, useEffect } from "react";
import VideoUpload from "@/components/VideoUpload";
import VideoPlayer from "@/components/VideoPlayer";
import CustomNavbar from "@/components/Navbar";
import api from "@/service/api";
import toast from "react-hot-toast";
import { useStore } from "@/store";

export default function Dashboard() {
  const { videos, fetchVideos } = useStore();
  const [loading, setLoading] = useState(true);
  const [previewVideo, setPreviewVideo] = useState(null); // The video currently in the "float"


  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true);
      await fetchVideos();
      setLoading(false);
    };
    loadVideos();
  }, [fetchVideos]);

  const openFullScreen = (video) => {
    // This opens the master playlist directly in a new tab
    // Note: Some browsers need a specialized HLS extension to play m3u8 directly
    window.open(video.filePath, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D2926] relative">
      <CustomNavbar />

      <main className="p-4 lg:p-8">
        <div className="grid lg:grid-cols-12 gap-8">

          {/* LEFT: Full Width Video Library */}
          <div className="lg:col-span-9">
            <h2 className="text-2xl font-bold font-serif mb-6">Content Library</h2>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-48 bg-gray-200 animate-pulse rounded-xl"></div>)}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <div
                    key={video.videoId}
                    onClick={() => setPreviewVideo(video)}
                    className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
                  >
                    <div className="aspect-video bg-neutral-900 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
                      <span className="text-gray-500 text-xs italic">Thumbnail Preview</span>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="bg-white/20 p-3 rounded-full backdrop-blur-md">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>
                        </div>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg truncate">{video.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mt-1">{video.description}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                        {new Date(video.uploadedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Fixed Upload Section */}
          <div className="lg:col-span-3">
            <div className="bg-[#F3EFE0] p-6 rounded-2xl border border-[#EAE7DC] sticky top-8">
              <h2 className="text-lg font-semibold mb-4">Quick Upload</h2>
              <VideoUpload />
            </div>
          </div>
        </div>
      </main>

      {/* FLOATING PREVIEW MODAL */}
      {previewVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-4xl relative">
            {/* Close Button */}
            <button
              onClick={() => setPreviewVideo(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black text-white p-2 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="bg-black aspect-video">
              <VideoPlayer
                key={previewVideo.videoId}
                src={previewVideo.filePath}
              />
            </div>

            <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">{previewVideo.title}</h2>
                <p className="text-gray-500">{previewVideo.description}</p>
              </div>
              <button
                onClick={() => openFullScreen(previewVideo)}
                className="bg-[#2D2926] text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                Full Screen Tab
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}