document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("checkInForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const studentId = document.getElementById("studentId").value;
      const data = { studentId: studentId };

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
          messageElement.innerHTML = ""; // Clear previous messages

          // Create a new span element to hold the message
          let span = document.createElement("span");

          // Check the type of the message and add the corresponding class
          if (data.type === "error") {
            span.classList.add("message-error");
          } else if (data.type === "success") {
            span.classList.add("message-success");
          } else if (data.type === "not-registered") {
            // If it's a not-registered type, you might want to split the message for different styles
            let parts = data.message.split("\n");
            span.innerHTML = `<span class="message-error">${parts[0]}</span><br><span class="message-info">${parts[1]}</span>`;
          } else {
            // If there's no type or it's any other type, use a default class
            span.classList.add("message-info");
          }

          // If the message doesn't need to be split, set the textContent of span
          if (span.innerHTML === "") {
            span.textContent = data.message;
          }

          // Append the span to the messageElement
          messageElement.appendChild(span);
        })

        .catch((error) => {
          console.error("Fetch error:", error);
          document.getElementById("message").textContent =
            "An error occurred. Please try again.";
        });
    });
});
