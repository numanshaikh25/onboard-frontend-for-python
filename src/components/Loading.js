import React from "react";

function Loading() {
  return (
    <div>
      <div
        class="spinner-border mx-auto"
        style={{
          height: "50px",
          width: "50px",
          margin: "auto",
          display: "block",
        }}
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
