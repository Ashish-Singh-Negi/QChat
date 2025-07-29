import React, { useState } from "react";
import { Pin } from "../../icons";
import { IMessage } from "@/Interface/message";
const data1: IMessage = {
  senderID: "me",
  recieverID: "notme",
  message: "hello  hello",
  date: "1:45",
  // phone_No: 2673567,
};
function PinedMessages() {
  const [count, setCount] = useState(0);
  const [content] = useState<IMessage[]>([data1]);
  const handleSubmit = () => {
    if (count < content.length - 1) {
      setCount(count + 1);
    } else {
      setCount(0);
    }
  };
  return (
    <div
      className={`${
        content.length == 0 ? "hidden" : "flex flex-col"
      } h-fit w-full `}
      onClick={() => handleSubmit}
    >
      <div className="divider m-0" />
      <p className="text-quick-500 txt-color-lvl-3">
        {content.length} messages pinned
      </p>
      <div className="flex w-full">
        <div className="">
          <Pin className="size-6 mr-4 txt-color-lvl-2" />
        </div>
        <div>{content[count].message}</div>
      </div>
    </div>
  );
}

export default PinedMessages;
