const express = require("express");
const app = express();
app.use(express.json());
const path = require("path");
const hubspotToken = process.env.HUBSPOT_APP_KEY;
const corsMiddleware = require("./middleware/corsMiddleware");

app.listen(process.env.PORT, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);
app.use(corsMiddleware);

app.get("/proxy/contacts", (req, res) => {
  res.sendFile(path.join(__dirname, "contact.html"));
});

app.post("/proxy/contacts", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.hubapi.com/crm/v3/objects/contacts",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${hubspotToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    );
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
