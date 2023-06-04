export const formatDate = (dateArgs: string): string => {
  const date = new Date(dateArgs);

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formattedDate = date.toLocaleString("en-US", options);
  return formattedDate;
};
