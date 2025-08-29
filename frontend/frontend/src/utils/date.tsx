// utils/date.ts
export const formatDateTime = (d: string | Date) => {
  if (!d) return "";
  return new Date(d).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    hour12: true,
  });
};
