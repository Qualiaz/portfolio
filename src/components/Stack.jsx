import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import svgHtml from "../assets/html.svg";
import svgCss from "../assets/css.svg";
import svgScss from "../assets/scss.svg";
import svgTailwind from "../assets/tailwindcss.svg";
import svgReact from "../assets/react.svg";
import svgJavascript from "../assets/javascript.svg";
import svgTypescript from "../assets/typescript.svg";
import svgFirebase from "../assets/firebase.svg";

const Stack = ({ stack }) => {
  const [showStack, setShowStack] = useState(false);
  const [imgsCurrentStack, setImgsCurrentStack] = useState([]);

  const addClass = (image, ...classes) => {
    image;
  };

  useEffect(() => {
    const stackArr = [...new Set(stack.split(", "))];
    const tempImgs = [];
    stackArr.forEach((item) => {
      switch (item) {
        case "html":
          tempImgs.push(svgHtml);
          break;
        case "css":
          tempImgs.push(svgCss);
          break;
        case "scss":
          tempImgs.push(svgScss);
          tempImgs.push({ src: svgScss, className: "mr-1" });
          break;
        case "tailwind":
          tempImgs.push(svgTailwind);
          break;
        case "javascript":
          tempImgs.push(svgJavascript);
          tempImgs.push({ src: svgJavascript, className: "mr-2" });
          break;
        case "typescript":
          tempImgs.push(svgTypescript);
          tempImgs.push({ src: svgTypescript, className: "mr-1" });
          break;
        case "react":
          tempImgs.push(svgReact);
          tempImgs.push({ src: svgReact, className: "mr-2" });
          break;
        case "firebase":
          tempImgs.push(svgFirebase);
          break;
        default:
          console.log("showing content");
      }
    });
    setImgsCurrentStack(tempImgs);
  }, [showStack]);

  return (
    <div className="relative">
      <motion.button
        animate={{ width: "auto" }}
        onClick={() => setShowStack(!showStack)}
        className="bg-orange text-white font-bold p-3 rounded-md"
      >
        {showStack ? (
          <div className="flex">
            {imgsCurrentStack.map((img, index) => (
              <img key={index} src={img} alt="" className={img.className} />
            ))}
          </div>
        ) : (
          "stack"
        )}
      </motion.button>
    </div>
  );
};
export default Stack;
