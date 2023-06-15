import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import svgCurveUnderline from "../assets/curve-underline.svg";
import useAutoSizeTextArea from "../hooks/useAutosizeTextArea";
import svgSend from "../assets/send.svg";

const Contact = () => {
  const [view, setView] = useState("message"); // message or info
  const [viewMessage, setViewMessage] = useState("messageBox"); // messageBox / clientInfo / messageSent

  const [height, setHeight] = useState(10);
  const ref = useRef();
  const [value, setValue] = useState("");

  useAutoSizeTextArea(ref.current, value, setHeight);
  const handleChange = (e) => setValue(e.target?.value);

  useEffect(() => {
    console.log(viewMessage);
  }, [viewMessage]);

  return (
    <div className="flex flex-col m-2 gap-6">
      <div className="relative flex flex-col m-2">
        <span className="text-white font-bold text-2xl ml-2">Contact</span>
        <img
          className="absolute w-28 top-5 -z-10"
          src={svgCurveUnderline}
          alt=""
        />
      </div>
      <>
        <div className="m-2">
          <AnimatePresence>
            {viewMessage === "messageBox" && (
              <motion.div
                key="message-box"
                initial={{ x: 0, opacity: 1 }}
                animate={{ x: 0, opacity: 1, transition: { delay: 0.6 } }}
                exit={{ x: -100, opacity: 0 }}
                transition={{
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <motion.textarea
                  ref={ref}
                  className="bg-slate-100 w-full rounded-md p-2 pr-10 focus:outline outline-orange overflow-hidden"
                  name=""
                  id=""
                  placeholder="Write something here... (name,prename and email will be asked after you send)"
                  onChange={handleChange}
                ></motion.textarea>
                <button
                  onClick={() =>
                    viewMessage === "messageBox"
                      ? setViewMessage("clientInfo")
                      : setViewMessage("messageSent")
                  }
                  className="absolute bottom-2.5 right-2"
                >
                  <img src={svgSend} alt="send message button" />
                </button>
              </motion.div>
            )}
            {viewMessage === "clientInfo" && (
              <motion.div
                key="client-info"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { delay: 0.6 } }}
                exit={{ x: -100, opacity: 0 }}
                transition={{
                  ease: "easeInOut",
                }}
                className="flex p-2 flex-col gap-2 h-48  bg-white rounded-md relative"
              >
                <div className="flex justify-between">
                  <label className="font-bold min-w-fit w-44" htmlFor="">
                    First name *
                  </label>
                  <input className="border-b-4 border-b-orange w-full  focus:outline-none" />
                </div>
                <div className="flex justify-between">
                  <label className="font-bold min-w-fit w-44 " htmlFor="">
                    Last name *
                  </label>
                  <input className="border-b-4 border-b-orange w-full  focus:outline-none self-end" />
                </div>
                <div className="flex justify-between">
                  <label className="font-bold min-w-fit w-44" htmlFor="">
                    Email *
                  </label>
                  <input
                    required
                    className="border-b-4 border-b-orange w-full  focus:outline-none"
                  />
                </div>
                <div className="flex justify-between">
                  <label className="font-bold min-w-fit w-44" htmlFor="">
                    Number
                  </label>
                  <input className="border-b-4 border-b-orange w-full focus:outline-none" />
                </div>
                <button
                  onClick={() =>
                    viewMessage === "messageBox"
                      ? setViewMessage("clientInfo")
                      : setViewMessage("messageSent")
                  }
                  className="absolute bottom-2.5 right-2"
                >
                  <img src={svgSend} alt="send message button" />
                </button>
              </motion.div>
            )}
            {viewMessage === "messageSent" && (
              <motion.div
                className="flex justify-center items-center p-2 flex-col gap-2 h-16 bg-white rounded-md"
                key="message-sent"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { delay: 0.6 } }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ ease: "easeInOut" }}
              >
                <p className="text-black font-semibold">
                  Your message has been sent! <br /> I will get back to you
                  shortly!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </>
    </div>
  );
};

export default Contact;
