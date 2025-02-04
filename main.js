const List = document.querySelector(".list");
const table_body = document.querySelector(".table_body");

let data;
function getData() {
  return fetch("https://679505fcaad755a134eb02e3.mockapi.io/api/blog-list", {
    headers: { method: "GET" },
  })
    .then((response) => response.json())
    .then((data) => renderData(data));
}

getData();
function renderData(data) {
  console.log(data);
  table_body.innerHTML = "";

  data.forEach((item, index) => {
    // console.log(item);
    const tr = document.createElement("tr");

    tr.classList.add(
      "odd:bg-gray-100",
      "even:bg-gray-200",
      "hover:bg-gray-300",
      "transition"
    );
    tr.innerHTML = `
      <td class="px-6 py-4">${index + 1}</td>
      <td class="px-6 py-4">${item.title}</td>
      <td class="px-6 py-4">${item.author}</td>
      <td class="px-6 py-4">${item.category}</td>
      <td class="px-6 py-4">${item.description}</td>   
      <td class="px-6 py-4">${formatTime(item.created_at)}</td>  
      <td class="text-left px-6"> 
      <button class="py-4 delete cursor-pointer text-red-500" onclick="deleteBtn(${
        item.id
      }, ${item.authorId})">Delete</button>
      </td>
      <td class="text-left px-6">
      <a href="edit.html?id=${item.id}">  
      <button class="py-4 edit cursor-pointer text-yellow-500" onclick="editBtn(${
        item.id
      })">Edit</button>
      </a> 
      </td>
      `;
    table_body.appendChild(tr);
  });
}
async function deleteBtn(id, authorId) {
  console.log("delete clicked");
  if (!authorId) {
    alert(
      "You can't delete this item. Please edit and assign an author first."
    );
    return;
  }

  let res = await fetch(
    `https://679505fcaad755a134eb02e3.mockapi.io/api/authors/${authorId}/blog-list/${id}`,
    { method: "DELETE" }
  );
  let data = await res.json();
  console.log("deleted ITEM : ", data);
  if (res) {
    getData();
  } else {
    console.error("Failed to delete item");
  }
}

// time format function
function formatTime(time) {
  let date = new Date(time);

  let month = String(date.getMonth() + 1).padStart(2, "0");
  let day = String(date.getDate()).padStart(2, "0");
  let year = String(date.getFullYear()).slice(-2);
  let hours = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");
  let seconds = String(date.getSeconds()).padStart(2, "0");
  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
}

console.log(formatTime("2025-01-30T00:55:10.096Z"));

function navigate(location) {
  window.location.pathname = location;
}
