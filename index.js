document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm_password").value;
        const role = document.getElementById("role").value;

        // Validate inputs
        if (!name || !email || !password || !confirmPassword) {
            alert("All fields are required!");
            return;
        }

        // Enhanced email validation
        if (!/\S+@\S+\.\S+/.test(email)) {
            alert("Please enter a valid email address!");
            return;
        }

        const commonDomains = ["gmail.com", "yahoo.com", "outlook.com"];
        const emailDomain = email.split("@")[1];

        if (!commonDomains.includes(emailDomain)) {
            alert("Please use a common email provider!");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Prepare data for backend
        const formData = {
            name,
            email,
            password,
            role
        };

        try {
            const response = await fetch("http://localhost/login/register.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                alert("Registration successful! Redirecting to login...");
                window.location.href = "Login.html"; // Redirect to login page
            } else if(result.redirect){
                alert("account exists");
                window.location.href = result.redirect;
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Registration failed. Please try again.");
        }
    });
});
