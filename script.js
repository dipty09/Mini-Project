document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const errorMessage = document.createElement("p");
    errorMessage.style.color = "red";
    form.appendChild(errorMessage);

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        if (!email || !password) {
            errorMessage.textContent = "All fields are required!";
            return;
        }

        // Prepare data for backend
        const formData = { email, password };

        try {
            const response = await fetch("http://localhost/login/login.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                alert("Login successful! Redirecting...");
                window.location.href = "Notes.html"; // Redirect to the user's dashboard
            } else {
                errorMessage.textContent = result.message;

                // If email is not found, redirect to register page after 3 seconds
                if (result.redirect) {
                    setTimeout(() => {
                        window.location.href = result.redirect;
                    }, 3000); // Redirect after 3 seconds
                }
            }
        } catch (error) {
            // console.error("Error:", error);
            errorMessage.textContent = "Login failed. Please try again.";
        }
    });
});