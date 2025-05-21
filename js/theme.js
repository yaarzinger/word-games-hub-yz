const savedTheame = localStorage.getItem('theme');
if (savedTheame == "dark") {
    document.body.classList.add("dark-mode");
    document.getElementById("themeToggle").textContent = " ☀️";
}
// Toggle theme on click
document.getElementById("themeToggle").addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-mode");
  document.getElementById("themeToggle").textContent = isDark
    ? "☀️"
    : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});