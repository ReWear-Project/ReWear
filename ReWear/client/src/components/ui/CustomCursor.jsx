import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [variant, setVariant] = useState("default");
  const [label, setLabel] = useState("");
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    // Disable cursor on mobile
    if (window.innerWidth < 768) {
      setIsDesktop(false);
      return;
    }

    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest("[data-cursor]");

      if (target) {
        setVariant("hover");
        setLabel(target.getAttribute("data-cursor"));
      } else {
        setVariant("default");
        setLabel("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!isDesktop) return null;

  const variants = {
    default: {
      width: 16,
      height: 16,
      x: position.x - 8,
      y: position.y - 8,
      backgroundColor: "rgba(99,102,241,0.7)"
    },
    hover: {
      width: 80,
      height: 80,
      x: position.x - 40,
      y: position.y - 40,
      backgroundColor: "rgba(99,102,241,0.95)"
    }
  };

  return (
    <motion.div
      animate={variant}
      variants={variants}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full flex items-center justify-center text-white font-semibold"
    >
      {variant === "hover" && (
        <div className="flex flex-col items-center gap-1">

          {/* CLOTH ICON (T-shirt) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M4 7l4-3h8l4 3-2 4-2-1v9H8v-9l-2 1-2-4z" />
          </svg>

          {/* LABEL */}
          {label && (
            <span className="text-[10px] tracking-wide">
              {label}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default CustomCursor;