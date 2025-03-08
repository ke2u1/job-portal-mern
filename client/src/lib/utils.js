import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatSalary = (value) => {
  if (value >= 10000000) {
    return `${Math.floor(value / 10000000)}Cr`;
  } else if (value >= 100000) {
    return `${Math.floor(value / 100000)}L`;
  } else {
    return `${value.toLocaleString("en-IN")}₹`;
  }
};
