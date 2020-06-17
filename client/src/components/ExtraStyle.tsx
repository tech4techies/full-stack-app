/** @format */

import React from "react";

function ExtraStyle() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
      .chaathra-app {
          background-color: #eff3f6;
          width: 100%;
          height: 100vh;
      }
      .css-1bla2eh:hover {
        -moz-box-shadow: 0 4px 4px 0 #ba9127, 0 6px 6px 0 #ba9127;
        -webkit-box-shadow: 0 4px 8px 0 #ba9127, 0 6px 6px 0 #ba9127;
        box-shadow: 0 4px 4px 0 #ba9127;
      }
      .css-79elbk .css-m117u4:focus {
        border: 2px solid #f57c00;
      }
      .css-79elbk .css-m117u4:focus ~label{
        padding: 2px;
        background-color: #fff;
        font-size: 12px;
        top: -7px;
      }
      .css-79elbk .css-m117u4:valid ~label{
        padding: 2px;
        background-color: #fff;
        font-size: 12px;
        top: -7px;
      }
      .css-14m4l14:hover {
        background-color: #c62828;
        border: 2px solid #c62828;
      }

    `,
      }}
    />
  );
}

export default ExtraStyle;
