import React from "react";

const TikTokData = (data) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: generateIframe(data.id),
      }}
      className="my-2"
    ></div>
  );
};

const generateIframe = (id) => {
  return `
  <iframe
    style="
      width: 100%;
      height: 739px;
      display: block;
      visibility: unset;
      max-height: 739px;
    "
    name="__tt_embed__v58417145012895540"
    sandbox="allow-popups allow-popups-to-escape-sandbox allow-scripts allow-top-navigation allow-same-origin"
    src="https://www.tiktok.com/embed/v2/${id}?lang=en-US&embedFrom=oembed"
  ></iframe>
  `;
};

export default TikTokData;
