export const switch_theme = (theme: string) => {
  localStorage.setItem("color", theme);

  window.location.reload();
};
