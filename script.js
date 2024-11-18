// Handle form submission
document.getElementById('quest-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    const budget = document.getElementById('budget').value;
    const people = document.getElementById('people').value;
    const location = document.getElementById('location').value;
    const interests = document.getElementById('interests').value;

    // Simulate generating a quest
    const questDescription = `A fun activity based on your interests of '${interests}' for ${people} people, with a budget of $${budget}. The location of this quest is ${location}.`;

    // Display quest output
    document.getElementById('quest-description').textContent = questDescription;

    // Show quest container
    document.getElementById('quest-output').classList.remove('hidden');
});