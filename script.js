// --------------------------
// API Keys (replace with yours)
// --------------------------
const DEEPAI_KEY = "5141ec2d-78b3-4e7c-8cd0-409661f76d03";
const UNSPLASH_KEY = "McILvA-xkxl5w1Nird3WsDbiTUJXZ33xEveGjxrGnPk";

// --------------------------
// Elements
// --------------------------
const analyzeBtn = document.getElementById('analyzeBtn');
const imageInput = document.getElementById('imageInput');
const mainDescription = document.getElementById('mainDescription');
const suggestionsList = document.getElementById('suggestionsList');
const itemDetailsList = document.getElementById('itemDetailsList');
const resultsSection = document.getElementById('resultsSection');
const followUpSection = document.getElementById('followUpSection');
const followUpBtn = document.getElementById('followUpBtn');
const followUpInput = document.getElementById('followUpInput');
const followUpResponse = document.getElementById('followUpResponse');
const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const closeBtn = document.getElementById('closeBtn');
const modalGender = document.getElementById('modalGender');
const genderSelect = document.getElementById('gender');

// --------------------------
// Functions
// --------------------------

// 1. Detect clothing using DeepAI
async function analyzeClothing(file) {
    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch("https://api.deepai.org/api/clothing-recognition", {
            method: "POST",
            headers: { 'Api-Key': DEEPAI_KEY },
            body: formData
        });

        const data = await response.json();
        if (data.output && data.output.length > 0) {
            return data.output[0]; // { type, color, style }
        } else {
            return { type: 'shirt', color: 'blue', style: 'casual' }; // fallback
        }
    } catch (error) {
        console.error("DeepAI error:", error);
        return { type: 'shirt', color: 'blue', style: 'casual' }; // fallback
    }
}

// 2. Fetch image recommendations from Unsplash
async function getRecommendations(type, color) {
    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${type}&color=${color}&per_page=5&client_id=${UNSPLASH_KEY}`);
        const data = await response.json();
        return data.results.map(item => ({
            item: item.alt_description || type,
            image: item.urls.small,
            reason: `Matches your ${type}`
        }));
    } catch (error) {
        console.error("Unsplash error:", error);
        return [];
    }
}

// --------------------------
// Event Listeners
// --------------------------

// Analyze button
analyzeBtn.addEventListener('click', async () => {
    if (!imageInput.files[0]) return alert("Please upload an image.");

    const file = imageInput.files[0];

    // Detect clothing fresh
    const detected = await analyzeClothing(file);
    const { type, color, style } = detected;

    // Normalize color
    const colorMap = { "light blue":"blue", "dark blue":"blue", "light red":"red", "dark red":"red" };
    const normalizedColor = colorMap[color.toLowerCase()] || color.toLowerCase();

    // Fetch new recommendations based on detected info
    const recommendations = await getRecommendations(type, normalizedColor, style, genderSelect.value);

    // Clear previous results
    suggestionsList.innerHTML = '';
    itemDetailsList.innerHTML = '';

    // Populate results
    mainDescription.textContent = `Detected: ${type}, Color: ${color}, Style: ${style}, Gender: ${genderSelect.value}`;

    recommendations.forEach(s => {
        const li = document.createElement('li');
        li.innerHTML = `<img src="${s.image}" width="50"> ${s.item} - ${s.reason}`;
        li.style.cursor = "pointer";
        li.addEventListener('click', () => alert(`More items for ${s.item}`));
        suggestionsList.appendChild(li);
    });

    itemDetailsList.innerHTML = `<li>${type} - Color: ${color} - Style: ${style}</li>`;

    resultsSection.classList.remove('hidden');
    followUpSection.classList.remove('hidden');
});

    // 4. Populate item details
    itemDetailsList.innerHTML = '';
    itemDetailsList.innerHTML = `<li>${type} - Color: ${color} - Style: ${style}</li>`;

    resultsSection.classList.remove('hidden');
    followUpSection.classList.remove('hidden');
});

// Follow-up questions
followUpBtn.addEventListener('click', () => {
    const question = followUpInput.value.trim();
    if (!question) return;
    followUpResponse.textContent = "AI Response (placeholder): " + question;
});

// --------------------------
// Settings modal
// --------------------------
settingsBtn.addEventListener('click', () => {
    settingsModal.classList.remove('hidden');
});

// Close modal
closeBtn.addEventListener('click', () => {
    settingsModal.classList.add('hidden');
});

// Close by clicking outside modal content
settingsModal.addEventListener('click', (e) => {
    if (e.target === settingsModal) {
        settingsModal.classList.add('hidden');
    }
});

// Sync gender between modal and main page
modalGender.addEventListener('change', () => {
    genderSelect.value = modalGender.value;
});
