// State object to store actual selected values
const tripState = {
    weather: "",
    budget: "",
    mood: "",
    destination: ""
};

// Gemini API Key
const GEMINI_API_KEY = " ";

// Render home page immediately when script loads
window.onload = function() {
    home();
};

function isReady() {
    return Boolean(tripState.weather && tripState.budget && tripState.mood && tripState.destination);
}

function home() {
    const ready = isReady();

    document.getElementById("content").innerHTML = `
        <div class="hero">
            <div class="hero-overlay">
                <h2>Plan Your Perfect Trip</h2>
                <p>Select Weather, Budget, Mood, and Destination to start.</p>
                
                <!-- Display status of user selections -->
                <div class="selection-status">
                    <span class="badge ${tripState.weather ? 'active' : ''}">
                        ${tripState.weather ? '🌦️ ' + tripState.weather : '🌦️ Weather'}
                    </span>
                    <span class="badge ${tripState.budget ? 'active' : ''}">
                        ${tripState.budget ? '💰 ₹' + tripState.budget : '💰 Budget'}
                    </span>
                    <span class="badge ${tripState.mood ? 'active' : ''}">
                        ${tripState.mood ? '🎭 ' + tripState.mood : '🎭 Mood'}
                    </span>
                    <span class="badge ${tripState.destination ? 'active' : ''}">
                        ${tripState.destination ? '📍 ' + tripState.destination : '📍 Destination'}
                    </span>
                </div>

                <button id="start" onclick="startPlanning()" ${ready ? "" : "disabled"}>
                    ${ready ? "Start Planning! 🚀" : "Complete All Choices"}
                </button>
            </div>
        </div>

        <div class="gallery-section">
            <h3>Explore Nature Destinations</h3>
            <div class="image-grid">
                <div class="card">
                    <img src="https://media.giphy.com/media/l0HlTy9x8FZo0XO1i/giphy.gif" alt="Waterfall Loop">
                    <span>Cascading Waterfalls</span>
                </div>
                <div class="card">
                    <img src="https://media.giphy.com/media/3o7qE1YN7aBOFPRw8E/giphy.gif" alt="Forest Pines Loop">
                    <span>Misty Pine Forests</span>
                </div>
                <div class="card">
                    <img src="https://media.giphy.com/media/xT0Gqc1v17P89Q1jcA/giphy.gif" alt="Ocean Waves Loop">
                    <span>Tropical Ocean Waves</span>
                </div>
                <div class="card">
                    <img src="https://media.giphy.com/media/26FmRaD3pIe7f5zP2/giphy.gif" alt="Northern Lights Loop">
                    <span>Northern Lights</span>
                </div>
            </div>
        </div>
    `;
}

function weather() {
    document.getElementById("content").innerHTML = `
        <div class="form-card">
            <h2>🌦️ Select Season</h2>
            <select id="weatherSelect" onchange="weatherSelected(this.value)">
                <option value="">Choose Option</option>
                <option value="Summer" ${tripState.weather === 'Summer' ? 'selected' : ''}>Summer</option>
                <option value="Winter" ${tripState.weather === 'Winter' ? 'selected' : ''}>Winter</option>
                <option value="Monsoon" ${tripState.weather === 'Monsoon' ? 'selected' : ''}>Monsoon</option>
                <option value="Spring" ${tripState.weather === 'Spring' ? 'selected' : ''}>Spring</option>
            </select>
        </div>
    `;
}

function weatherSelected(value) {
    if (value !== "") {
        tripState.weather = value;
    }
    home();
}

function budget() {
    document.getElementById("content").innerHTML = `
        <div class="form-card">
            <h2>💰 Enter Budget</h2>
            <input type="number" id="money" placeholder="Enter budget in ₹" value="${tripState.budget}">
            <button onclick="budgetSelected()">Save Budget</button>
        </div>
    `;
}

function budgetSelected() {
    let val = document.getElementById("money").value;
    if (val !== "" && val > 0) {
        tripState.budget = val;
    }
    home();
}

