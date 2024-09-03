import { EmblaOptionsType } from "embla-carousel";
import ExitAnimation from "../../../../component/ExitAnimation";
import { silde } from "../../../../component/ExitAnimation/ExitAnimation";

const OPTIONS: EmblaOptionsType = { loop: true };

const SLIDES: silde[] = [
  {
    properties: {
      src: "/img/home/content1/KAT_BANNER-WEB_CPPM.jpg",
    },
    type: "img",
  },
  {
    properties: {
      src: "/img/home/content1/KAT_BANNER-WEB_OBL.jpg",
    },
    type: "img",
  },
  {
    properties: {
      src: "/img/home/content1/KAT_NEWBRANDING_COVERFB_3-scaled.jpg",
    },
    type: "img",
  },
  {
    properties: {
      src: "/img/home/content1/WEB-BANNER (1).jpg",
    },
    type: "img",
  },
];
const Content1 = () => {
  return (
    <ExitAnimation
      startAnimation={true}
      slideSize="70%"
      slides={SLIDES}
      options={OPTIONS}
      positionAbsolute={true}
    />
  );
};
export default Content1;
