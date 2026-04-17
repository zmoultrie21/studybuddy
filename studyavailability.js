document.addEventListener("DOMContentLoaded", function () {
console.log("studyavailability.js connected");

  const availabilityList = document.getElementById("studyspaceAvailabilityList");

  // This is the study soace list along with their details. Also,, these are availability limits for each space.
  const availableSpaces = [
    { spaceName: "Marx Library",
       building: "Marx Library", type: "Library", clicks: 0, maxLimit: 5,
       time: "Hours: 8:00 AM – 10:00 PM"},
    { spaceName: "Marx Library Learning Commons",
       building: "Marx Library", type: "Library", clicks: 0, maxLimit: 4, 
       time: "Hours: 8:00 AM – 10:00 PM"},
    { spaceName: "Center for Academic Excellence",
       building: "Marx Library", type: "Academic Support", clicks: 0, maxLimit: 3,
       time: "Hours: 8:00 AM – 5:00 PM"},
    { spaceName: "Charles M. Baugh Biomedical Library",
       building: "Biomedical Library", type: "Library", clicks: 0, maxLimit: 4,
       time: "Hours: 8:00 AM – 10:00 PM" },
    { spaceName: "Allied Health Study Area",
       building: "Health Sciences", type: "Study Area", clicks: 0, maxLimit: 4,
       time: "Hours: 8:00 AM – 10:00 PM" },
    { spaceName: "Student Center Lounge",
       building: "Student Center", type: "Lounge", clicks: 0, maxLimit: 5,
       time: "Hours: 10:00 AM – 11:00 PM"},
    { spaceName: "Camellia Hall Study Rooms",
       building: "Residence Halls", type: "Residence Hall", clicks: 0, maxLimit: 4,
       time: "Hours: 8:00 AM – 11:00 PM" },
    { spaceName: "Azalea Hall Study Rooms",
       building: "Residence Halls", type: "Residence Hall", clicks: 0, maxLimit: 4,
       time: "Hours: 8:00 AM – 11:00 PM" },
    { spaceName: "Academic Services Center",
       building: "Academic Services Center", type: "Academic Support", clicks: 0, maxLimit: 3,
       time: "Hours: 8:00 AM – 5:00 PM" },
    { spaceName: "Shelby Hall Room 1302",
       building: "Shelby Hall", type: "Study Hall", clicks: 0, maxLimit: 5,
       time: "Hours: 8:00 AM – 11:00 PM" },
    { spaceName: "Mitchell College of Business Study Lounge",
       building: "Mitchell College of Business", type: "Lounge", clicks: 0, maxLimit: 5,
       time: "Hours: 8:00 AM – 11:00 PM" }
  ];

  // This determines the availability status based on the number of reservations
  function retrieveStatus(clicks, maxLimit) {
    if (clicks >= maxLimit) return "Full";
    if (clicks >= maxLimit - 2) return "Limited";
    return "Available";
  }

  function badgeClass(status) {
    if (status === "Available") return "badge-available";
    if (status === "Limited") return "badge-limited";
    return "badge-full";
  }


  function renderSpaces() {
    availabilityList.innerHTML = availableSpaces.map((space, index) => {
      const spaceStatus = retrieveStatus(space.clicks, space.maxLimit);

      let studySessionText = space.sessionActive 
  ? `<div class="timer">Study Session Active (10 sec)</div>` 
  : "";

    return `
    <div class="space-item" data-index="${index}">
    <div>
      <div class="space-title">${space.spaceName}</div>
      <div class="space-sub">${space.building} - ${space.type}</div>
      <div class="space-time">${space.time}</div>
      <div class="space-clicks">Reservations: ${space.clicks}</div>
      ${studySessionText}
    </div>

    <span class="badge ${badgeClass(spaceStatus)}">${spaceStatus}</span>

    <div class="space-actions">
      <button onclick="reserveStudySpot(${index})">Reserve Spot</button>
      <button onclick="beginStudySession(${index})">Begin Study Session</button>
    </div>
  </div>
`;
    }).join("");
  }

  window.reserveStudySpot = function (s) {
  if (availableSpaces[s].clicks >= availableSpaces[s].maxLimit) return;

  availableSpaces[s].clicks += 1;
  renderSpaces();
};

window.beginStudySession = function (s) {
  const studySpace = availableSpaces[s];

  if (studySpace.clicks >= studySpace.maxLimit) return;

  studySpace.clicks += 1;
  studySpace.sessionActive = true;
  renderSpaces();

  // This is timer for each study session
  setTimeout(() => {
    if (studySpace.clicks > 0) {
      studySpace.clicks -= 1;
    }
    studySpace.sessionActive = false;
    renderSpaces();
  }, 10000); 
}

 renderSpaces(); 

});
