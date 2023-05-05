import React from 'react';
import { AiOutlineLike, AiOutlineMessage, AiOutlineShareAlt } from 'react-icons/ai';

const entries = [
    {
        id: 1,
        username: 'Jane Doe',
        timestamp: 'April 19, 2023 3:30 PM',
        topic: '#photography',
        imageUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29',
        likes: 20,
        caption: 'What a beautiful day to capture the wonders of nature. 🌿📷',
    },
    {
        id: 2,
        username: 'John Smith',
        timestamp: 'April 19, 2023 1:15 PM',
        topic: '#travel',
        imageUrl: '',
        likes: 15,
        caption: 'Just booked my flight to Bali! Can\'t wait to explore! ✈️🏖️',
    },
];

const SocialFeedCard: React.FC = () => (
    <>
        {/* Social Feed Card */}
        <div className="col-span-1 md:col-span-2 bg-white p-6 rounded-xl drop-shadow-2xl">
            {entries.map((entry, index) => (
                <div key={entry.id} className="mb-8">
                    <div className="flex items-start gap-4">
                        <img src="https://picsum.photos/80" className="w-16 h-16 object-cover rounded-full" />
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between w-full">
                                <h4 className="text-xl font-bold">{entry.username}</h4>
                                <span className="text-gray-500 text-sm">{entry.timestamp}</span>
                            </div>
                            <p className="text-gray-500">{entry.topic}</p>
                        </div>
                    </div>
                    {entry.imageUrl && (
                        <div className="mt-4">
                            <img src={entry.imageUrl} className="w-full h-64 object-cover rounded-xl" />
                        </div>
                    )}
                    <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <button className="text-gray-500 hover:text-blue-500 transition-colors">
                                <AiOutlineLike className="text-2xl" />
                            </button>
                            <span className="text-gray-500">{entry.likes} likes</span>
                        </div>
                        <button className="text-gray-500 hover:text-blue-500 transition-colors">
                            <AiOutlineMessage className="text-2xl" />
                        </button>
                        <button className="text-gray-500 hover:text-blue-500 transition-colors">
                            <AiOutlineShareAlt className="text-2xl" />
                        </button>
                    </div>
                    <div className="mt-4">
                        <h5 className="font-bold">Caption</h5>
                        <p className="text-gray-500">{entry.caption}</p>
                    </div>
                    {index < entries.length - 1 && (
                        <hr className="my-6 border-t border-gray-200" />
                    )}
                </div>
            ))}
        </div>
    </>
);

export default SocialFeedCard;
