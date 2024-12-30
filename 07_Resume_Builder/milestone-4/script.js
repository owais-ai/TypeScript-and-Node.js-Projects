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

  // Data Structure to Hold Resume Data
  let resumeData = {
    personalInfo: {
      name: 'Owais Khan',
      email: 'owais@gmail.com',
      phone: '0300-1234567',
      profilePicture: 'profile.jpg'
    },
    education: [
      {
        degree: 'Bachelor in Computer Science',
        institution: 'NED University',
        duration: '2014-2018'
      },
      {
        degree: 'Master in Gen AI',
        institution: 'NED University',
        duration: '2024-2026'
      }
    ],
    workExperience: [
      {
        jobTitle: 'AI Engineer',
        company: 'PanaCloud Pakistan',
        workDuration: '2020-2023',
        responsibilities: [
          'Developed web applications using JavaScript and TypeScript',
          'Collaborated with a team of developers on Agile projects'
        ]
      }
    ],
    skills: [
      'HTML',
      'CSS',
      'TypeScript',
      'JavaScript',
      'NodeJS',
      'ReactJS',
      'NextJS',
      'Tailwind CSS'
    ]
  };

  // Function to render the resume based on resumeData
  function renderResume() {
    // Update Personal Information
    resumeName.textContent = resumeData.personalInfo.name;
    resumeEmail.textContent = resumeData.personalInfo.email;
    resumePhone.textContent = resumeData.personalInfo.phone;

    if (resumeData.personalInfo.profilePicture && resumeData.personalInfo.profilePicture !== 'profile.jpg') {
      resumeProfilePic.src = resumeData.personalInfo.profilePicture;
    } else {
      resumeProfilePic.src = 'profile.jpg'; // Default image
    }

    // Update Education
    resumeEducation.innerHTML = '';
    resumeData.education.forEach((edu, index) => {
      const li = document.createElement('li');
      li.textContent = `${edu.degree}, ${edu.institution} (${edu.duration})`;
      li.setAttribute('data-index', index);
      li.classList.add('editable');
      resumeEducation.appendChild(li);
    });

    // Update Work Experience
    resumeWork.innerHTML = '';
    resumeData.workExperience.forEach((work, index) => {
      const workDiv = document.createElement('div');
      workDiv.classList.add('work-entry');
      workDiv.setAttribute('data-index', index);

      const jobPara = document.createElement('p');
      jobPara.innerHTML = `<b>${work.jobTitle}</b> at ${work.company} (${work.workDuration})`;
      jobPara.classList.add('editable');
      jobPara.setAttribute('data-section', 'jobTitle');
      jobPara.setAttribute('data-index', index);

      const respPara = document.createElement('p');
      respPara.innerHTML = `<b>Responsibilities:</b>`;
      respPara.classList.add('editable');
      respPara.setAttribute('data-section', 'responsibilities');
      respPara.setAttribute('data-index', index);

      const respList = document.createElement('ul');
      work.responsibilities.forEach((resp, respIndex) => {
        const li = document.createElement('li');
        li.textContent = resp;
        li.setAttribute('data-resp-index', respIndex);
        li.classList.add('editable');
        respList.appendChild(li);
      });

      workDiv.appendChild(jobPara);
      workDiv.appendChild(respPara);
      workDiv.appendChild(respList);
      resumeWork.appendChild(workDiv);
    });

    // Update Skills
    resumeSkills.innerHTML = '';
    resumeData.skills.forEach((skill, index) => {
      const li = document.createElement('li');
      li.textContent = skill;
      li.setAttribute('data-index', index);
      li.classList.add('editable');
      resumeSkills.appendChild(li);
    });

    // After rendering, enable inline editing
    enableInlineEditing();
  }

  // Initial Render
  renderResume();

  // Function to add a new education entry in the form
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

  // Function to add a new work experience entry in the form
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

  // Function to add a new skill entry in the form
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

    // Update resumeData
    resumeData.personalInfo = { name, email, phone, profilePicture };

    // Collect Education Entries
    const educationEntries = educationContainer.querySelectorAll('.education-entry');
    resumeData.education = [];
    educationEntries.forEach(entry => {
      const degree = entry.querySelector('input[name="degree"]').value;
      const institution = entry.querySelector('input[name="institution"]').value;
      const duration = entry.querySelector('input[name="duration"]').value;
      resumeData.education.push({ degree, institution, duration });
    });

    // Collect Work Experience Entries
    const workEntries = workContainer.querySelectorAll('.work-entry');
    resumeData.workExperience = [];
    workEntries.forEach(entry => {
      const jobTitle = entry.querySelector('input[name="jobTitle"]').value;
      const company = entry.querySelector('input[name="company"]').value;
      const workDuration = entry.querySelector('input[name="workDuration"]').value;
      const responsibilities = entry.querySelector('textarea[name="responsibilities"]').value.split('\n').filter(r => r.trim() !== '');
      resumeData.workExperience.push({ jobTitle, company, workDuration, responsibilities });
    });

    // Collect Skills
    const skillInputs = skillsContainer.querySelectorAll('input[name="skill"]');
    resumeData.skills = [];
    skillInputs.forEach(input => {
      const skill = input.value.trim();
      if (skill) {
        resumeData.skills.push(skill);
      }
    });

    // Render the resume with updated data
    renderResume();

    // Optional: Scroll to resume section
    document.getElementById('resume-section').scrollIntoView({ behavior: 'smooth' });
  });

  // Function to handle inline editing
  function enableInlineEditing() {
    const editableElements = document.querySelectorAll('.editable');

    editableElements.forEach(element => {
      element.addEventListener('click', () => {
        // Prevent multiple inputs
        if (element.querySelector('input') || element.querySelector('textarea')) return;

        const originalText = element.textContent;
        element.textContent = '';

        // Create input based on element type
        let input;
        if (element.tagName.toLowerCase() === 'li' || element.tagName.toLowerCase() === 'p' || element.tagName.toLowerCase() === 'span') {
          input = document.createElement('input');
          input.type = 'text';
          input.value = originalText;
          input.style.width = '90%';
        } else {
          // For other elements like h2 or img, skip editing
          return;
        }

        // Replace element content with input
        element.appendChild(input);
        input.focus();

        // Handle input blur (save changes)
        input.addEventListener('blur', () => {
          const newValue = input.value.trim();
          if (newValue) {
            element.textContent = newValue;
            updateResumeData(element, newValue);
          } else {
            element.textContent = originalText;
          }
        });

        // Handle Enter key
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            input.blur();
          }
        });
      });
    });
  }

  // Function to update resumeData based on edited element
  function updateResumeData(element, newValue) {
    // Personal Information
    if (element.id === 'resume-name') {
      resumeData.personalInfo.name = newValue;
    } else if (element.id === 'resume-email') {
      resumeData.personalInfo.email = newValue;
    } else if (element.id === 'resume-phone') {
      resumeData.personalInfo.phone = newValue;
    }

    // Education
    if (element.parentElement.id === 'resume-education') {
      const index = element.getAttribute('data-index');
      if (index !== null) {
        // Split the newValue to extract degree, institution, duration
        const regex = /(.*),\s*(.*)\s*\((.*)\)/;
        const match = newValue.match(regex);
        if (match) {
          const [, degree, institution, duration] = match;
          resumeData.education[index] = { degree, institution, duration };
        } else {
          // If the format doesn't match, just update the first field (degree)
          resumeData.education[index].degree = newValue;
        }
      }
    }

    // Skills
    if (element.parentElement.id === 'resume-skills') {
      const index = element.getAttribute('data-index');
      if (index !== null) {
        resumeData.skills[index] = newValue;
      }
    }

    // Work Experience
    if (element.parentElement.id === 'resume-work') {
      const workDiv = element.closest('.work-entry');
      const index = workDiv.getAttribute('data-index');
      if (index !== null) {
        if (element.getAttribute('data-section') === 'jobTitle') {
          resumeData.workExperience[index].jobTitle = newValue;
        } else if (element.tagName.toLowerCase() === 'li') {
          const respIndex = element.getAttribute('data-resp-index');
          if (respIndex !== null) {
            resumeData.workExperience[index].responsibilities[respIndex] = newValue;
          }
        }
      }
    }
  }

  // Observe mutations to re-enable editing on new elements
  const observer = new MutationObserver(() => {
    enableInlineEditing();
  });

  observer.observe(document.getElementById('resume'), { childList: true, subtree: true });

  // Initial enable editing
  enableInlineEditing();
});
