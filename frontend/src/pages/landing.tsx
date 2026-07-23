import { IoMdSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { BsChatDotsFill } from "react-icons/bs";
import { users } from "../sample";
import ChatSection from "../components/messages";
import type { User } from "../interfaces/home";

import "./landing.css";
import { useState } from "react";
const Landing = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  return (
    <div className="flex w-screen h-[100dvh] overflow-hidden">
      <div
        className={`${
          selectedUser ? "hidden" : "flex"
        } md:flex w-full md:w-[360px] md:flex-none flex-col gap-6 px-4 bg-[#14201C] border-r-2 border-[#26352f] relative`}
      >
        <div className="flex flex-col gap-7">
          <div className="flex justify-between items-center ">
            <h4 className="text-white font-bold text-2xl pt-2 font-sans">
              CHATRIX
            </h4>
            <div className="w-10 h-9 bg-[#26352f] rounded-full relative  flex items-center justify-center mt-3 mr-3 cursor-pointer ">
              <FaPlus className=" text-[#D8A34D]" />
            </div>
          </div>
          <div className="w-full h-10 rounded  bg-[#182620] flex items-center pl-2 text-gray-500">
            {/* seach icon */}
            <IoMdSearch className="text-2xl" />
            <input
              className="outline-0 pl-2 placeholder:text-gray-500 "
              type="text"
              name="search"
              placeholder="Search"
            />
          </div>
        </div>
        {/* listing the users */}
        <div className="scrollable flex flex-col gap-3 ">
          {users.map((user, index) => {
            return (
              <div
                key={index}
                onClick={() => setSelectedUser(user)}
                className="flex h-[68px] justify-between w-full items-center cursor-pointer  hover:bg-[rgba(216,163,77,0.14)] rounded"
              >
                <div className="flex  gap-2 items-center">
                  <div className="w-[60px] h-[60px] bg-black rounded-full" />
                  <div>
                    <p className=" text-gray-300 text-xl">{user.name}</p>
                    <p className="text-gray-500">hai, how are you </p>
                  </div>
                </div>
                <p className="mr-3 text-gray-500">30m</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`${selectedUser ? "flex" : "hidden"} md:flex flex-1`}>
        {selectedUser ? (
          <ChatSection
            user={selectedUser}
            onBack={() => setSelectedUser(null)}
          />
        ) : (
          <div className="w-full h-full bg-[#182620]">
            <div className="w-full h-full flex items-center justify-center bg-[#182620]">
              <div className="flex flex-col items-center gap-3 bg-[#1E2E27] rounded-2xl px-10 py-8 border border-[#26352f]">
                <BsChatDotsFill className="text-4xl text-[#D8A34D]" />
                <p className="text-gray-300 text-lg font-medium">
                  No chat selected
                </p>
                <p className="text-gray-500 text-sm">
                  Pick someone from the list to start chatting
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;
