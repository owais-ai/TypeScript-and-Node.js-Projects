// Get references to the button and the skills section
const toggleButton = document.getElementById('toggle-skills') as HTMLButtonElement;
const skillsSection = document.getElementById('skills') as HTMLDivElement;

// Function to toggle the visibility of the skills section
function toggleSkillsVisibility() {
    if (skillsSection.style.display === 'none') {
        skillsSection.style.display = 'block';
    } else {
        skillsSection.style.display = 'none';
    }
}

// Add an event listener to the button to toggle skills on click
toggleButton.addEventListener('click', toggleSkillsVisibility);
