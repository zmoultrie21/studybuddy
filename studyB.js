console.log("The Javascript for StudyBuddy is connected");
const spaceResults = document.getElementById("spaceResults");
const searchingInput = document.getElementById("searchStudySpace")
const filterforType = document.getElementById("filterforType")
const filterforBuilding = document.getElementById("filterforBuilding")


const spacesforStudy = [
    { spaceName: "Marx Library", building: "Marx Library", type: "Library" },
    { spaceName: "Marx Library Learning Commons", building: "Marx Library", type: "Library" },
    { spaceName: "Center for Academic Excellence", building: "Marx Library", type: "Academic Support" },
    { spaceName: "Charles M. Baugh Biomedical Library", building: "Biomedical Library", type: "Library" },
    { spaceName: "Allied Health Study Area", building: "Health Sciences", type: "Study Area" },
    { spaceName: "Student Center Lounge", building: "Student Center", type: "Lounge" },
    { spaceName: "Camellia Study Rooms", building: "Residence Halls", type: "Residence Hall" },
    { spaceName: "Azalea Hall Study Rooms", building: "Residence Halls", type: "Residence Hall" },
    { spaceName: "Academic Services Center", building: "Academic Services Center", type: "Academic Support"},
    { spaceName: "Shelby Hall Room 1302", building: "Shelby Hall", type: "Study Hall"},
    { spaceName: "Mitchell College of Businnes Study Lounge", building: "Mitchell College of Business", type: "Lounge"}


];

searchingInput.addEventListener("input", applyFilters);
filterforType.addEventListener("change", applyFilters);
filterforBuilding.addEventListener("change", applyFilters);

function applyFilters() {
    const spaceText = searchingInput.value.toLowerCase();
    const spaceType = filterforType.value;
    const building = filterforBuilding.value;

    const spaceFiltered = spacesforStudy.filter(studySpace =>
    (studySpace.spaceName.toLowerCase().includes(spaceText) || 
    studySpace.building.toLowerCase().includes(spaceText)) &&
    (spaceType === "" || studySpace.type === spaceType) &&
    (building === "" || studySpace.building === building)
    );
    
    renderStudySpaces(spaceFiltered)
}

function renderStudySpaces(spaceList) {
    spaceResults.innerHTML = "";

    if (spaceList.length === 0) {
        spaceResults.innerHTML = "<p>No study spaces were found.</p>"
        return;
    }

    const ul = document.createElement("ul")

    spaceList.forEach(studySpace => {
        const li = document.createElement("li");
        li.textContent = `${studySpace.spaceName} - ${studySpace.building} (${studySpace.type})`;
        ul.appendChild(li);
    });

    spaceResults.appendChild(ul);
}

renderStudySpaces(spacesforStudy)