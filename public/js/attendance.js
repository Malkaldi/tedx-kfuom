document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("checkInForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const student_number = document.getElementById("student_number").value;
    const data = { student_number: student_number };

    fetch("/api/attendance/mark-attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        let messageElement = document.getElementById("message");
        let statusBox = document.getElementById("statusBox");
        messageElement.innerHTML = ""; // Clear previous messages

        // Set the message text
        messageElement.textContent = data.message;

        // Set the status box color and text based on the 'status' field
        switch (data.status) {
          case "Attended":
            statusBox.className = "status-box message-success";
            statusBox.textContent = "Attended";
            break;
          case "Not Attended":
            statusBox.className = "status-box message-info";
            statusBox.textContent = "Not Attended";
            break;
          case "Not in the Database":
            statusBox.className = "status-box message-error";
            statusBox.textContent = "Not in the Database";
            break;
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        document.getElementById("message").textContent = "An error occurred. Please try again.";
      });
  });
});
