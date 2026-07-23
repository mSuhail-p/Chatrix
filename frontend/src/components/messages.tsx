
// import { useState, useRef, useEffect } from "react";
// import socket from "../socket.io";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { RiAttachment2 } from "react-icons/ri";
// import { LuSend } from "react-icons/lu";
// import type { Messages, chatSection } from "../interfaces/home.ts";

// import "./messages.css";
// const Messages = ({ user }: chatSection) => {
//   const reff = useRef<HTMLTextAreaElement>(null);
//   const [message, setMessage] = useState<Messages[]>([]);

//   const handleSendMessage = () => {
//     const message = reff.current?.value;
//     console.log(reff.current?.value, "reff current value");
//     if (message?.trim() !== "" && message != undefined) {
//       socket.emit("chatMessage", message);
//       setMessage((prev) => [...prev, { id: "sender", text: message }]);
//       if (reff.current) {
//         reff.current.value = "";
//       }
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (e.key == "Enter") {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   useEffect(() => {
//     console.log("inside the useEffect");
//     socket.on("chat message", (msg) => {
//       console.log(msg, "it is recieved message");
//       setMessage((prev) => [...prev, { id: "receiver", text: msg }]);
//     });

//     return () => {
//       socket.off("chat message");
//     };
//   }, [socket]);

//   return (
//     <div className="bg-[#182620] flex flex-col h-full">
//       {/* Header */}
//       <div className="w-full h-16 bg-[#14201C] border-b border-[#26352f] flex justify-between items-center px-4">
//         <div className="flex gap-3 items-center">
//           <div className="w-11 h-11 bg-[#D8A34D] rounded-full flex items-center justify-center text-[#14201C] font-medium">
//             {user.name?.charAt(0).toUpperCase()}
//           </div>
//           <p className="font-medium text-lg text-[#EDEDE4]">{user.name}</p>
//         </div>

//         <BsThreeDotsVertical className="text-xl cursor-pointer text-[#6B7A72] hover:text-[#EDEDE4] transition-colors" />
//       </div>

//       {/* messages */}
//       <div className="mes-scrollbar flex-1 bg-[#182620] overflow-y-auto">
//         <div className="flex flex-col gap-2 p-3">
//           {message.map((message, index) => {
//             return (
//               <div
//                 key={index}
//                 className={`flex break-words lg:max-w-[500px] md:max-w-[400px] sm:max-w-[300px] max-w-[200px] p-2.5
//                  ${
//                    message.id === "sender"
//                      ? "self-end bg-[#D8A34D] text-[#14201C] rounded-2xl rounded-br-sm"
//                      : "self-start bg-[#24352C] text-[#EDEDE4] rounded-2xl rounded-bl-sm"
//                  }`}
//               >
//                 <div className="w-full flex flex-col gap-1.5 break-words">
//                   <p className="text-sm break-words">{message.text}</p>
//                   <div className="flex flex-col self-end">
//                     <p
//                       className={`text-[10px] text-right ${
//                         message.id === "sender"
//                           ? "text-[#14201C]/60"
//                           : "text-[#6B7A72]"
//                       }`}
//                     >
//                       10:30 AM
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* input section */}
//       <div className="max-w-full h-14 bg-[#14201C] border-t border-[#26352f] flex items-center justify-between px-5 gap-3">
//         <div className="w-full flex items-center gap-4 text-xl cursor-pointer text-[#6B7A72]">
//           <RiAttachment2 className="hover:text-[#D8A34D] transition-colors" />

//           <textarea
//             ref={reff}
//             id="input-message"
//             className="w-full h-6 text-sm text-[#EDEDE4] outline-0 placeholder:text-[#6B7A72] placeholder:text-sm resize-none bg-transparent"
//             placeholder="Type a message"
//             onKeyDown={handleKeyDown}
//           ></textarea>
//         </div>
//         <div
//           className="w-9 h-9 rounded-full bg-[#D8A34D] flex items-center justify-center cursor-pointer flex-shrink-0 hover:opacity-90 transition-opacity"
//           onClick={handleSendMessage}
//         >
//           <LuSend className="text-base text-[#14201C]" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Messages;



import { useState, useRef, useEffect } from "react";
import socket from "../socket.io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiAttachment2 } from "react-icons/ri";
import { LuSend } from "react-icons/lu";
import { IoMdArrowBack } from "react-icons/io";
import type { Messages, chatSection } from "../interfaces/home.ts";

import "./messages.css";
const Messages = ({ user, onBack }: chatSection) => {
  const reff = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState<Messages[]>([]);

  const handleSendMessage = () => {
    const message = reff.current?.value;
    console.log(reff.current?.value, "reff current value");
    if (message?.trim() !== "" && message != undefined) {
      socket.emit("chatMessage", message);
      setMessage((prev) => [...prev, { id: "sender", text: message }]);
      if (reff.current) {
        reff.current.value = "";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key == "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    console.log("inside the useEffect");
    socket.on("chat message", (msg) => {
      console.log(msg, "it is recieved message");
      setMessage((prev) => [...prev, { id: "receiver", text: msg }]);
    });

    return () => {
      socket.off("chat message");
    };
  }, [socket]);

  return (
    <div className="bg-[#182620] flex flex-col h-full w-full">
      {/* Header */}
      <div className="w-full h-16 bg-[#14201C] border-b border-[#26352f] flex justify-between items-center px-3 md:px-4">
        <div className="flex gap-2 md:gap-3 items-center min-w-0">
          <IoMdArrowBack
            className="text-2xl text-[#EDEDE4] cursor-pointer md:hidden flex-shrink-0"
            onClick={onBack}
          />
          <div className="w-11 h-11 bg-[#D8A34D] rounded-full flex items-center justify-center text-[#14201C] font-medium flex-shrink-0">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <p className="font-medium text-lg text-[#EDEDE4] truncate">
            {user.name}
          </p>
        </div>

        <BsThreeDotsVertical className="text-xl cursor-pointer text-[#6B7A72] hover:text-[#EDEDE4] transition-colors flex-shrink-0" />
      </div>

      {/* messages */}
      <div className="mes-scrollbar flex-1 bg-[#182620] overflow-y-auto">
        <div className="flex flex-col gap-2 p-2 md:p-3">
          {message.map((message, index) => {
            return (
              <div
                key={index}
                className={`flex break-words lg:max-w-[500px] md:max-w-[400px] sm:max-w-[300px] max-w-[75%] p-2.5
                 ${
                   message.id === "sender"
                     ? "self-end bg-[#D8A34D] text-[#14201C] rounded-2xl rounded-br-sm"
                     : "self-start bg-[#24352C] text-[#EDEDE4] rounded-2xl rounded-bl-sm"
                 }`}
              >
                <div className="w-full flex flex-col gap-1.5 break-words">
                  <p className="text-sm break-words">{message.text}</p>
                  <div className="flex flex-col self-end">
                    <p
                      className={`text-[10px] text-right ${
                        message.id === "sender"
                          ? "text-[#14201C]/60"
                          : "text-[#6B7A72]"
                      }`}
                    >
                      10:30 AM
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* input section */}
      <div className="max-w-full h-14 bg-[#14201C] border-t border-[#26352f] flex items-center justify-between px-3 md:px-5 gap-2 md:gap-3">
        <div className="w-full flex items-center gap-3 md:gap-4 text-xl cursor-pointer text-[#6B7A72]">
          <RiAttachment2 className="hover:text-[#D8A34D] transition-colors flex-shrink-0" />

          <textarea
            ref={reff}
            id="input-message"
            className="w-full h-6 text-sm text-[#EDEDE4] outline-0 placeholder:text-[#6B7A72] placeholder:text-sm resize-none bg-transparent"
            placeholder="Type a message"
            onKeyDown={handleKeyDown}
          ></textarea>
        </div>
        <div
          className="w-9 h-9 rounded-full bg-[#D8A34D] flex items-center justify-center cursor-pointer flex-shrink-0 hover:opacity-90 transition-opacity"
          onClick={handleSendMessage}
        >
          <LuSend className="text-base text-[#14201C]" />
        </div>
      </div>
    </div>
  );
};

export default Messages;