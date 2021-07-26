export const encodeContent = (content: string) => {
  return content.trim().replace(/[\r\n]/g, "n_n_");
};
