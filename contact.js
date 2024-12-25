document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    properties: {
      email: e.target.email.value,
      firstname: e.target.first_name.value,
      lastname: e.target.last_name.value,
    },
  };
  fetch("http://localhost:3000/proxy/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => console.log("Response from server:", data))
    .catch((error) => console.error("Error:", error));
});
