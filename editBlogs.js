let title = document.querySelector("#title");
let description = document.querySelector("#desc");
let image = document.querySelector("#poster");
// let author_id = document.querySelector("#author_id");
let select = document.querySelector("#select");
let form = document.querySelector("form");

// get id
let id = window.location.search.split("=")[1];
console.log("ID : ", id);

// get authours here

async function getAuthor() {
  await fetch("https://679505fcaad755a134eb02e3.mockapi.io/api/authors")
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);
      data.forEach((author) => {
        // console.log("authors : ", author);

        let option = document.createElement("option");
        option.value = author.id;

        option.textContent = author.first_name;
        select.appendChild(option);
      });
    });
  getBlogById();
}
// getAuthor();

async function getBlogById() {
  await fetch(`https://679505fcaad755a134eb02e3.mockapi.io/api/blog-list/${id}`)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        title.value = data.title;
        description.value = data.description;
        poster.value = data.poster;
        select.value = data.authorId;
      }
      console.log(data);
    });
}
getAuthor();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = {
    title: title.value,
    description: description.value,
    poster: poster.value,
    authorId: select.value,
    author: select.options[select.selectedIndex].text,
  };
  async function PutBlogById() {
    let res = await fetch(
      `https://679505fcaad755a134eb02e3.mockapi.io/api/blog-list/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    ).then((res) => res);
    if (res) {
      title = title.value;
      description = description.value;
      authorId = select.value;
      poster = image.value;
    }
    alert("Data Edited Successfully");
    window.location.href = "index.html";
  }
  if (title.value === "" || description.value === "" || poster.value === "") {
    alert("Please fill all the fields");
    return;
  }
  PutBlogById();
});
