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
const closeBtn = document.querySelector('.closeBtn');
const modalGender = document.getElementById('modalGender');
const genderSelect = document.getElementById('gender');

// Placeholder data function
function getPlaceholderRecommendations() {
    return {
        description: "You are wearing a casual blue shirt.",
        suggestions: [
            { item: "Slim black jeans", reason: "Pairs with your shirt for a casual look", image: "images/placeholder.png" },
            { item: "White sneakers", reason: "Complements the blue shirt", image: "images/placeholder.png" },
            { item: "Gray zip hoodie", reason: "Adds a casual layer for cooler days", image: "images/placeholder.png" }
        ],
        details: [
            { item: "Blue shirt", material: "Cotton" },
            { item: "Black jeans", material: "Denim" },
            { item: "White sneakers", material: "Leather" }
        ]
    };
}

analyzeBtn.addEventListener('click', () => {
    if (!imageInput.files[0]) return alert("Please upload an image.");
    
    const gender = genderSelect.value;
    const data = getPlaceholderRecommendations();
    
    mainDescription.textContent = data.description + ` Gender: ${gender}`;
    
    suggestionsList.innerHTML = '';
    data.suggestions.forEach(s => {
        const li = document.createElement('li');
        li.innerHTML = `<img src="${s.image}" alt="${s.item}" width="50"> ${s.item} - ${s.reason}`;
        li.style.cursor = "pointer";
        li.addEventListener('click', () => {
            alert(`Show more items that go with ${s.item} (placeholder)`);
        });
        suggestionsList.appendChild(li);
    });

    itemDetailsList.innerHTML = '';
    data.details.forEach(d => {
        const li = document.createElement('li');
        li.textContent = `${d.item} - Material: ${d.material}`;
        itemDetailsList.appendChild(li);
    });

    resultsSection.classList.remove('hidden');
    followUpSection.classList.remove('hidden');
});

followUpBtn.addEventListener('click', () => {
    const question = followUpInput.value.trim();
    if (!question) return;
    followUpResponse.textContent = "AI Response: This is a placeholder answer based on your question: " + question;
});

// Settings modal
settingsBtn.addEventListener('click', () => settingsModal.classList.remove('hidden'));
closeBtn.addEventListener('click', () => settingsModal.classList.add('hidden'));
modalGender.addEventListener('change', () => {
    genderSelect.value = modalGender.value;
});
