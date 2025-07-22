import React, { ReactNode, useEffect, useState } from "react";

const Dropdown = ({
  dropdownRef,
  children,
  dropdown,
  setDropdown,
  style = "",
}: {
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  children: ReactNode;
  dropdown: boolean;
  setDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  style?: string;
}) => {
  const [dropdownPosition, setDropdownPosition] = useState("");

  const dropdownOpenPositionhandler = () => {
    if (!dropdownRef.current) return;

    const rect = dropdownRef?.current!.getBoundingClientRect();

    console.log(rect);

    // setDropdownPosition(`left-${rect.left} top-${rect.top}`);

    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.top;
    const spaceLeft = rect.left;
    const spaceRight = window.innerWidth - rect.left;

    console.log({ spaceAbove, spaceBelow, spaceLeft, spaceRight });

    if (spaceBelow > 200)
      setDropdownPosition(
        `top-8 ${spaceLeft > spaceRight ? "right-4" : "left-full"}`
      );
    else if (spaceAbove > 200)
      setDropdownPosition(
        `bottom-8 ${spaceLeft > spaceRight ? "right-4" : "left-full"}`
      );
    else setDropdownPosition(`right-6 `);
  };

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      console.log("Print");
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdown(false);
      }
    }

    dropdownOpenPositionhandler();

    if (dropdown) {
      document.addEventListener("click", handleOutsideClick);

      return () => {
        document.removeEventListener("click", handleOutsideClick);
      };
    }
  }, [dropdown]);

  return (
    <div
      className={`absolute z-20 ${dropdownPosition} animate-dropdownOpen transition-all -my-1 bg-white dark:bg-gray-900 border-[1px] dark:border-gray-800 rounded-xl p-2  ${style}`}
    >
      {children}
    </div>
  );
};

export default Dropdown;
