"use client"

import React, { useState } from "react";
import {
  Button,
  Card,
  Label,
  FileInput,
  TextInput,
  Textarea,
  Progress,
  Alert,
} from "flowbite-react";
import toast from "react-hot-toast";
import api from "@/service/api";

function VideoUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [meta, setMeta] = useState({
    title: "",
    description: "",
  });
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  function handleFileChange(event) {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  }

  function formFieldChange(event) {
    // console.log(event.target.name);
    // console.log(event.target.value);
    setMeta({
      ...meta,
      [event.target.name]: event.target.value,
    });
  }

  function handleForm(formEvent) {
    formEvent.preventDefault();
    if (!selectedFile) {
      alert("Select File !!");
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
  }

  async function saveVideoToServer(video, videoMetaData) {
    setUploading(true);


    try {
      let formData = new FormData();
      formData.append("title", videoMetaData.title);
      formData.append("description", videoMetaData.description);
      formData.append("file", selectedFile);

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

            console.log(progress);
            setProgress(progress);
          },
        }
      );

      console.log(response);
      setProgress(0);

      setMessage("File uploaded " + response.data.videoId);
      setUploading(false);
      toast.success("File uploaded successfully !!");
      resetForm();
    } catch (error) {
      console.log(error);
      setMessage("Error in uploading File");
      setUploading(false);
      toast.error("File not uploaded !!");
    }
  }

  return (
    <div className="text-white">
      <Card className="flex flex-col items-center justify-center">
        <h1>Upload Videos</h1>

        <div>
          <form
            noValidate
            className=" flex flex-col space-y-6"
            onSubmit={handleForm}
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="file-upload" value="Video Title" />
              </div>
              <TextInput className="text-gray-800 "
                value={meta.title}
                onChange={formFieldChange}
                name="title"
                placeholder="Enter title"
              />
            </div>

            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="comment" value="Video Description" />
              </div>
              <Textarea className="text-gray-800"
                value={meta.description}
                onChange={formFieldChange}
                name="description"
                id="comment"
                placeholder="Write video description..."
                required
                rows={4}
              />
            </div>

            <div className="flex items-center space-x-5 justify-center">
              <div className="shrink-0">
                <img
                  className="h-16 w-16 object-cover "
                  src="/video-posting.png"
                  alt="Current profile photo"
                />
              </div>
              <label className="block">
                <span className="sr-only">Choose video file</span>
                <input
                  name="file"
                  onChange={handleFileChange}
                  type="file"
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0s file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                />
              </label>
            </div>

            <div className="">
              {uploading && (
                <Progress
                  color="green"
                  progress={progress}
                  textLabel="Uploading"
                  size={"lg"}
                  labelProgress
                  labelText
                />
              )}
            </div>

            <div className="">
              {message && (
                <Alert
                  color={"success"}
                  rounded
                  withBorderAccent
                  onDismiss={() => {
                    setMessage("");
                  }}
                >
                  <span className="font-medium">Success alert! </span>
                  {message}
                </Alert>
              )}
            </div>

            <div className="flex justify-center">
              {/* <Button className="text-gray-800" disabled={uploading} type="submit">
                Submit
              </Button> */}
                <button className="group relative h-12 overflow-hidden overflow-x-hidden rounded-md bg-neutral-950 px-8 py-2 text-neutral-50"><span className="relative z-10">Submit</span><span className="absolute inset-0 overflow-hidden rounded-md"><span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-blue-500 transition-all duration-500 group-hover:translate-x-0 hover:cursor-pointer group-hover:scale-150"></span></span></button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default VideoUpload;