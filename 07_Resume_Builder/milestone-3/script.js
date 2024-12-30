// script.js

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resume-form');
  
    // Buttons to add more entries
    const addEducationBtn = document.getElementById('add-education');
    const addWorkBtn = document.getElementById('add-work');
    const addSkillBtn = document.getElementById('add-skill');
  
    // Containers for dynamic entries
    const educationContainer = document.getElementById('education-container');
    const workContainer = document.getElementById('work-container');
    const skillsContainer = document.getElementById('skills-container');
  
    // Resume Display Elements
    const resumeName = document.getElementById('resume-name');
    const resumeEmail = document.getElementById('resume-email');
    const resumePhone = document.getElementById('resume-phone');
    const resumeProfilePic = document.getElementById('resume-profile-pic');
    const resumeEducation = document.getElementById('resume-education');
    const resumeWork = document.getElementById('resume-work');
    const resumeSkills = document.getElementById('resume-skills');
  
    // Function to add a new education entry
    addEducationBtn.addEventListener('click', () => {
      const eduEntry = document.createElement('div');
      eduEntry.className = 'education-entry';
      eduEntry.innerHTML = `
        <input type="text" name="degree" placeholder="Degree (e.g., Bachelor in Computer Science)" required />
        <input type="text" name="institution" placeholder="Institution (e.g., NED University)" required />
        <input type="text" name="duration" placeholder="Duration (e.g., 2014-2018)" required />
        <button type="button" class="remove-education">Remove</button>
      `;
      educationContainer.appendChild(eduEntry);
  
      // Show the remove button for additional entries
      const removeBtn = eduEntry.querySelector('.remove-education');
      removeBtn.style.display = 'inline-block';
  
      // Add event listener to remove button
      removeBtn.addEventListener('click', () => {
        educationContainer.removeChild(eduEntry);
      });
    });
  
    // Function to add a new work experience entry
    addWorkBtn.addEventListener('click', () => {
      const workEntry = document.createElement('div');
      workEntry.className = 'work-entry';
      workEntry.innerHTML = `
        <input type="text" name="jobTitle" placeholder="Job Title (e.g., AI Engineer)" required />
        <input type="text" name="company" placeholder="Company (e.g., PanaCloud Pakistan)" required />
        <input type="text" name="workDuration" placeholder="Duration (e.g., 2020-2023)" required />
        <textarea name="responsibilities" placeholder="Responsibilities" required></textarea>
        <button type="button" class="remove-work">Remove</button>
      `;
      workContainer.appendChild(workEntry);
  
      // Show the remove button for additional entries
      const removeBtn = workEntry.querySelector('.remove-work');
      removeBtn.style.display = 'inline-block';
  
      // Add event listener to remove button
      removeBtn.addEventListener('click', () => {
        workContainer.removeChild(workEntry);
      });
    });
  
    // Function to add a new skill entry
    addSkillBtn.addEventListener('click', () => {
      const skillInput = document.createElement('input');
      skillInput.type = 'text';
      skillInput.name = 'skill';
      skillInput.placeholder = 'Skill (e.g., HTML)';
      skillInput.required = true;
      skillsContainer.appendChild(skillInput);
    });
  
    // Function to read image file as Data URL
    function readImage(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            resolve(reader.result);
          } else {
            reject('Error reading image file.');
          }
        };
        reader.onerror = () => reject('Error reading image file.');
        reader.readAsDataURL(file);
      });
    }
  
    // Form submission handler
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      // Validate form
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
  
      // Collect Personal Information
      const name = form.elements['name'].value;
      const email = form.elements['email'].value;
      const phone = form.elements['phone'].value;
      const profilePicInput = document.getElementById('profilePicture');
      let profilePicture = 'profile.jpg'; // Default image
  
      if (profilePicInput.files && profilePicInput.files[0]) {
        try {
          profilePicture = await readImage(profilePicInput.files[0]);
        } catch (error) {
          alert('Failed to load profile picture.');
        }
      }
  
      // Update Personal Information in Resume
      resumeName.textContent = name;
      resumeEmail.textContent = email;
      resumePhone.textContent = phone;
      resumeProfilePic.src = profilePicture;
  
      // Collect Education Entries
      const educationEntries = educationContainer.querySelectorAll('.education-entry');
      resumeEducation.innerHTML = ''; // Clear existing entries
      educationEntries.forEach(entry => {
        const degree = entry.querySelector('input[name="degree"]').value;
        const institution = entry.querySelector('input[name="institution"]').value;
        const duration = entry.querySelector('input[name="duration"]').value;
        const li = document.createElement('li');
        li.textContent = `${degree}, ${institution} (${duration})`;
        resumeEducation.appendChild(li);
      });
  
      // Collect Work Experience Entries
      const workEntries = workContainer.querySelectorAll('.work-entry');
      resumeWork.innerHTML = ''; // Clear existing entries
      workEntries.forEach(entry => {
        const jobTitle = entry.querySelector('input[name="jobTitle"]').value;
        const company = entry.querySelector('input[name="company"]').value;
        const workDuration = entry.querySelector('input[name="workDuration"]').value;
        const responsibilities = entry.querySelector('textarea[name="responsibilities"]').value;
  
        // Create job title and company paragraph
        const jobPara = document.createElement('p');
        jobPara.innerHTML = `<b>${jobTitle}</b> at ${company} (${workDuration})`;
  
        // Create responsibilities paragraph and list
        const respPara = document.createElement('p');
        respPara.innerHTML = `<b>Responsibilities:</b>`;
        const respList = document.createElement('ul');
  
        // Split responsibilities by new lines and add to list
        const responsibilitiesArray = responsibilities.split('\n').filter(r => r.trim() !== '');
        responsibilitiesArray.forEach(resp => {
          const li = document.createElement('li');
          li.textContent = resp;
          respList.appendChild(li);
        });
  
        // Append to work section
        resumeWork.appendChild(jobPara);
        resumeWork.appendChild(respPara);
        resumeWork.appendChild(respList);
      });
  
      // Collect Skills
      const skillInputs = skillsContainer.querySelectorAll('input[name="skill"]');
      resumeSkills.innerHTML = ''; // Clear existing skills
      skillInputs.forEach(input => {
        const skill = input.value.trim();
        if (skill) {
          const li = document.createElement('li');
          li.textContent = skill;
          resumeSkills.appendChild(li);
        }
      });
  
      // Optional: Scroll to resume section
      document.getElementById('resume-section').scrollIntoView({ behavior: 'smooth' });
    });
  });
  