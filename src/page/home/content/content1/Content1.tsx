import { EmblaOptionsType } from "embla-carousel";
import ExitAnimation from "../../../../component/ExitAnimation";
import { silde } from "../../../../component/ExitAnimation/ExitAnimation";

const OPTIONS: EmblaOptionsType = { loop: true };

const SLIDES: silde[] = [
  {
    properties: {
      src: "/img/view/view1.jpg",
    },
    type: "img",
  },
  {
    properties: {
      src: "/img/view/view5.jpg",
    },
    type: "img",
  },
  {
    properties: {
      src: "/img/view/view6.jpg",
    },
    type: "img",
  },
  {
    properties: {
      src: "/img/view/view9.jpg",
    },
    type: "img",
  },
];
const Content1 = () => {
  return (
    <ExitAnimation
      startAnimation={true}
      slideSize="100%"
      slides={SLIDES}
      options={{
        ...OPTIONS,
        breakpoints: {
          "(max-width: 640px)": { slidesToScroll: 1 },
          "(min-width: 641px) and (max-width: 768px)": {
            slidesToScroll: 1,
          },
          "(min-width: 769px)": { slidesToScroll: 1 },
        },
      }}
      positionAbsolute={true}
    />
  );
};
export default Content1;
