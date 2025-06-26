document.getElementById("addJobForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const title = document.getElementById("title").value.trim();
    const company = document.getElementById("company").value.trim();
    const skill = document.getElementById("skill").value.trim();
    const location = document.getElementById("location").value.trim();
  
    if (!title || !company || !skill || !location) {
      alert("Please fill out all fields.");
      return;
    }
  
    // Get previous custom jobs from localStorage
    const customJobs = JSON.parse(localStorage.getItem("customJobs")) || [];
  
    // Create new job object
    const newJob = {
      id: Date.now(), // unique ID using timestamp
      title,
      company,
      skill,
      location
    };
  
    // Save it
    customJobs.push(newJob);
    localStorage.setItem("customJobs", JSON.stringify(customJobs));
  
    document.getElementById("successMsg").textContent = "✅ Job posted successfully!";
    this.reset();
  });
  