import React from "react";
import { NATIONS, flag } from "./catalog.js";
export function NationalitySelect({
  value = "MTR",
  onChange,
  disabled = false,
  label = "Nacionalidade",
}) {
  return (
    <label style={{ display: "block", marginBottom: 10 }}>
      {label}
      <select
        className="input-field"
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        {NATIONS.map((n) => (
          <option key={n.id} value={n.id}>
            {flag(n.id)} {n.name}
          </option>
        ))}
      </select>
    </label>
  );
}
