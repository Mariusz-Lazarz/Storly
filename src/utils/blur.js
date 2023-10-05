export const applyBlur = () => {
  const appRoot = document.getElementById("root");
  if (appRoot) {
    appRoot.style.filter = "blur(5px)";
  }
};

export const revertBlur = () => {
  const appRoot = document.getElementById("root");
  if (appRoot) {
    appRoot.style.filter = "";
  }
};
