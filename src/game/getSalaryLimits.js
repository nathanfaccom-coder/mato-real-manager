import { SALARY_CAPS } from "./SALARY_CAPS.js";

export const getSalaryLimits = (ovr) => {
  const o = parseInt(ovr) || 0;
  return (
    SALARY_CAPS.find((t) => o >= t.minOv && o <= t.maxOv) || SALARY_CAPS[0]
  );
};
