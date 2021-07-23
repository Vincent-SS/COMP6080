let simpleForm = document.forms.simple_form;
let street = document.getElementsByName("street");
let suburb = document.getElementsByName("suburb");
let postcode = document.getElementsByName("postcode");
let dob = document.getElementsByName("dob");
let buildingType = document.getElementsByTagName("select")
let features = document.getElementsByName("check");

let selectButton = document.getElementById("select-button")
let reset = document.getElementById("reset");
let output = document.getElementsByTagName("textarea");

// The textarea is not allowed for keyboard input
output[0].addEventListener("keypress", (event) => {
    event.preventDefault();
});

// helper function, calculate age
function calculateAge(dobTextCheck) {
    const now = new Date();
    const birth = new Date(dobTextCheck);
    let rawAgeYear = now.getFullYear() - birth.getFullYear();
    if (rawAgeYear !== 0) {
        let rawAgeMonth = now.getMonth() - birth.getMonth();
        if (rawAgeMonth < 0) {
            rawAgeYear--;
        } else if (rawAgeMonth === 0) {
            let rawAgeDate = now.getDate() - birth.getDate();
            if (rawAgeDate < 0) {
                rawAgeYear--;
            }
        }
    }
    return rawAgeYear;
}

// reset button resets to its default value
reset.addEventListener("click", (event) => {
    location.reload();
});

// Select All / Deselect All button
selectButton.addEventListener('click', (event) => {
    if (document.getElementById('select-button').value === "Deselect All") {
        let i = 0;
        while (i < 4) {
            document.getElementsByName("check")[i].checked = false;
            i++;
        }
        document.getElementById('select-button').value = "Select All";
    } else {
        let i = 0;
        while (i < 4) {
            document.getElementsByName("check")[i].checked = true;
            i++;
        }
        document.getElementById('select-button').value = "Deselect All";
    }
});

// Checkbox
let i = 0;
while (i < 4) {
    features[i].addEventListener('click', (event) => {
        if (document.getElementsByName("check")[0].checked === true &&
            document.getElementsByName("check")[1].checked === true &&
            document.getElementsByName("check")[2].checked === true &&
            document.getElementsByName("check")[3].checked === true) {
                document.getElementById('select-button').value = "Deselect All";
        } else if (document.getElementsByName("check")[0].checked === false &&
            document.getElementsByName("check")[1].checked === false &&
            document.getElementsByName("check")[2].checked === false &&
            document.getElementsByName("check")[3].checked === false) {
                document.getElementById('select-button').value = "Select All";
        }
    });
    i++;
}

// Check validation of each input and give output
function handler(event) {
    const streetText = simpleForm.elements.street.value;
    const suburbText = simpleForm.elements.suburb.value;
    const postcodeText = simpleForm.elements.postcode.value;
    const dobText = simpleForm.elements.dob.value;
    const buildingTypeText = simpleForm.elements.type.value;
    const letters = /^[A-Za-z]+$/;
    const numbers = /^[0-9]+$/;
    const validDob = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
    dobTextCheck = dobText.substring(3,6) + dobText.substring(0, 3) + dobText.substring(6)

    if (streetText === '' || !streetText.match(letters) || streetText.length < 3 || streetText.length > 50) {
        const streetError = "Please input a valid street name";
        document.getElementById('output').textContent = streetError;
    } else if (suburbText === '' || !suburbText.match(letters) || suburbText.length < 3 || suburbText.length > 50) {
        const suburbError = "Please input a valid suburb";
        document.getElementById('output').textContent = suburbError;
    } else if (postcodeText === '' || !postcodeText.match(numbers) || postcodeText.length !== 4) {
        const postcodeError = "Please input a valid postcode";
        document.getElementById('output').textContent = postcodeError;
    } else if (dobText === '' || !dobText.match(validDob) || isNaN(Date.parse(dobTextCheck))) {
        const dobError = "Please enter a valid date of birth";
        document.getElementById('output').textContent = dobError;
    } else {
        age = calculateAge(dobTextCheck);
        let aAn = "an Apartment";
        if (buildingTypeText === "House") {
            aAn = "a House";
        }
        let i = 0;
        let count = 0;
        let singleIndex = -1;
        let featuresSummary = "";
        while (i < 4) {
            if (document.getElementsByName("check")[i].checked === true) {
                count++;
                singleIndex = i;
            }
            i++;
        }
        if (count === 0) {
            featuresSummary = "no features"
        } else if (count === 1) {
            featuresSummary = document.getElementsByName("check")[singleIndex].value;
        } else {
            i = 0;
            let newCount = 0;
            while (i < 4) {
                if (document.getElementsByName("check")[i].checked === true) {
                    featuresSummary += document.getElementsByName("check")[i].value + ", ";
                    newCount++;
                    if (newCount+1 === count) {
                        featuresSummary += "and ";
                    }
                }
                i++;
            }
            featuresSummary = featuresSummary.slice(0, -2)
        }
        summary = "Your are " + age + " years old, and your address is " + streetText + " St, " + suburbText + ", " + postcodeText +", Australia. Your building is " + aAn + ", and it has " + featuresSummary
        document.getElementById('output').textContent = summary;
    }
}

simpleForm.addEventListener('keyup', handler, false);
simpleForm.addEventListener('change', handler, false);
for(let j = 0; j < 4; j++) {
    features[j].addEventListener('click', handler, false);
}
selectButton.addEventListener('click', handler, false);