import React from "react";

const FriendsCard: React.FC = () => {
  const friends = [
    {
      id: 1,
      name: "Thomas Martin",
      imageUrl: "https://picsum.photos/100",
    },
    {
      id: 2,
      name: "John Doe",
      imageUrl: "https://picsum.photos/100",
    },
    {
      id: 3,
      name: "Jane Smith",
      imageUrl: "https://picsum.photos/100",
    },
  ];

  return (
    <div className="col-span-1 md:col-span-2 h-fit bg-backgroundalt p-6 rounded-xl drop-shadow-xl">
      <h3 className="text-2xl font-bold mb-4">Friends</h3>
      {friends.map((friend) => (
        <div
          key={friend.id}
          className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-4"
        >
          <div className="flex items-center gap-4">
            <img
              src={friend.imageUrl}
              className="w-14 h-14 object-cover rounded-full"
              alt={`${friend.name}'s profile picture`}
            />
            <div>
              <h3 className="font-bold">{friend.name}</h3>
            </div>
          </div>
          <div>
            <span className="bg-primary-500 py-2 px-4 rounded-full text-maintextalt">
              Challenge
            </span>
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <a
          href="#"
          className="hover:text-primary-500 transition-colors hover:underline"
        >
          See all friends
        </a>
      </div>
    </div>
  );
};

export default FriendsCard;
