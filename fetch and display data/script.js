const userList = document.getElementById("userList");
const reloadBtn = document.getElementById("reloadBtn");

function createUserCard(user) {
  return `
    <div class="user-card">
      <h3>${user.name}</h3>
      <p><strong>Username:</strong> ${user.username}</p>
      <p><strong>Email:</strong> <a href="mailto:${user.email}">${user.email}</a></p>
      <p><strong>City:</strong> ${user.address.city}</p>
      <p><strong>Company:</strong> ${user.company.name}</p>
    </div>
  `;
}

function displayUsers(users) {
  userList.innerHTML = users.map(createUserCard).join("");
}

function fetchUserData() {
  userList.innerHTML = "<p>Loading user profiles...</p>";

  fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => {
      if (!res.ok) throw new Error("API not responding correctly.");
      return res.json();
    })
    .then(data => displayUsers(data))
    .catch(err => {
      userList.innerHTML = `<p style="color:red;">Oops! Something went wrong: ${err.message}</p>`;
    });
}

// Initial fetch
fetchUserData();
reloadBtn.addEventListener("click", fetchUserData);
