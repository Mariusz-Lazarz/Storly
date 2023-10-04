import React from "react";

function Overlay() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
        pointerEvents: "auto",
      }}
      onClick={(e) => e.stopPropagation()}
    ></div>
  );
}

export default Overlay;
