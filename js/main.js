// ============================
// ✅ Login Protection & Logout
// ============================

// Run after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Check login status
  const logoutBtn = document.getElementById("logoutBtn");
  const user = localStorage.getItem("loggedInUser");

  if (logoutBtn) {
    if (user) {
      logoutBtn.style.display = "inline-block";
    } else {
      // Not logged in → redirect to login page
      window.location.href = "login.html";
    }
  }

  // ✅ Render jobs if on homepage
  renderJobs(); // initial render
});

// Logout function
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}

// ============================
// ✅ Job Data + Rendering
// ============================

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Solutions",
    skill: "JavaScript",
    location: "Dhaka",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "CodeFarm",
    skill: "Python",
    location: "Chittagong",
  },
  {
    id: 3,
    title: "React Developer",
    company: "SoftWorks",
    skill: "React",
    location: "Remote",
  },
];

function getAllJobs() {
  const customJobs = JSON.parse(localStorage.getItem("customJobs")) || [];
  return [...jobs, ...customJobs];
}

function renderJobs(searchTerm = "") {
  const jobList = document.getElementById("jobList");
  jobList.innerHTML = "";

  const allJobs = getAllJobs();
  const filteredJobs = allJobs.filter(job => {
    const search = searchTerm.toLowerCase();
    return (
      job.title.toLowerCase().includes(search) ||
      job.company.toLowerCase().includes(search) ||
      job.skill.toLowerCase().includes(search) ||
      job.location.toLowerCase().includes(search)
    );
  });

  if (filteredJobs.length === 0) {
    jobList.innerHTML = "<p style='padding: 20px;'>No matching jobs found.</p>";
    return;
  }

  filteredJobs.forEach(job => {
    const jobCard = document.createElement("div");
    jobCard.className = "job-card";
    jobCard.innerHTML = `
      <h3>${job.title}</h3>
      <p><strong>Company:</strong> ${job.company}</p>
      <p><strong>Skill:</strong> ${job.skill}</p>
      <p><strong>Location:</strong> ${job.location}</p>
      <button onclick="viewJob(${job.id})">View Details</button>
      <button onclick="saveJob(${job.id})" id="save-btn-${job.id}">
        ${isJobSaved(job.id) ? "Saved" : "Save Job"}
      </button>
    `;
    jobList.appendChild(jobCard);
  });
}

function viewJob(id) {
  localStorage.setItem("selectedJobId", id);
  window.location.href = "job-details.html";
}

document.getElementById("searchInput").addEventListener("input", (e) => {
  renderJobs(e.target.value);
});

function saveJob(id) {
  let saved = JSON.parse(localStorage.getItem("savedJobs")) || [];
  if (!saved.includes(id)) {
    saved.push(id);
    localStorage.setItem("savedJobs", JSON.stringify(saved));
    document.getElementById(`save-btn-${id}`).innerText = "Saved";
  }
}

function isJobSaved(id) {
  const saved = JSON.parse(localStorage.getItem("savedJobs")) || [];
  return saved.includes(id);
}
