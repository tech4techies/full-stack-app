/** @format */

import React from "react";

function ExtraStyle() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
      .css-1bla2eh:hover {
        -moz-box-shadow: 0 4px 4px 0 #ba9127, 0 6px 6px 0 #ba9127;
        -webkit-box-shadow: 0 4px 8px 0 #ba9127, 0 6px 6px 0 #ba9127;
        box-shadow: 0 4px 4px 0 #ba9127;
      }
    `,
      }}
    />
  );
}

export default ExtraStyle;
