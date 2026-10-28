
let courseFaculty = {
    "Python Programming": ["Twinkle Sehgal" ,"Praveen Yadav","Krisshna Sharma"],
    "Mathematics": ["Pradeep kumar","Sushma sehrawat"],
    "Internet Programming": ["Khushi Sharma","Abhishek Kumar","Gulamuddin khan"],
    "Environmental Studies": ["Atul Mahlotra","Nida Khan"]
};

let courseSelect = document.getElementById("course");
let facultySelect = document.getElementById("faculty");

courseSelect.addEventListener("change", function() {
    facultySelect.innerHTML = "";

    let firstOption = document.createElement("option");
    firstOption.value = "";
    firstOption.textContent = "Choose a faculty member";
    facultySelect.appendChild(firstOption);

    let facultyList = courseFaculty[courseSelect.value] || [];

    for (let i = 0; i < facultyList.length; i++) {
        let option = document.createElement("option");
        option.value = facultyList[i];
        option.textContent = facultyList[i];
        facultySelect.appendChild(option);
    }
});

document.getElementById("feedbackForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let studentId = sessionStorage.getItem("studentId");
    let course = courseSelect.value;
    let faculty = facultySelect.value;
    let rating = document.getElementById("rating").value;
    let comments = document.getElementById("comments").value.trim();
    let anonymous = document.getElementById("anonymous").checked;
    let message = document.getElementById("feedbackMessage");

    if (!studentId) {
        message.textContent = "Please log in again before submitting feedback.";
        return;
    }

    if (!course || !faculty || !rating || comments === "") {
        message.textContent = "Please complete all fields.";
        return;
    }

    if (!courseFaculty[course] ||
        !courseFaculty[course].includes(faculty)) {
        message.textContent =
            "The selected faculty member does not match this course.";
        return;
    }

    let allFeedback = JSON.parse(
        localStorage.getItem("feedbackData") || "[]"
    );

    let duplicate = false;

    for (let i = 0; i < allFeedback.length; i++) {
        if (
            allFeedback[i].studentId === studentId &&
            allFeedback[i].course === course &&
            allFeedback[i].faculty === faculty
        ) {
            duplicate = true;
            break;
        }
    }

    if (duplicate) {
        message.textContent =
            "You have already submitted feedback for this course and faculty member.";
        return;
    }

    let feedback = {
        studentId: studentId,
        course: course,
        faculty: faculty,
        rating: Number(rating),
        comments: comments,
        anonymous: anonymous,
        date: new Date().toLocaleDateString()
    };

    allFeedback.push(feedback);

    localStorage.setItem("feedbackData", JSON.stringify(allFeedback));

    if (anonymous) {
        message.textContent = "Your anonymous feedback has been saved.";
    } else {
        message.textContent = "Your feedback has been saved.";
    }

    document.getElementById("feedbackForm").reset();
    facultySelect.innerHTML =
        '<option value="">Choose a course first</option>';
});
