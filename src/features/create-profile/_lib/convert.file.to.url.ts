export const convertFileToUrl = (file: File | null) => {
  if (file) {
    return URL.createObjectURL(file);
  }
};
