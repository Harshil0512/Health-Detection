'use client';
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

const ImageUploadForm: React.FC = () => {
  const [report, setReport] = useState<string>("");
  const [images, setImages] = useState<FileList | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    setImages(selectedFiles);
    if (selectedFiles) {
      setUploadProgress(Array.from({ length: selectedFiles.length }, () => 0)); // Initialize progress for each file
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!report || !images) {
      alert("Please provide a report and at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("report", report);
    formData.append("user", "userId"); // Replace with actual user ID

    // Append all images to the FormData
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      setLoading(true);
      await axios.post("/api/upload", formData, {
        onUploadProgress: (progressEvent) => {
          const totalLength = progressEvent?.total;
          if (totalLength) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / totalLength);
            setUploadProgress((prevProgress) =>
              prevProgress.map((progress, index) =>
                index === images.length - 1 ? percentCompleted : progress
              )
            );
          }
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Images uploaded successfully!");
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload images.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={report}
          name="report"
          onChange={(e) => setReport(e.target.value)}
          placeholder="Enter your report here"
          required
        />
        
        <Input
          type="file"
          name="images"
          multiple
          onChange={handleImageChange}
          required
        />
        
        {images && (
          <div className="space-y-2">
            {Array.from(images).map((file, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span>{file.name}</span>
                <Progress value={uploadProgress[index] || 0} className="w-full" />
              </div>
            ))}
          </div>
        )}
        
        <Button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default ImageUploadForm;
