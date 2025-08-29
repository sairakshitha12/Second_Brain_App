export const FormatDate = (d: Date | string) =>
new Date(d).toLocaleString('en-IN',
     { dateStyle: 'medium', timeStyle: 'short', hour12: true });

