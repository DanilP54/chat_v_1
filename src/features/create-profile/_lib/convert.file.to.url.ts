export const convertFileToUrl = (file?: File) => {
  if (file) {
    return URL.createObjectURL(file);
  }
};
