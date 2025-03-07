import React, { useRef, useState } from "react";
import { Cross, Search, ALeft, Calender } from "../icons";
import "../global.css";
import { context_val } from "../chatsSection/ContextProvider";
function SearchMessages(data : {css : string}) {
  const [searchval, setSearchval] = useState("");
  const calender = useRef<HTMLInputElement>(null);
  const { search, setSearch } = context_val();

  return (
    <div className={` ${search ? "flex" : "hidden"} global-height color-lvl-1 ${data.css} flex-col fixed right-0 `}>
      {/* ..............header................ */}
      <div className="flex  w-full  content-center p-1 h-[10vh] align-middle ">
        <button
          onClick={() => setSearch(!search)}
          className=" px-[3%] text-3xl font-semibold txt-color-lvl-2 "
        >
          <Cross />
        </button>
        <p className="self-center text-center pl-[4%] text-xl text-quick-600 txt-color-lvl-2 ">
          Search messages
        </p>
      </div>

      {/* ...........................searchbar............................ */}

      <div className="flex content-center align-middle h-[6vh] w-full">
        <div className="px-[3%] align-middle self-center">
          <input type="date" className=" hidden " ref={calender} />
          <button
            className=" p-[3%] text-2xl font-semibold txt-color-lvl-2"
            onClick={() => alert(calender.current?.click())}
          >
            <Calender />
          </button>
        </div>

        <div className="flex ml-[4%]  mr-3 w-full align-middle content-center h-full color-lvl-2 rounded-lg">
          {searchval == "" ? (
            <button className="p-[3%] text-2xl font-semibold w-[40px] txt-color-lvl-1">
              {" "}
              <Search />
            </button>
          ) : (
            <button className="p-[3%] text-xl font-semibold w-[40px] txt-color-lvl-1">
              <ALeft />
            </button>
          )}
          <input
            value={searchval}
            onChange={(e) => setSearchval(e.target.value)}
            type="text"
            className=" rounded-lg ml-2 w-full color-lvl-2 outline-none text-quick-400 txt-color-v-3"
          />
        </div>
      </div>
      <div className="divider p-0 m-0 my-3 color-lvl-2  h-[0.25px] " />

      {/*...........................search results........................... */}
      <div className=" h-full w-full flex flex-col justify-center content-center ">
        <div className="w-full">
          {" "}
          {searchval == "" ? (
            <p className="text-center text-2xl  txt-color-lvl-2 capitalize text-quick-500">
              {" "}
              search for text with Person
            </p>
          ) : (
            <>hello hello</>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchMessages;
