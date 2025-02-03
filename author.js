const form_author = document.querySelector(".form_authors");
const first_name = document.querySelector(".first_name");
const last_name = document.querySelector(".last_name");
const phone_number = document.querySelector(".phone_number");
const list_authors = document.querySelector(".list_authors");

let editId = null;

form_author.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    first_name.value === "" ||
    last_name.value === "" ||
    phone_number.value === ""
  ) {
    alert("Please fill all the fields");
    return;
  }

  let data = {
    first_name: first_name.value,
    last_name: last_name.value,
    phone_number: phone_number.value,
  };

  if (editId) {
    updateAuthor(editId, data);
  } else {
    addAuthor(data);
  }
});

function addAuthor(data) {
  fetch("https://679505fcaad755a134eb02e3.mockapi.io/api/authors", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Author added successfully:", data);
      getAuthors();
      alert("Author Added Successfully");

      first_name.value = "";
      last_name.value = "";
      phone_number.value = "";
    });
}

function updateAuthor(id, data) {
  fetch(`https://679505fcaad755a134eb02e3.mockapi.io/api/authors/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Author updated successfully:", data);
      getAuthors();
      alert("Author Updated Successfully");

      first_name.value = "";
      last_name.value = "";
      phone_number.value = "";
      editId = null;
    });
}

function getAuthors() {
  fetch("https://679505fcaad755a134eb02e3.mockapi.io/api/authors")
    .then((response) => response.json())
    .then((data) => {
      console.log("data : ", data);
      list_authors.innerHTML = "";

      data.forEach((author) => {
        let li = document.createElement("li");
        li.classList.add(
          "author",
          "flex",
          "gap-5",
          "justify-center",
          "items-center"
        );
        li.innerHTML = `
        <div class="flex flex-col gap-2 first_name border rounded-lg border-green-600 p-3">
          <p class="border-b border-blue-400 p-1">Full name: ${author.first_name} ${author.last_name}</p>
          <p>Phone number: ${author.phone_number}</p>
          <div class="flex gap-2">
          <button class="text-red-500 cursor-pointer border flex-grow-1 p-2 rounded-lg" onclick="deleteAuthor('${author.id}')">Delete</button>
          <button class="edit_author text-yellow-500 cursor-pointer flex-grow-1 border p-2 rounded-lg" onclick="editAuthor('${author.id}')">Edit</button>
          </div>
        </div>
        `;
        list_authors.appendChild(li);
      });
    });
}

// delete author
async function deleteAuthor(id) {
  console.log("delete clicked");

  let res = await fetch(
    `https://679505fcaad755a134eb02e3.mockapi.io/api/authors/${id}`,
    { method: "DELETE" }
  );

  if (res.ok) {
    console.log(`Deleted ITEM with ID: ${id}`);
    document
      .querySelector(`button[onclick="deleteAuthor('${id}')"]`)
      .parentElement.parentElement.remove();
  } else {
    console.error("Failed to delete author");
  }
}

// edit author
async function editAuthor(id) {
  console.log("edit clicked");

  let res = await fetch(
    `https://679505fcaad755a134eb02e3.mockapi.io/api/authors/${id}`
  );
  let author = await res.json();

  first_name.value = author.first_name;
  last_name.value = author.last_name;
  phone_number.value = author.phone_number;

  editId = id;
}

getAuthors();
