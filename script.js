console.log("Mental Health Companion is running!");

// Placeholder for functionality
function placeholderFeature() {
  alert("Feature coming soon!");
}

document.addEventListener("DOMContentLoaded", () => {
    const fireButton = document.getElementById("fire-button");
    const ashesText = document.getElementById("ashes-text");
    const flamesVideoContainer = document.getElementById("flames-video-container");
    const flamesVideo = document.getElementById("flames-video");
    const burnedMessage = document.getElementById("burned-message");
  
    fireButton.addEventListener("click", () => {
      const text = ashesText.value.trim();
      if (!text) {
        alert("Please write something first!");
        return;
      }
  
      // Fade out the text
      ashesText.style.transition = "opacity 3s";
      ashesText.style.opacity = 0;
  
      // Show the flames video container and play the video
      flamesVideoContainer.style.display = "block";
      flamesVideo.currentTime = 0; // Restart the video
      flamesVideo.play();
  
      // Stop video and hide container after 8 seconds
      setTimeout(() => {
        ashesText.value = ""; // Clear the text
        ashesText.style.opacity = 1; // Reset opacity for future burns
        flamesVideo.pause(); // Pause the video
        flamesVideoContainer.style.display = "none"; // Hide the video
  
        // Show the burned message
        burnedMessage.style.display = "block";
  
        // Hide the burned message after 3 seconds
        setTimeout(() => {
          burnedMessage.style.display = "none";
        }, 3000);
      }, 6000); // 6 seconds
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("wave-canvas");
    const ctx = canvas.getContext("2d");
  
    const width = (canvas.width = window.innerWidth - 50);
    const height = (canvas.height = 300);
  
    const countdownEl = document.getElementById("countdown");
    const instructionText = document.getElementById("instruction-text");
    const prompts = [
      "Focus on your breath...",
      "Let go of distractions...",
      "Feel the rhythm of life...",
      "Embrace the moment...",
      "Find your inner peace...",
    ];
    let promptIndex = 0;
  
    let x = 0;
    let phase = 0;
    let circleY = 0;
    const waveSpeed = 0.005; // Slower wave speed for a smoother experience
    const intervalDuration = 4000; // 4 seconds per action (one full cycle)
    const gradientSpeed = 0.005;
  
    const updateInstruction = () => {
      const phases = ["Breathe In", "Hold", "Breathe Out", "Hold"];
      instructionText.textContent = phases[phase];
      countdownEl.textContent = "4";
    };
  
    const updateCountdown = () => {
      let count = 4;
      const countdownInterval = setInterval(() => {
        count -= 1;
        countdownEl.textContent = count;
  
        if (count === 0) {
          clearInterval(countdownInterval);
          phase = (phase + 1) % 4; // Move to next phase
          updateInstruction();
        }
      }, 1000);
    };
  
    const drawWave = () => {
      ctx.clearRect(0, 0, width, height);
      const gradient = ctx.createLinearGradient(0, height / 2, width, height / 2);
      gradient.addColorStop(0, "#456585");
      gradient.addColorStop(1, "#c7e6ed");
  
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
  
      // Loop through each pixel on the canvas width
      for (let i = 0; i < width; i++) {
        const y = Math.sin((x + i) * waveSpeed) * 50 + height / 2;
        ctx.lineTo(i, y);
  
        // Set circleY to the current position of the wave at the middle of the canvas
        if (i === Math.floor(width / 2)) {
          circleY = y; // Ensure circleY tracks the center of the wave
        }
      }
  
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 40;
      ctx.stroke();
  
      // Draw the yellow circle at the center of the wave
      ctx.beginPath();
      ctx.arc(width / 2, circleY, 20, 0, Math.PI * 2);
      ctx.fillStyle = "yellow";
      ctx.fill();
  
      x += 2;
  
      requestAnimationFrame(drawWave);
    };
  
    setInterval(() => {
      promptIndex = (promptIndex + 1) % prompts.length;
      document.getElementById("top-prompt").textContent = prompts[promptIndex];
    }, intervalDuration * 4);
  
    updateInstruction();
    updateCountdown();
    setInterval(updateCountdown, intervalDuration);
    drawWave();
  });

document.addEventListener("DOMContentLoaded", () => {
  const moodSelect = document.getElementById("mood");
  const reasonSelect = document.getElementById("reason");
  const journalTextarea = document.getElementById("journal");
  const saveMoodButton = document.getElementById("save-mood");
  const clearHistoryButton = document.getElementById("clear-history");
  const historyList = document.getElementById("history-list");

  // Load saved moods from localStorage
  const loadMoods = () => {
    const moods = JSON.parse(localStorage.getItem("moods")) || [];
    historyList.innerHTML = ""; // Clear current list

    moods.forEach((entry, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>Mood:</strong> ${entry.mood} <br>
        <strong>Reason:</strong> ${entry.reason} <br>
        <strong>Journal:</strong> ${entry.journal} <br>
        <em>${new Date(entry.date).toLocaleString()}</em>
      `;
      historyList.appendChild(li);
    });
  };

  // Save mood to localStorage
  const saveMood = () => {
    const mood = moodSelect.value;
    const reason = reasonSelect.value;
    const journal = journalTextarea.value.trim();
    const date = new Date().toISOString();

    if (!journal) {
      alert("Please write a journal entry before saving.");
      return;
    }

    const moods = JSON.parse(localStorage.getItem("moods")) || [];
    moods.push({ mood, reason, journal, date });
    localStorage.setItem("moods", JSON.stringify(moods));

    journalTextarea.value = ""; // Clear input
    loadMoods(); // Refresh the displayed list
  };

  // Clear mood history
  const clearHistory = () => {
    if (confirm("Are you sure you want to clear all mood history?")) {
      localStorage.removeItem("moods");
      loadMoods();
    }
  };

  saveMoodButton.addEventListener("click", saveMood);
  clearHistoryButton.addEventListener("click", clearHistory);

  // Initial load of moods
  loadMoods();
});

document.addEventListener("DOMContentLoaded", function() {
    const affirmationDisplay = document.getElementById("affirmation-display");
    const affirmationForm = document.getElementById("affirmation-form");
    const newAffirmationInput = document.getElementById("new-affirmation");
    const bowlSound = document.getElementById("bowl-sound");
    const backgroundMusic = document.getElementById("background-music");
  
    // Default affirmations
    let affirmations = [
      "I am worthy of love and kindness.",
      "I choose happiness over fear.",
      "Every day, I am growing and evolving.",
      "I am proud of all I have achieved.",
      "I trust in the process of life."
    ];
  
    // Load saved affirmations from localStorage
    if (localStorage.getItem("userAffirmations")) {
      affirmations = JSON.parse(localStorage.getItem("userAffirmations"));
    }
  
    let currentAffirmationIndex = 0;
    let affirmationInterval;
    let musicPlayed = false;  // Flag to check if music is playing
  
    // Function to play background music
    function playMusic() {
      if (!musicPlayed) {
        backgroundMusic.play();
        musicPlayed = true;
      }
    }
  
    // Function to play Tibetan singing bowl sound
    function playBowlSound() {
      bowlSound.currentTime = 0; // Reset to start
      bowlSound.play();
    }
  
    // Function to display affirmations
    function showAffirmation() {
      affirmationDisplay.textContent = affirmations[currentAffirmationIndex];
      affirmationDisplay.classList.add("fade-in");
  
      // Play the Tibetan singing bowl sound
      playBowlSound();
  
      // Set timeout to fade out affirmation after 30 seconds
      setTimeout(() => {
        affirmationDisplay.classList.remove("fade-in");
        affirmationDisplay.classList.add("fade-out");
  
        // Move to the next affirmation after the fade-out
        setTimeout(() => {
          currentAffirmationIndex = (currentAffirmationIndex + 1) % affirmations.length;
          affirmationDisplay.classList.remove("fade-out");
          showAffirmation();
        }, 5000); // 1-second fade-out duration
      }, 30000); // 30 seconds display duration
    }
  
    // Start the affirmation cycle once user interacts with the page (ensures music starts)
    document.body.addEventListener('click', function() {
      playMusic();  // Start background music after interaction
      showAffirmation(); // Show the first affirmation
    });
  
    // Handle form submission to add new affirmations
    affirmationForm.addEventListener("submit", function(event) {
      event.preventDefault();
  
      const newAffirmationText = newAffirmationInput.value.trim();
      console.log("New Affirmation Submitted:", newAffirmationText); // Debugging line
  
      if (newAffirmationText) {
        // Split the input string into an array of affirmations
        const newAffirmations = newAffirmationText.split(',').map(item => item.trim());
        affirmations = [...affirmations, ...newAffirmations];
  
        // Save to localStorage
        localStorage.setItem("userAffirmations", JSON.stringify(affirmations));
  
        // Clear the input field after submission
        newAffirmationInput.value = "";
  
        // Restart the affirmation cycle to include the new ones
        currentAffirmationIndex = affirmations.length - newAffirmations.length; // Start from the first new affirmation
        showAffirmation();
      }
    });
  });

  document.addEventListener("DOMContentLoaded", function() {
    const quotes = [
      { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
      { text: "Happiness is not something ready-made. It comes from your own actions.", author: "Dalai Lama" },
      { text: "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well.", author: "Ralph Waldo Emerson" },
      { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
      { text: "Your life is your message to the world. Make sure it's inspiring.", author: "Lori Deschene" },
      { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
      { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
      { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
      { text: "You must be the change you wish to see in the world.", author: "Mahatma Gandhi" },
      { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" }
    ];
  
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
  
    const quoteText = document.getElementById("quote-text");
    const quoteAuthor = document.getElementById("quote-author");
  
    quoteText.textContent = `"${randomQuote.text}"`;
    quoteAuthor.textContent = `- ${randomQuote.author}`;
  });