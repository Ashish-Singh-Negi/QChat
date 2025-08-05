import { LucideIcon } from "lucide-react";
import React from "react";

const DropdownActionCard = ({
  name,
  Icon,
  action,
}: {
  name: string;
  Icon: LucideIcon;
  action: () => void;
}) => {
  return (
    <button
      onClick={() => action()}
      className="h-10 w-full flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-all"
    >
      <div className="h-full w-10 flex items-center justify-center ">
        <Icon className="h-5 w-5 inline" />
      </div>
      <span>{name}</span>
    </button>
  );
};

export default DropdownActionCard;
