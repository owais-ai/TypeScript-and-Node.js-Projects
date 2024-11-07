// Get references to the button and the skills section
var toggleButton = document.getElementById('toggle-skills');
var skillsSection = document.getElementById('skills');
// Function to toggle the visibility of the skills section
function toggleSkillsVisibility() {
    if (skillsSection.style.display === 'none') {
        skillsSection.style.display = 'block';
    }
    else {
        skillsSection.style.display = 'none';
    }
}
// Add an event listener to the button to toggle skills on click
toggleButton.addEventListener('click', toggleSkillsVisibility);
