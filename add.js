let title = document.querySelector("#title");
let description = document.querySelector("#desc");
let poster = document.querySelector("#poster");
// let author_id = document.querySelector("#author_id");
let select = document.querySelector("#select");
let form = document.querySelector("form");

// get authours here
function getAuthor() {
  fetch("https://679505fcaad755a134eb02e3.mockapi.io/api/authors")
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);
      data.forEach((author) => {
        console.log("authors : ", author);

        let option = document.createElement("option");
        option.value = author.id;

        option.textContent = author.first_name;
        select.appendChild(option);
      });
    });
}
getAuthor();

// add things here
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = {
    title: title.value,
    description: description.value,
    poster: poster.value,
    authorId: select.value,
    author: select.options[select.selectedIndex].text,
  };

  //   console.log("select : ", select);

  function addData() {
    fetch("https://679505fcaad755a134eb02e3.mockapi.io/api/blog-list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data added successfully:", data);
        alert("Data Added Successfully");
        window.location.href = "index.html";
      });
  }
  if (title.value === "" || description.value === "" || poster.value === "") {
    alert("Please fill all the fields");
    return;
  }
  addData();
});
