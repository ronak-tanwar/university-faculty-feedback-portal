

document.getElementById("studentLoginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let studentId = document.getElementById("studentId").value.trim();

    if (studentId === "") {
        document.getElementById("message").innerText =
            "Please enter your Student ID.";
        return;
    }

    sessionStorage.setItem("studentId", studentId);

    window.location.href = "feedback.html";
});

