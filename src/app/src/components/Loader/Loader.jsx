// src/components/Loader/Loader.jsx
import React, { useEffect } from "react";
import { overlayStyle, innerStyle, spinnerStyle } from "./loaderStyles";


export default function Loader({ text = "Loading..." }) {

  useEffect(() => {
    const styleId = "app-spinner-keyframes";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = `
        @keyframes app-spin { 
          to { transform: rotate(360deg); } 
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div style={overlayStyle}>
      <div style={innerStyle}>
        <div style={spinnerStyle}></div>
        <div style={{ marginTop: 12 }}>{text}</div>
      </div>
    </div>
  );
}
