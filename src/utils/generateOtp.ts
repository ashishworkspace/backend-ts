export const generateOTP = () => {
  const min = 100000; // minimum value for 6 digits
  const max = 999999; // maximum value for 6 digits
  return Math.floor(Math.random() * (max - min + 1) + min);
};