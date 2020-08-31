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
          min-height: 100vh;
      }
      input[type="checkbox"] {
        position: relative;
        top: 6px;
        width: 18px;
        height: 18px; 
        -webkit-appearance: none;
        outline: none;
        cursor: pointer;
        transition: .3s;
      }
      .ch-checkbox{
        content: '';
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
        margin-right: 16px;
        width: 100%;
        height: 100%;
        border: 1px solid #9e9e9e;
      }
      .ch-checkbox-group {
        cursor: pointer;
        margin-bottom: 10px;
      }
      .ch-checkbox-label {
        font-size: 14px;
        cursor: pointer;
      }
      .ch-checkbox:checked label{ 
       margin-left: 10px;
      }
      .ch-checkbox:checked {
        border: 2px solid;
        border-left: none;
        border-top: none;
        width: 10px;
        margin-right: 24px;
        border-color: #f57c00;
        transform: rotate(45deg) translate(3px, -8px);
      }
      .css-1bla2eh:hover {
        -moz-box-shadow: 0 4px 4px 0 #ba9127, 0 6px 6px 0 #ba9127;
        -webkit-box-shadow: 0 4px 8px 0 #ba9127, 0 6px 6px 0 #ba9127;
        box-shadow: 0 4px 4px 0 #ba9127;
      }
      .css-1tf5qmx .css-wzxsih:focus {
        border: 2px solid #f57c00;
      }
      .css-79elbk .css-wzxsih:focus {
        border: 2px solid #f57c00;
      }
      .css-79elbk .css-wzxsih:focus ~label{
        font-size: 12px;
        background: #fff;
        padding: 3px;
        color: #f57c00;
        transform: translateY(-18px);
        transition:0.3s ease all; 
        -moz-transition:0.3s ease all; 
        -webkit-transition:0.3s ease all;
      }
      .css-1tf5qmx .css-wzxsih:focus ~label{
        font-size: 12px;
        background: #fff;
        padding: 3px;
        color: #f57c00;
        transform: translateY(-18px);
        transition:0.3s ease all; 
        -moz-transition:0.3s ease all; 
        -webkit-transition:0.3s ease all;
      }

      .css-79elbk .css-wzxsih:not(:placeholder-shown) ~ label {
        font-size: 12px;
        background: #fff;
        padding: 3px;
        transform: translateY(-18px);
        color: #f57c00;
        transition:0.3s ease all; 
        -moz-transition:0.3s ease all; 
        -webkit-transition:0.3s ease all;
      }
      .css-1tf5qmx .css-wzxsih:not(:placeholder-shown) ~ label {
        font-size: 12px;
        background: #fff;
        padding: 3px;
        transform: translateY(-18px);
        transition:0.3s ease all; 
        -moz-transition:0.3s ease all; 
        -webkit-transition:0.3s ease all;
      }
      .css-79elbk .css-wzxsih:valid ~label{
        font-size: 12px;
        background: #fff;
        padding: 3px;
        transform: translateY(-18px);
        transition:0.3s ease all; 
        -moz-transition:0.3s ease all; 
        -webkit-transition:0.3s ease all;
      }
 
      .css-14m4l14:hover {
        background-color: #c62828;
        border: 2px solid #c62828;
      }
      .css-9v4pin:hover {
        background-color: rgb(253, 240, 231);
      }
      .css-1xhj18k:hover {
        background-color: rgb(253, 240, 231);
      }
      .css-7tktra:focus {
        border: 2px solid #f57c00;
      }
      #nprogress .bar {
        background: linear-gradient(to right, #f12711, #f5af19) !important;
      }
      #nprogress .spinner-icon {
        border-top-color: #f44336;
        border-left-color: #f44336;
        height: 25px;
        width: 25px;  
      }
      #nprogress .spinner { 
        right: 50%;
      }
      #nprogress .peg {
        box-shadow: 0 0 10px #f5af19, 0 0 5px #f5af19;
      }
      .css-krndbq:focus {
        border: 2px solid #f57c00;  
      }
    `,
      }}
    />
  );
}

export default ExtraStyle;
