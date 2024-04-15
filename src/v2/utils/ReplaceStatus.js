export const ReplaceStatus = (status) => {
  switch (status) {
    case "cod-web-seller":
      return "cod";
    case "bank-web-seller":
      return "bank";
    case "banks":
      return "bank";

    default:
      return status;
  }
};
