import React from 'react';
import { Link } from 'react-router-dom';

interface LessonCardProps {
  _id: string;
  image: string;
  name: string;
  description: string;
  progress: number;
  tags: string[];
}

const LessonCard: React.FC<LessonCardProps> = ({ _id, image, name, description, progress, tags }) => {
  return (
    <div className="rounded-lg shadow-xl bg-white">
      <img src={image} alt={name} className="w-full h-40 rounded-t-lg object-cover" />
      <div className="p-4">
        <Link to={`/lessons/${_id}`} className="text-decoration-none">
          <h3 className="text-xl font-bold mb-2">{name}</h3>
        </Link>
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="w-full h-2 bg-gray-200 rounded mb-4">
          <div
            className="h-2 bg-blue-500 rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <ul className="flex flex-wrap">
          {tags.map((tag, index) => (
            <li key={index} className="text-sm bg-gray-200 px-2 py-1 rounded mr-1 mb-1">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LessonCard;
