"use client";

import { useState, useCallback } from "react";

interface PDFUploaderProps {
  onUpload: (file: File) => void;
}

export default function PDFUploader({ onUpload }: PDFUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        if (file.type === "application/pdf") {
          onUpload(file);
        } else {
          alert("Please upload a valid PDF file.");
        }
      }
    },
    [onUpload]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        onUpload(file);
      } else {
        alert("Please upload a valid PDF file.");
      }
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center transition-all duration-200 ${
        isDragging
          ? "border-primary bg-primary/10 scale-[1.02]"
          : "border-border bg-muted/30 hover:bg-muted/50"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center shadow-sm">
        {/* Simple File Icon SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted-foreground"
        >
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M12 12v6" />
          <path d="m9 15 3-3 3 3" />
        </svg>
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Upload your PDF
      </h3>
      <p className="text-sm text-muted-foreground text-center mb-6 max-w-sm">
        Drag and drop your PDF file here, or click to browse. We&apos;ll analyze
        it so you can ask questions.
      </p>
      
      <label className="cursor-pointer bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm">
        Browse Files
        <input
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={handleFileInput}
        />
      </label>
    </div>
  );
}
