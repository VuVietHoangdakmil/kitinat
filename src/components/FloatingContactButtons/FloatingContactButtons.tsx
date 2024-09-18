import { animated, useSpring } from "@react-spring/web";
import { useState } from "react";
import { FaComment, FaFacebookF, FaPhoneAlt } from "react-icons/fa";
import { SiZalo } from "react-icons/si"; // Zalo icon from react-icons/si
// import "./FloatingContactButtons.css"; // Import the CSS file for animations
import { useInfo } from "../provider/InfoProvider";
const FloatingContactButtons = () => {
  const { info } = useInfo();
  const [showButtons, setShowButtons] = useState(false);
  // Animation for the buttons
  const buttonAnimation = useSpring({
    opacity: showButtons ? 1 : 0,
    transform: showButtons ? "translateY(0)" : "translateY(20px)",
    config: { tension: 300, friction: 20 },
  });

  const toggleButtons = () => {
    setShowButtons((prev) => !prev);
  };

  return (
    <animated.div className="fixed bottom-10 right-5 flex flex-col space-y-4">
      {/* Floating Contact Buttons */}
      <animated.div style={buttonAnimation} className={" flex flex-col gap-4"}>
        <a
          href={`tel:${info?.phoneNumber}`}
          className="bg-red-500 p-4 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 hover:opacity-90"
          aria-label="Phone"
        >
          <FaPhoneAlt className="text-white text-xl" />
        </a>

        <a
          href={info?.urlFacebook}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 p-4 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 hover:opacity-90"
          aria-label="Facebook"
        >
          <FaFacebookF className="text-white text-xl" />
        </a>

        <a
          href={info?.urlZalo} // Replace with actual Zalo link
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 p-4 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 hover:opacity-90"
          aria-label="Zalo"
        >
          <SiZalo className="text-white text-xl" />
        </a>
      </animated.div>
      <div
        onClick={toggleButtons}
        className="bg-gray-500 p-4 rounded-full shadow-lg cursor-pointer transition-transform duration-300 hover:scale-110 hover:opacity-90"
        aria-label="Message"
      >
        <FaComment className="text-white text-xl" />
      </div>
    </animated.div>
  );
};

export default FloatingContactButtons;
