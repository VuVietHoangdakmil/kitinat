import { useInView } from "react-intersection-observer";

const useInViewCustom = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Chỉ kích hoạt một lần khi vào viewport
    threshold: 0.1, // Tỉ lệ phần tử phải vào viewport để kích hoạt
  });
  return { ref, inView };
};
export default useInViewCustom;
