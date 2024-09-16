import { useEffect } from "react";

const ZaloChatWidget = () => {
  useEffect(() => {
    // Inject the Zalo Chat Plugin script into the document
    const script = document.createElement("script");
    script.src = "https://sp.zalo.me/plugins/sdk.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup the script when the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="zalo-chat-widget"
      dangerouslySetInnerHTML={{
        __html: `<div class="zalo-chat-widget" data-oaid="YOUR_OA_ID" data-welcome-message="Xin chào! Rất vui khi được hỗ trợ bạn." data-autopopup="0" data-width="300" data-height="400"></div>`,
      }}
    />
  );
};

export default ZaloChatWidget;
