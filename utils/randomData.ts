const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const generateRandomData = (label: string) => {
  const data = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100));
  const backgroundColor = getRandomColor();
  const borderColor = backgroundColor + "80";
  return {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label,
        data,
        fill: false,
        backgroundColor,
        borderColor,
      },
    ],
  };
};
