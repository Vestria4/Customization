// content.js

// Function to create and append the customization button
function createCustomizationButton() {
    const button = document.createElement("button");
    button.textContent = "Change Customization";
    button.addEventListener("click", openCustomizationModal);
    document.body.appendChild(button);
}

// Function to open the customization modal
async function openCustomizationModal() {
    // Retrieve the access token from local storage
    const storedAccessToken = getStoredAccessToken();

    // Check if the access token is available
    if (storedAccessToken) {
        try {
            // Fetch cosmetics data
            const cosmeticsData = await fetchCosmeticsData(storedAccessToken);
            
            // Add your logic to display the customization options, color wheel, etc.
            // For simplicity, let's just log the cosmetics data to the console.
            console.log("Cosmetics data:", cosmeticsData);

            // Assuming you have a function to show the modal, e.g., showCustomizationModal();
            // showCustomizationModal(storedAccessToken, cosmeticsData);
        } catch (error) {
            console.error("Error fetching cosmetics data:", error);
        }
    } else {
        console.error("Access token not found in local storage");
    }
}

// Function to retrieve the access token from local storage
function getStoredAccessToken() {
    try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user && user.user && user.user.access_token) {
                return user.user.access_token;
            }
        }
    } catch (error) {
        console.error("Error retrieving access token from local storage:", error);
    }
    return null;
}

// Function to fetch cosmetics data
async function fetchCosmeticsData(accessToken) {
    const apiUrl = "https://api.slin.dev/grab/v1/get_shop_items?version=1";
    const response = await fetch(apiUrl, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch cosmetics data. Status: ${response.status}`);
    }

    return response.json();
}

// Execute the script when the DOM is ready
document.addEventListener("DOMContentLoaded", createCustomizationButton);
