let inputs = document.querySelectorAll("input");
let bookmarkName = document.querySelectorAll("input")[0];
let websiteURL = document.querySelectorAll("input")[1];
let addBtn = document.querySelector("button");
let sitesDisplay = document.getElementById("tableRow");
let errorMessage = document.getElementById("error");
let closeBtn = document.getElementById("fa-x");

let bookmarkSites = JSON.parse(localStorage.getItem("site")) || [];
printSite();

// make the action when we click the button
addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  getSite();
  printSite();
  clearInputs();
});

// get data from user
function getSite() {
  if (URLValidation() && siteNameValidation()) {
    let site = {
      siteName: bookmarkName.value,
      siteURL: websiteURL.value,
    };

    bookmarkSites.push(site);
    localStorage.setItem("site", JSON.stringify(bookmarkSites));
  } else {
    if (!URLValidation() || !siteNameValidation()) {
      errorMessage.classList.replace("d-none", "d-flex");
    } else if (!URLValidation()) {
    } else if (!siteNameValidation()) {
    }
  }
}

// display the data on ui
function printSite() {
  let box = "";

  for (let i = 0; i < bookmarkSites.length; i++) {
    box += `
        <tr>
            <th>${i + 1}</th>
            <th>${bookmarkSites[i].siteName}</th>
            <th>
            <a href="${bookmarkSites[i].siteURL}" target="_blank"
            ><i class="fa-solid fa-eye"></i
            ></a>
            </th>
            <th><i class="fa-regular fa-trash-can" onclick="deleteSite(${i})"></i></th>
        </tr>
        `;
  }
  sitesDisplay.innerHTML = box;
}

// clear inputs after getting the data
function clearInputs() {
  if (URLValidation() && siteNameValidation()) {
    bookmarkName.value = "";
    websiteURL.value = "";
    bookmarkName.style.cssText = `box-shadow: none;`;
    websiteURL.style.cssText = `box-shadow: none;`;
  }
}

// delete specific bookmark
function deleteSite(index) {
  bookmarkSites.splice(index, 1);
  localStorage.setItem("site", JSON.stringify(bookmarkSites));
  printSite();
}

// VALIDATION
// validate the url
function URLValidation() {
  try {
    new URL(websiteURL.value);
    return true;
  } catch (error) {
    return false;
  }
}

// validate the bookmark name
function siteNameValidation() {
  let nameRegExp = /^\w{3,}(\s+\w+)*$/;
  if (nameRegExp.test(bookmarkName.value)) {
    return true;
  }
}

// validate while  write the data
bookmarkName.addEventListener("keyup", function () {
  if (!siteNameValidation()) {
    bookmarkName.style.cssText = `box-shadow: inset 0 0 10px 0px red;`;
  } else {
    bookmarkName.style.cssText = `box-shadow: inset 0 0 10px 0px green;`;
  }
});

websiteURL.addEventListener("keyup", function () {
  if (!URLValidation()) {
    websiteURL.style.cssText = `box-shadow: inset 0 0 10px 0px red;`;
  } else {
    websiteURL.style.cssText = `box-shadow: inset 0 0 10px 0px green;`;
  }
});

// handle how to close the error message
// from the close button
closeBtn.addEventListener("click", function () {
  errorMessage.classList.replace("d-flex", "d-none");
});

// from any area around error message
errorMessage.addEventListener("click", function (e) {
  e.target.classList.replace("d-flex", "d-none");
});
