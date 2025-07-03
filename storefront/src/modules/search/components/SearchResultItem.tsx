import React from "react";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  image: string;
  handle: string;
  onClick?: () => void;
};

const SearchResultItem: React.FC<Props> = ({ title, image, handle, onClick }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/products/${handle}`);
    if (onClick) onClick();
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-100 transition"
    >
      <img src={image} alt={title} className="w-10 h-10 object-cover rounded" />
      <span className="text-sm">{title}</span>
    </div>
  );
};

export default SearchResultItem; 