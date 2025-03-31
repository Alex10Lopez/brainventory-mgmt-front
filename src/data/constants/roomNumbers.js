export const roomNumbers = [
  ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)),
  ...Array.from({ length: 1000 }, (_, i) => (i + 1).toString()),
];
