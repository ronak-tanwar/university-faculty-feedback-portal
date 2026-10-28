
let adminForm = document.getElementById("adminLoginForm");

if (adminForm) {
    adminForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let username =
            document.getElementById("adminUsername").value.trim();

        let password =
            document.getElementById("adminPassword").value;

        if (username === "admin" && password === "admin12") {
            sessionStorage.setItem("adminLoggedIn", "yes");
            window.location.href = "admin.html";
        } else {
            document.getElementById("adminMessage").textContent =
                "Invalid username or password.";
        }
    });
}

function logout() {
    sessionStorage.removeItem("adminLoggedIn");
    window.location.href = "admin-login.html";
}

let totalElement = document.getElementById("totalFeedback");

if (totalElement) {
    if (sessionStorage.getItem("adminLoggedIn") !== "yes") {
        window.location.href = "admin-login.html";
    } else {
        showDashboard();
    }
}

function showDashboard() {
    let feedback = JSON.parse(
        localStorage.getItem("feedbackData") || "[]"
    );

    document.getElementById("totalFeedback").textContent =
        feedback.length;

    let totalRating = 0;

    for (let i = 0; i < feedback.length; i++) {
        totalRating += feedback[i].rating;
    }

    let average = 0;

    if (feedback.length > 0) {
        average = totalRating / feedback.length;
    }

    document.getElementById("averageRating").textContent =
        average.toFixed(1) + " / 5";

    showReport(feedback, "course", "courseReport");
    showReport(feedback, "faculty", "facultyReport");
    showFeedbackList(feedback);
}

function showReport(feedback, field, elementId) {
    let groups = {};

    for (let i = 0; i < feedback.length; i++) {
        let name = feedback[i][field];

        if (!groups[name]) {
            groups[name] = {
                total: 0,
                count: 0
            };
        }

        groups[name].total += feedback[i].rating;
        groups[name].count++;
    }

    let report = document.getElementById(elementId);
    report.innerHTML = "";

    let names = Object.keys(groups);

    if (names.length === 0) {
        report.textContent = "No feedback submitted yet.";
        return;
    }

    for (let i = 0; i < names.length; i++) {
        let name = names[i];
        let average = groups[name].total / groups[name].count;

        let item = document.createElement("div");
        item.className = "report-item";

        let heading = document.createElement("div");
        heading.className = "report-heading";

        let label = document.createElement("span");
        label.textContent = name;

        let score = document.createElement("strong");
        score.textContent = average.toFixed(1) + " / 5";

        heading.appendChild(label);
        heading.appendChild(score);

        let background = document.createElement("div");
        background.className = "bar-background";

        let bar = document.createElement("div");
        bar.className = "bar-fill";
        bar.style.width = (average / 5 * 100) + "%";

        background.appendChild(bar);

        let count = document.createElement("p");
        count.textContent =
            groups[name].count + " response(s)";

        item.appendChild(heading);
        item.appendChild(background);
        item.appendChild(count);

        report.appendChild(item);
    }
}

function showFeedbackList(feedback) {
    let list = document.getElementById("feedbackList");
    list.innerHTML = "";

    if (feedback.length === 0) {
        list.textContent = "No feedback submitted yet.";
        return;
    }

    for (let i = feedback.length - 1; i >= 0; i--) {
        let item = feedback[i];

        let card = document.createElement("div");
        card.className = "feedback-card";

        let heading = document.createElement("h3");
        heading.textContent = item.course + " — " + item.faculty;

        let rating = document.createElement("p");
        rating.textContent = "Rating: " + item.rating + " / 5";

        let identity = document.createElement("p");

        if (item.anonymous) {
            identity.textContent = "Submitted anonymously";
        } else {
            identity.textContent = "Student ID: " + item.studentId;
        }

        let comment = document.createElement("p");
        comment.textContent = "Comment: " + item.comments;

        let date = document.createElement("p");
        date.textContent = "Date: " + (item.date || "Not recorded");

        card.appendChild(heading);
        card.appendChild(rating);
        card.appendChild(identity);
        card.appendChild(comment);
        card.appendChild(date);

        list.appendChild(card);
    }
}
