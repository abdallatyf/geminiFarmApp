
import React, { useState, useRef, useCallback } from 'react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

const CameraIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);


const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
          setIsDragging(true);
      }
  }, []);
  
  const handleDragOut = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          onImageUpload(e.dataTransfer.files[0]);
          e.dataTransfer.clearData();
      }
  }, [onImageUpload]);

  const dragClasses = isDragging ? 'border-brand-primary bg-brand-light' : 'border-gray-300 bg-white';

  return (
    <div className="text-center p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">What's in your fridge?</h2>
      <p className="text-gray-600 mb-8">Let AI be your personal chef. Snap a photo to get started.</p>
      <div
        className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed ${dragClasses} rounded-lg cursor-pointer transition-colors duration-200`}
        onClick={handleClick}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />
        <CameraIcon className="w-16 h-16 text-gray-400 mb-4"/>
        <p className="text-lg text-gray-500">
          <span className="font-semibold text-brand-primary">Click to upload</span> or drag and drop
        </p>
        <p className="text-sm text-gray-400">PNG, JPG, or WEBP</p>
      </div>
    </div>
  );
};

export default ImageUploader;
