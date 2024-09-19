import { animated, useSpring } from "@react-spring/web";
import { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { cn } from "../../../../utils/helper/class.helper";
import { Typography } from "antd";
import { usePagination } from "../../../../hook/helpers/usePagination.hook";
import { getMenusProduct } from "../../../../services/product.service";

const MenuBook = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [translate, apiAction] = useSpring(() => ({
    transform: "translateX(0px)",
    config: { tension: 200, friction: 20 },
  }));

  const { data: listMenus } = usePagination(
    "list-menu-product",
    {},
    getMenusProduct
  );
  const dataSort = listMenus?.sort((a: any, b: any) => a.index < b.index);
  return (
    <animated.div
      className="flex  justify-center align-center mt-10"
      style={translate}
    >
      <HTMLFlipBook
        width={800}
        height={650}
        className="demoBook h-full "
        style={{}}
        startPage={1}
        size="fixed"
        drawShadow={true}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        onFlip={(e) => {
          // console.log("flip");
          // console.log(e.data === 0);
          // setOnePage(e.data === 0);
          audioRef?.current?.play();
          if (e.data === 0) {
            apiAction.start({
              transform: "translateX(-360px)",
              config: { tension: 200, friction: 20 },
            });
            return;
          }
          if (e.data == listMenus?.length - 1) {
            apiAction.start({
              transform: "translateX(300px)",
              config: { tension: 200, friction: 20 },
            });
            return;
          }
          apiAction.start({
            transform: "translateX(0px)",
            config: { tension: 200, friction: 20 },
          });
          // // api.start({ transform: "translateX(10px)" });
        }}
        minWidth={200}
        maxWidth={800}
        minHeight={650}
        maxHeight={700}
        flippingTime={1}
        usePortrait={true}
        startZIndex={1}
        autoSize={true}
        clickEventForward={true}
        useMouseEvents={true}
        swipeDistance={100}
        showPageCorners={true}
        disableFlipByClick={true}
      >
        {dataSort?.map((image: any) => (
          <div
            key={image.index}
            // style={props}
            className="demoPage text-black bg-[#e6e4d1] p-10 flex justify-center items-center object-contain"
          >
            <img src={image.image} className="h-full object-fill" />
            {image.index === 0 ||
            image.index === listMenus?.length - 1 ? null : (
              <div
                className={cn(
                  "flex justify-start",
                  image.index % 2 !== 0 && "justify-end"
                )}
              >
                <Typography.Text className="text-sm font-semibold">
                  {image.index}
                </Typography.Text>
              </div>
            )}
          </div>
        ))}
      </HTMLFlipBook>

      <audio ref={audioRef} hidden>
        <source src="audios/sound-page-flip.mp3" type="audio/mpeg" />
        <p>Your browser does not support the audio element.</p>
      </audio>
    </animated.div>
  );
};

export default MenuBook;
