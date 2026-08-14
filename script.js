let selectedWeather = false;
let selectedBudget = false;
let selectedMood = false;
let selectedDestination = false;

function weather() {
    document.getElementById("content").innerHTML = `
        <h2>🌤️ Select Season</h2>

        <select onchange="weatherSelected()">
            <option value="">Select Season</option>
            <option>Summer</option>
            <option>Winter</option>
            <option>Monsoon</option>
            <option>Spring</option>
        </select>
    `;
}

function weatherSelected() {
    selectedWeather = true;
    home();
}

function budget() {
    document.getElementById("content").innerHTML = `
        <h2>💰 Enter Budget</h2>

        <input type="number" id="money" placeholder="Enter budget">

        <button onclick="budgetSelected()">Save</button>
    `;
}

function budgetSelected() {
    if (document.getElementById("money").value != "") {
        selectedBudget = true;
    }

    home();
}

function mood() {
    document.getElementById("content").innerHTML = `
        <h2>😊 Select Mood</h2>

        <select onchange="moodSelected()">
            <option value="">Select Mood</option>
            <option>Adventure</option>
            <option>Relaxing</option>
            <option>Romantic</option>
            <option>Cultural</option>
        </select>
    `;
}

function moodSelected() {
    selectedMood = true;
    home();
}

function destination() {
    document.getElementById("content").innerHTML = `
        <h2>📍 Select Destination</h2>

        <select onchange="destinationSelected()">
            <option value="">Select Destination</option>
            <option>Goa</option>
            <option>Manali</option>
            <option>Jaipur</option>
            <option>Mumbai</option>
        </select>
    `;
}

function destinationSelected() {
    selectedDestination = true;
    home();
}

function home() {
    let ready =
        selectedWeather &&
        selectedBudget &&
        selectedMood &&
        selectedDestination;

    document.getElementById("content").innerHTML = `
        <h2>Plan Your Perfect Trip</h2>
        <p>Select Weather, Budget, Mood and Destination.</p>

        <button onclick="startPlanning()" ${ready ? "" : "disabled"}>
            Start Planning
        </button>
    `;
}

function startPlanning() {
    alert("🎉 Your trip planning has started!");
}