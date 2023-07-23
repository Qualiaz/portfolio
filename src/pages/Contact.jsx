import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import svgCurveUnderline from "../assets/curve-underline.svg";
import useAutoSizeTextArea from "../hooks/useAutosizeTextArea";
import svgSend from "../assets/send.svg";
import svgRequired from "../assets/required.svg";
import useSendMessageToDb from "../hooks/useSendMessageToDb";

const Required = ({ field }) => {
  const [isTextVisible, setIsTextVisible] = useState(false);

  const imgRef = useRef(null);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (imgRef.current && !imgRef.current.contains(event.target)) {
        setIsTextVisible(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  const handleClick = () => {
    setIsTextVisible((prevIsTextVisible) => !prevIsTextVisible);
  };

  return (
    <div className="absolute -left-3.5">
      <img
        ref={imgRef}
        className="hover:cursor-pointer h-6"
        src={svgRequired}
        alt=""
        onMouseEnter={() => setIsTextVisible(true)}
        onMouseLeave={() => setIsTextVisible(false)}
        onClick={handleClick}
      />
      {isTextVisible && (
        <div className="absolute font-semibold bg-required rounded-md -top-10 p-2 text-sm text-white w-40 z-50">
          {field}
        </div>
      )}
    </div>
  );
};

const Contact = () => {
  const [view, setView] = useState("message"); // message or info
  const [viewMessage, setViewMessage] = useState("messageBox"); // messageBox / clientInfo / messageSent
  const [isShouldAnimate, setIsShouldAnimate] = useState(false);
  const [height, setHeight] = useState(10);
  const [isMsgBtnPressed, setIsMsgBtnPressed] = useState(false);
  const [message, setMessage] = useState("");
  const [client, setClient] = useState({});
  const [isClientInfoBtnPressed, setIsClientInfoBtnPressed] = useState(false);
  const [sendMessage, error] = useSendMessageToDb();

  const textareaRef = useRef();
  const [value, setValue] = useState("");

  const handleTouchMove = (event) => {
    event.preventDefault();
  };

  useAutoSizeTextArea(textareaRef.current, value, setHeight);

  const handleChangeMessage = (e) => {
    e.preventDefault();
    setValue(e.target?.value);
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // send to db
    client.message = message;
    console.log(client);
    sendMessage(client);
  };

  const handleClientChanges = (e) => {
    const { name, value } = e.target;
    setClient((prevClient) => ({ ...prevClient, [name]: value }));
  };

  const isMessageValid = () => {
    return !!(message.length >= 30);
  };

  const isEmailValid = () => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+$/;
    return emailRegex.test(client.email);
  };

  const isClientInfoValid = () => {
    if (
      !isMessageValid() ||
      !client.firstName ||
      !client.lastName ||
      !isEmailValid()
    )
      return false;
    return true;
  };

  const handleFocus = (e) => {
    e.preventDefault();
  };

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
      <div className="flex justify-center relative ">
        <motion.button
          initial={{ zIndex: 2 }}
          animate={{
            y: view === "message" ? 5 : 0,
            x: 1,
            zIndex: view === "message" ? 2 : 1,
          }}
          className="flex z-10 items-center justify-center rounded-md rounded-br-none bg-white text-black w-24 h-10"
          onClick={() => {
            setView("message");
            setIsShouldAnimate(false);
            console.log(isShouldAnimate);
          }}
        >
          <div>
            <span className="font-bold text-black">Message</span>
          </div>
        </motion.button>

        <motion.button
          initial={{ zIndex: 1 }}
          animate={{
            y: view === "info" ? 5 : 0,
            x: -1,
            zIndex: view === "info" ? 2 : 1,
          }}
          className="flex  items-center justify-center rounded-md rounded-bl-none bg-orange text-black w-24 h-10"
          onClick={() => {
            setView("info");
            setIsShouldAnimate(false);
            console.log(isShouldAnimate);
          }}
        >
          <div>
            <span className="font-bold text-white">Info</span>
          </div>
        </motion.button>
      </div>
      <AnimatePresence>
        {view === "message" && (
          <motion.div
            key="view-message"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.4 } }}
            exit={{ y: 10, opacity: 0, transition: 0.3 }}
            className="m-2"
          >
            <form onSubmit={handleSubmit}>
              <AnimatePresence>
                {viewMessage === "messageBox" && (
                  <motion.div
                    key="message-box"
                    initial={{ x: 0, opacity: 1 }}
                    animate={
                      isShouldAnimate === true
                        ? { x: 0, opacity: 1, transition: { delay: 0.6 } }
                        : { x: 0, opacity: 1 }
                    }
                    exit={{ x: -100, opacity: 0 }}
                    transition={{
                      ease: "easeInOut",
                    }}
                    className="relative"
                  >
                    <motion.textarea
                      ref={textareaRef}
                      className=" bg-slate-100 w-full rounded-md p-2 pr-10 focus:outline outline-orange overflow-hidden"
                      placeholder="Write something here... (name,prename and email will be asked after you send)"
                      onChange={handleChangeMessage}
                    ></motion.textarea>
                    <button
                      type="button"
                      onClick={() => {
                        if (isMessageValid()) {
                          setIsShouldAnimate(true);
                          viewMessage === "messageBox"
                            ? setViewMessage("clientInfo")
                            : setViewMessage("messageSent");
                        }
                        setIsMsgBtnPressed(true);
                      }}
                      className="absolute bottom-2.5 right-2"
                    >
                      <img src={svgSend} alt="send message button" />
                    </button>
                    {!isMessageValid() && isMsgBtnPressed && (
                      <span className="absolute -bottom-6 text-red-600 font-semibold left-0">
                        * Please write at least 30 characters
                      </span>
                    )}
                  </motion.div>
                )}
                {viewMessage === "clientInfo" && (
                  <motion.div
                    key="client-info"
                    initial={{ x: 100, opacity: 0 }}
                    animate={
                      isShouldAnimate === true
                        ? { x: 0, opacity: 1, transition: { delay: 0.6 } }
                        : { x: 0, opacity: 1 }
                    }
                    exit={{ x: -100, opacity: 0 }}
                    transition={{
                      ease: "easeInOut",
                    }}
                    className="flex p-2 flex-col gap-2 h-48 bg-white rounded-md relative"
                  >
                    <div className="flex justify-between">
                      <label
                        htmlFor="firstName"
                        className="font-bold min-w-fit w-44 ml-2"
                      >
                        First name <span className="text-required">*</span>
                      </label>
                      {isClientInfoBtnPressed && !client.firstName && (
                        <Required field="First name is required" />
                      )}
                      <input
                        onChange={handleClientChanges}
                        name="firstName"
                        className="border-b-4 border-b-orange w-full  focus:outline-none"
                      />
                    </div>
                    <div className="flex justify-between">
                      <label
                        htmlFor="lastName"
                        className="font-bold min-w-fit w-44 ml-2 "
                      >
                        Last name <span className="text-required">*</span>
                      </label>
                      {isClientInfoBtnPressed && !client.lastName && (
                        <Required field="Last name is required" />
                      )}
                      <input
                        onChange={handleClientChanges}
                        name="lastName"
                        className="border-b-4 border-b-orange w-full  focus:outline-none self-end"
                      />
                    </div>
                    <div className="flex justify-between">
                      <label
                        htmlFor="email"
                        className="font-bold min-w-fit w-44 ml-2"
                      >
                        Email <span className="text-required">*</span>
                      </label>
                      {isClientInfoBtnPressed && !client.email && (
                        <Required field={"Email is required"} />
                      )}
                      {isClientInfoBtnPressed && !isEmailValid() && (
                        <Required field={"Email is not valid"} />
                      )}
                      <input
                        onChange={handleClientChanges}
                        name="email"
                        className="border-b-4 border-b-orange w-full  focus:outline-none"
                      />
                    </div>
                    <div className="flex justify-between">
                      <label
                        htmlFor="number"
                        className="font-bold min-w-fit w-44 ml-2"
                      >
                        Number
                      </label>
                      <input
                        onChange={handleClientChanges}
                        name="number"
                        className="border-b-4 border-b-orange w-full focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      onClick={() => {
                        if (isClientInfoValid()) {
                          setIsShouldAnimate(true);
                          viewMessage === "messageBox"
                            ? setViewMessage("clientInfo")
                            : setViewMessage("messageSent");
                        }
                        setIsClientInfoBtnPressed(true);
                      }}
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
                    animate={
                      isShouldAnimate === true
                        ? { x: 0, opacity: 1, transition: { delay: 0.6 } }
                        : { x: 0, opacity: 1 }
                    }
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ ease: "easeInOut" }}
                  >
                    <p className="text-black font-semibold">
                      Your message has been sent. <br /> I'll get back to you
                      shortly!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        )}
        {view === "info" && (
          <motion.div
            key="view-info"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.4 } }}
            exit={{ y: 10, opacity: 0, transition: 0.3 }}
            className="flex flex-col justify-center h-32 bg-orange rounded-md m-2"
          >
            <span className="ml-10 font-semibold text-white">
              Robert Apostoiu
            </span>
            <span className="ml-10 font-semibold text-white">
              qualiaz@protonmail.com
            </span>
            <span className="ml-10 font-semibold text-white">
              +40 799483823
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;
