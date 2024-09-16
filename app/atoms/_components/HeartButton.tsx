import { useState } from "react";

export const HeartButton = () => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(true);
    setTimeout(() => {
      setIsLiked(false);
    }, 600);
    };

  return (
    <div
      className={`cursor-pointer w-[100px] h-[100px] bg-left transition ${
        isLiked ? "animate-like" : ""
      }`}
      style={{ background: "url('/assets/like/heart-animation.png') " }}
      onClick={handleLike}
    ></div>
  );
};