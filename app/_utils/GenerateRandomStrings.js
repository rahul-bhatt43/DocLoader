export const generateRandomString = (length = 16, charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789") => {
    let result = "";
    const characters = charset.split("");
    if (length < 1) {
      throw new RangeError("Length must be a positive integer");
    }
  
    for (let i = 0; i < length; i++) {
      result += characters[Math.floor(Math.random() * characters.length)];
    }
  
    return result;
  };
  