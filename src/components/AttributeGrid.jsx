import React, { useState, useEffect } from "react";
import { ATTR_LABELS } from "../game/ATTR_LABELS.js";
import { getAttrColor } from "../game/getAttrColor.js";

export const AttributeGrid = ({ attrs, pendingXP }) => {
  if (!attrs) return <small>Atributos não gerados.</small>;

  const pointsToAdd = pendingXP ? Math.floor(pendingXP / 100) : 0;
  const projectionText =
    pointsToAdd !== 0
      ? pointsToAdd > 0
        ? ` (+${pointsToAdd} pts)`
        : ` (${pointsToAdd} pts)`
      : "";
  const projectionColor =
    pointsToAdd > 0 ? "#00E676" : pointsToAdd < 0 ? "#FF1744" : "#666";

  return (
    <div style={{ marginTop: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <small style={{ color: "#aaa" }}>Atributos</small>
        <small style={{ color: projectionColor, fontWeight: "bold" }}>
          Evolução Prevista: {projectionText}
        </small>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "4px",
        }}
      >
        {Object.entries(attrs).map(([key, val]) => (
          <div
            key={key}
            style={{
              background: "rgba(0,0,0,0.3)",
              padding: "4px",
              borderRadius: "4px",
              fontSize: "9px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                color: "#ccc",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                marginRight: 3,
              }}
              title={ATTR_LABELS[key]}
            >
              {ATTR_LABELS[key] || key}
            </span>
            <b style={{ color: getAttrColor(val) }}>{val}</b>
          </div>
        ))}
      </div>
    </div>
  );
};
