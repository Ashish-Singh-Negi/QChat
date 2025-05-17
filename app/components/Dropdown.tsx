import React, { ReactNode, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const Dropdown = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-fit px-2 mx-2 mb-4">
      <p
        onClick={() => setIsOpen(!isOpen)}
        className="h-8 font-medium mb-2 border-l-2 border-gray-400 dark:border-white px-2 text-lg text-black dark:text-white flex justify-between items-center hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
      >
        {title}
        <MdOutlineKeyboardArrowDown
          className={`${
            isOpen && "rotate-180"
          } inline h-6 w-6 transition-transform`}
        />
      </p>
      {isOpen && (
        <main className="h-52 w-full overflow-y-auto py-1">{children}</main>
      )}
    </div>
  );
};

export default Dropdown;
