import { useEffect } from "react";

const useScroll = (handleScroll: () => void) => {
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
};
export default useScroll;