function mood() {
    document.getElementById("content").innerHTML = `
        <div class="form-card">
            <h2>🎭 Select Mood</h2>
            <select onchange="moodSelected(this.value)">
                <option value="">Choose Option</option>
                <option value="Adventure" ${tripState.mood === 'Adventure' ? 'selected' : ''}>Adventure</option>
                <option value="Relaxing" ${tripState.mood === 'Relaxing' ? 'selected' : ''}>Relaxing</option>
                <option value="Romantic" ${tripState.mood === 'Romantic' ? 'selected' : ''}>Romantic</option>
                <option value="Cultural" ${tripState.mood === 'Cultural' ? 'selected' : ''}>Cultural</option>
            </select>
        </div>
    `;
}

function moodSelected(value) {
    if (value !== "") {
        tripState.mood = value;
    }
    home();
}

function destination() {
    document.getElementById("content").innerHTML = `
        <div class="form-card">
            <h2>📍 Select Destination</h2>
            <select onchange="destinationSelected(this.value)">
                <option value="">Choose Option</option>
                <option value="Goa" ${tripState.destination === 'Goa' ? 'selected' : ''}>Goa</option>
                <option value="Manali" ${tripState.destination === 'Manali' ? 'selected' : ''}>Manali</option>
                <option value="Jaipur" ${tripState.destination === 'Jaipur' ? 'selected' : ''}>Jaipur</option>
                <option value="Mumbai" ${tripState.destination === 'Mumbai' ? 'selected' : ''}>Mumbai</option>
            </select>
        </div>
    `;
}

function destinationSelected(value) {
    if (value !== "") {
        tripState.destination = value;
    }
    home();
}

async function startPlanning() {
    if (!isReady()) return;

    // Show loading state
    document.getElementById("content").innerHTML = `
        <div class="form-card" style="width: 80%; max-width: 500px;">
            <h2>✨ Generating Custom Itinerary...</h2>
            <p>Creating a plan for ${tripState.destination} (${tripState.mood} vibe, ${tripState.weather})...</p>
            <div style="margin-top: 15px; font-size: 2rem;">✈️ 🌊 🏔️</div>
        </div>
    `;

    const prompt = `Create a 3-day travel itinerary for a trip to ${tripState.destination} during the ${tripState.weather} season. 
The total budget is ₹${tripState.budget} and the overall mood/vibe of the trip should be ${tripState.mood}. 
Format the response clearly using simple headings for Day 1, Day 2, Day 3, along with budget tips and top local foods to try.`;

    try {
        // Endpoint updated to gemini-3.6-flash
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{ text: prompt }]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        // Check for error responses returned by Google's API
        if (data.error) {
            console.error("Google API Returned Error:", data.error);
            throw new Error(data.error.message || "API Error");
        }

        if (data.candidates && data.candidates[0].content.parts[0].text) {
            const aiPlan = data.candidates[0].content.parts[0].text;
            
            // Format bold text and newlines into readable HTML
            const formattedPlan = aiPlan
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n/g, '<br>');

            document.getElementById("content").innerHTML = `
                <div class="form-card" style="width: 85%; max-width: 650px; text-align: left;">
                    <h2 style="text-align: center;">🌴 Trip Plan to ${tripState.destination}</h2>
                    <div style="margin: 15px 0; color: #94a3b8; font-size: 0.9rem; text-align: center;">
                        <strong>Season:</strong> ${tripState.weather} | 
                        <strong>Budget:</strong> ₹${tripState.budget} | 
                        <strong>Vibe:</strong> ${tripState.mood}
                    </div>
                    <hr style="border-color: #334155; margin-bottom: 20px;">
                    <div style="line-height: 1.6; color: #f8fafc;">${formattedPlan}</div>
                    <div style="text-align: center; margin-top: 25px;">
                        <button onclick="home()" style="padding: 10px 25px; border-radius: 20px; background: #0284c7; color: white; border: none; font-weight: bold; cursor: pointer;">
                            Plan Another Trip
                        </button>
                    </div>
                </div>
            `;
        } else {
            throw new Error("Invalid response format");
        }

    } catch (error) {
        console.error("Gemini API Error details:", error);
        document.getElementById("content").innerHTML = `
            <div class="form-card">
                <h2>⚠️ Error Generating Plan</h2>
                <p><strong>Reason:</strong> ${error.message}</p>
                <p style="font-size: 0.85rem; color: #94a3b8; margin-top: 10px;">Check your browser console (F12) for detailed logs.</p>
                <button onclick="home()" style="margin-top: 15px;">Try Again</button>
            </div>
        `;
    }
}
