const toggle = document.getElementById("themeToggle");

// Load from localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  toggle.textContent = "☀️";
} else {
  toggle.textContent = "🌙";
}

// Click to toggle
toggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-mode");
  toggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
