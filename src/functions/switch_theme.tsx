export const switch_theme = () => {
  let cur_theme = localStorage.getItem("color");
  if (!cur_theme) {
    localStorage.setItem("color", "dark");
    cur_theme = "dark";
  }

  if (cur_theme === "dark") {
    localStorage.setItem("color", "light");
  } else {
    localStorage.setItem("color", "dark");
  }

  window.location.reload();
};
