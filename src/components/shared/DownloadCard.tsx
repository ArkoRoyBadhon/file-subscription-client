import React from "react";

interface DownloadCardProps {
  filename: string;
  fileType: string;
  photo: string;
}

const DownloadCard: React.FC<DownloadCardProps> = ({ filename, fileType, photo }) => {
  return (
    <div className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
      <img
        // src={photo}
        src="/images/img3.jpg"
        alt={filename}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h2 className="text-lg font-semibold">{filename}</h2>
      <p className="text-sm text-gray-500">{fileType.toUpperCase()}</p>
    </div>
  );
};

export default DownloadCard;
