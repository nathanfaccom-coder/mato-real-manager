import React, { useState, useEffect } from "react";

export function MatchTeamLogo({ logo }) {
  if (logo) {
    return (
      <img
        src={logo}
        style={{
          width: 35,
          height: 35,
          borderRadius: "50%",
          objectFit: "cover",
          border: "1px solid #444",
        }}
      />
    );
  }
  return (
    <div
      style={{
        width: 35,
        height: 35,
        background: "#333",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        border: "1px solid #444",
      }}
    >
      🛡️
    </div>
  );
}
