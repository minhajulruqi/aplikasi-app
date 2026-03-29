document.addEventListener("DOMContentLoaded", function () {

  // ================= LOGIN =================
  const loginBtn = document.getElementById("loginBtn");

  if (loginBtn) {
    loginBtn.addEventListener("click", function () {

      const username = document.getElementById("username")?.value.trim();
      const password = document.getElementById("password")?.value.trim();
      const error = document.getElementById("error");

      if (username === "admin" && password === "123") {
        localStorage.setItem("user", username);
        window.location.href = "dashboard.html";
      } else {
        if (error) error.textContent = "Username atau password salah!";
      }
    });
  }

  // ================= CEK LOGIN =================
  const welcomeUser = document.getElementById("welcomeUser");

  if (welcomeUser) {
    const user = localStorage.getItem("user");

    if (!user) {
      window.location.href = "index.html";
      return;
    }

    welcomeUser.textContent = "Halo, " + user;
  }

  // ================= LOGOUT =================
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("user");
      window.location.href = "index.html";
    });
  }

  // ================= DARK MODE =================
  const darkModeBtn = document.getElementById("darkModeBtn");

  if (darkModeBtn) {

    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("dark");
    }

    darkModeBtn.addEventListener("click", function () {
      document.body.classList.toggle("dark");
      localStorage.setItem("darkMode", document.body.classList.contains("dark"));
    });
  }

  // ================= NAVIGASI =================
  window.showSection = function (id) {
    document.querySelectorAll(".section").forEach(sec => {
      sec.style.display = "none";
    });

    const active = document.getElementById(id);
    if (active) active.style.display = "block";
  };

  // ================= PROFILE =================
  const saveProfileBtn = document.getElementById("saveProfileBtn");

  if (saveProfileBtn) {

    loadProfile();

    saveProfileBtn.addEventListener("click", function () {
      const name = document.getElementById("profileName").value.trim();
      const email = document.getElementById("profileEmail").value.trim();

      localStorage.setItem("profileName", name);
      localStorage.setItem("profileEmail", email);

      alert("Profile berhasil disimpan!");
    });

    function loadProfile() {
      document.getElementById("profileName").value =
        localStorage.getItem("profileName") || "";

      document.getElementById("profileEmail").value =
        localStorage.getItem("profileEmail") || "";
    }
  }

  // ================= PORTFOLIO =================
  const addBtn = document.getElementById("addProjectBtn");
  const searchInput = document.getElementById("searchProject");

  let editIndex = null;

  if (addBtn) {

    loadProjects();

    addBtn.addEventListener("click", function () {

      const name = document.getElementById("projectName").value.trim();
      const link = document.getElementById("projectLink").value.trim();

      if (name === "" || link === "") {
        alert("Isi semua field!");
        return;
      }

      let projects = JSON.parse(localStorage.getItem("projects")) || [];

      if (editIndex !== null) {
        projects[editIndex] = { name, link };
        editIndex = null;
        addBtn.textContent = "Tambah";
      } else {
        projects.push({ name, link });
      }

      localStorage.setItem("projects", JSON.stringify(projects));

      document.getElementById("projectName").value = "";
      document.getElementById("projectLink").value = "";

      loadProjects();
    });
  }

  function loadProjects(filter = "") {

    const list = document.getElementById("projectList");
    if (!list) return;

    let projects = JSON.parse(localStorage.getItem("projects")) || [];

    list.innerHTML = "";

    projects
      .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
      .forEach((project, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
          <div>
            <a href="${project.link}" target="_blank">${project.name}</a>
          </div>
          <div>
            <button onclick="editProject(${index})">Edit</button>
            <button onclick="deleteProject(${index})">Hapus</button>
          </div>
        `;

        list.appendChild(li);
      });

    const totalProject = document.getElementById("totalProject");
    if (totalProject) totalProject.textContent = projects.length;
  }

  window.deleteProject = function (index) {
    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects.splice(index, 1);
    localStorage.setItem("projects", JSON.stringify(projects));
    loadProjects();
  };

  window.editProject = function (index) {
    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    document.getElementById("projectName").value = projects[index].name;
    document.getElementById("projectLink").value = projects[index].link;
    editIndex = index;
    document.getElementById("addProjectBtn").textContent = "Update";
  };

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      loadProjects(this.value);
    });
  }

});