import React, { useCallback, useEffect, useRef } from "react";
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel";
import { DotButton, useDotButton } from "./DotButton";
import { PrevButton, NextButton, usePrevNextButtons } from "./ArrowButton";
import useEmblaCarousel from "embla-carousel-react";
import { useTransition, animated, useSpringRef } from "@react-spring/web";
import { useNavigate } from "react-router-dom";

import "./index.css";
type properties = {
  src?: string;
  content?: {
    content1?: string;
    content2?: string;
    content3?: string;
    content4?: string;
  };
  link?: string;
};
export type silde = { type: "img" | "content"; properties: properties };

type PropType = {
  slides: silde[];
  options?: EmblaOptionsType;
  hiddenArrow?: boolean;
  hiddenDot?: boolean;
  slideSize: "100%" | "70%" | "100%/3";
  positionAbsolute?: boolean;
  startAnimation?: boolean;
  isboxBtn?: boolean;
};
const TWEEN_FACTOR_BASE = 0.84;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);
const EmblaCarousel: React.FC<PropType> = (props) => {
  const navigate = useNavigate();
  const {
    positionAbsolute,
    slides,
    options,
    hiddenArrow,
    hiddenDot,
    slideSize,
    startAnimation,
    isboxBtn,
  } = props;
  const transRef = useSpringRef();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    slideSize === "100%/3" ? { ...options, align: "start" } : options
  );
  const tweenFactor = useRef(0);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);
  const tweenOpacity = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
          const opacity = numberWithinRange(tweenValue, 0, 1).toString();
          emblaApi.slideNodes()[slideIndex].style.opacity = opacity;
        });
      });
    },
    []
  );

  const transitions = useTransition(null, {
    ref: transRef,
    keys: null,
    from: { opacity: 0, transform: "translate3d(0,-100%,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    //leave: { opacity: 0, transform: "translate3d(0,100%,0)" },
    config: { duration: 600 },
  });
  useEffect(() => {
    if (slideSize !== "70%") {
      return;
    }
    if (!emblaApi) return;

    setTweenFactor(emblaApi);
    tweenOpacity(emblaApi);
    emblaApi
      .on("reInit", setTweenFactor)
      .on("reInit", tweenOpacity)
      .on("scroll", tweenOpacity)
      .on("slideFocus", tweenOpacity);
  }, [emblaApi, tweenOpacity]);

  useEffect(() => {
    const id = setInterval(() => {
      onNextButtonClick();
    }, 30000);
    return () => clearInterval(id);
  }, [emblaApi]);
  useEffect(() => {
    if (startAnimation) transRef.start();
  }, []);
  const element = (
    <div className={`embla ${isboxBtn && "box-button"}`}>
      <div
        style={{ display: "flex", alignItems: "center", position: "relative" }}
      >
        {hiddenArrow || (
          <PrevButton
            // style={{ position: "absolute", zIndex: 999, width: "50px" }}
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
          />
        )}
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {slides.map(({ type, properties }, index) => (
              <div
                className={`embla_main ${
                  slideSize === "70%"
                    ? "embla__slide-70"
                    : slideSize === "100%"
                    ? "embla__slide-100"
                    : "embla__slide-lg"
                }`}
                key={index}
              >
                {type === "img" ? (
                  <img
                    className="embla__slide__img"
                    src={properties?.src}
                    loading="lazy"
                    style={{ height: "500px" }}
                    alt=""
                  />
                ) : (
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(properties.link ?? "")}
                  >
                    <img
                      className="embla__slide__img"
                      style={{ height: "500px", borderRadius: "10px" }}
                      src={properties?.src}
                    />
                    <div>
                      <div
                        style={{
                          backgroundColor: "#1abc9c",
                          width: "150px",
                          marginTop: "10px",
                          padding: "2px 4px",
                        }}
                      >
                        {properties?.content?.content1}
                      </div>
                      <h3 style={{ color: "#444" }}>
                        {properties?.content?.content2}
                      </h3>
                      <div style={{ color: "#7A7A7A" }}>
                        {properties?.content?.content3}
                      </div>
                      <h4 style={{ color: "#7A7A7A" }}>
                        {properties?.content?.content4}
                      </h4>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {hiddenArrow || (
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        )}
      </div>
      {hiddenDot || (
        <div
          className={`${
            positionAbsolute ? "position-absolute" : ""
          } embla__dots`}
        >
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`embla__dot
      ${index === selectedIndex ? "embla__dot--selected" : ""}
    `}
            />
          ))}
        </div>
      )}
    </div>
  );
  if (!startAnimation) {
    return element;
  }
  return transitions((style) => {
    return <animated.div style={style}>{element}</animated.div>;
  });
};

export default EmblaCarousel;
