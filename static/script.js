/**
 * Kawaii Nail Studio - Unified Core UI Engine
 * Features: Lightbox Image Gallery & Interactive Captcha Form Validation
 */

// Global state tracking for UI components
const UIState = {
    lightboxElement: null,
    lightboxImageElement: null
};

// Global state tracking for booking form safety
const FormState = {
    generatedCaptchaText: "",
    maxCaptchaLength: 6
};

// Auto-run initialization when the DOM is fully parsed
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lightbox references
    UIState.lightboxElement = document.getElementById('lightbox');
    UIState.lightboxImageElement = document.getElementById('lightbox-img');
    document.addEventListener('keydown', handleGlobalKeydown);

    // 2. Initialize Booking Captcha logic
    generateCaptcha();
    
    // Clear out error text warning markers instantly as the user types
    const captchaInput = document.getElementById('captchaInput');
    if (captchaInput) {
        captchaInput.addEventListener('input', () => {
            const errorElement = document.getElementById('captchaError');
            if (errorElement) errorElement.textContent = "";
        });
    }
});

/* ==========================================================================
   1. INTERACTIVE LIGHTBOX ZOOM ENGINE
   ========================================================================== */

/**
 * Triggers the lightbox window display to showcase image artwork details
 * @param {string} imageSrc - The source path string of the selected image target
 */
function openLightbox(imageSrc) {
    if (!UIState.lightboxElement || !UIState.lightboxImageElement) return;

    // Load the high-quality target source asset into the structural modal box container
    UIState.lightboxImageElement.src = imageSrc;
    
    // Display the block layout component container
    UIState.lightboxElement.style.display = 'flex';
    
    // Force a small reflow pause cycle to ensure the CSS opacity animation renders smoothly
    setTimeout(() => {
        UIState.lightboxElement.classList.add('show');
    }, 10);
}

/**
 * Closes the lightbox modal viewport and purges active view states
 */
function closeLightbox() {
    if (!UIState.lightboxElement) return;

    // Fade out out of view via operational class state rules
    UIState.lightboxElement.classList.remove('show');

    // Wait until the transition finishes before flipping the display properties back to hidden
    setTimeout(() => {
        UIState.lightboxElement.style.display = 'none';
        if (UIState.lightboxImageElement) {
            UIState.lightboxImageElement.src = ''; // Clean up memory footprint allocations
        }
    }, 300); // Matches the 0.3s duration token set in your style rules
}

/**
 * Handles keyboard strokes to close modal configurations gracefully
 * @param {KeyboardEvent} event - System keystroke context parameters
 */
function handleGlobalKeydown(event) {
    if (event.key === 'Escape' || event.key === 'Esc') {
        if (UIState.lightboxElement && UIState.lightboxElement.classList.contains('show')) {
            closeLightbox();
        }
    }
}

/* ==========================================================================
   2. FORM VALIDATION & CAPTCHA SECURITY PIPELINE
   ========================================================================== */

/**
 * Generates a random alphanumeric security token string layout and renders it to the screen
 */
function generateCaptcha() {
    const textDisplayField = document.getElementById('captchaText');
    if (!textDisplayField) return;

    // Standard character pool (omitting ambiguous characters like 0, O, l, I)
    const characterPool = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
    let tokenBuffer = "";

    for (let i = 0; i < FormState.maxCaptchaLength; i++) {
        const randomIndex = Math.floor(Math.random() * characterPool.length);
        tokenBuffer += characterPool.charAt(randomIndex);
    }

    // Save token state securely and update view display contents
    FormState.generatedCaptchaText = tokenBuffer;
    textDisplayField.textContent = tokenBuffer;
    
    // Clear out any old leftover user inputs and errors from previous attempts
    const inputField = document.getElementById('captchaInput');
    const errorElement = document.getElementById('captchaError');
    if (inputField) inputField.value = "";
    if (errorElement) errorElement.textContent = "";
}

/**
 * Validates form structure parameters before allowing transmission pipelines to process data
 * @param {Event} event - HTML standard form submission context parameters
 */
function handleFormSubmit(event) {
    // Stop the browser from executing its default refreshing behavior cycle
    event.preventDefault();

    const userInput = document.getElementById('captchaInput').value.trim();
    const errorElement = document.getElementById('captchaError');

    // Security check: Case-sensitive match validation enforcement rules
    if (userInput !== FormState.generatedCaptchaText) {
        if (errorElement) {
            errorElement.textContent = "❌ Verification code is incorrect. Please try again.";
            errorElement.style.color = "#ff4d6d"; // Soft pastel red alert
        }
        // Force a security refresh cycle to break automated brute-forcing attempts
        generateCaptcha();
        return;
    }

    // Capture complete client form state entries securely
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        service: document.getElementById('service').value,
        timestamp: new Date().toISOString()
    };

    // Execute standard mock visual response confirmation handling
    processBookingPipeline(formData);
}

/**
 * Mock transmission handler mimicking real production system pipelines
 * @param {Object} data - Processed sanitised structural payload packages
 */
function processBookingPipeline(data) {
    console.log("Transmission Pipeline Initialized with payload:", data);
    
    // Display a beautiful alert feedback layout to the user
    alert(`✨ Thank you, ${data.fullName}!\nYour appointment request for "${data.service}" has been submitted successfully.\n\nWe look forward to seeing you at the studio! 🌸`);
    
    // Reset structural form parameters completely for future inputs
    const formElement = document.getElementById('registrationForm');
    if (formElement) formElement.reset();
    
    // Regenerate a fresh verification token string layout for the next transaction
    generateCaptcha();
}
