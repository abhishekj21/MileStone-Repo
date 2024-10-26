// Modal handling
const modal = document.getElementById("modal");
const addBlogBtn = document.getElementById("addBlogBtn");
const closeBtn = document.querySelector(".close-btn");

// Show modal when Add Blog button is clicked
addBlogBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

// Close modal when X button is clicked
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal if user clicks outside the modal
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Handle form submission
const blogForm = document.getElementById("blogForm");
blogForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const blogUrl = document.getElementById("blogUrl").value;
  const blogTitle = document.getElementById("blogTitle").value;
  const blogDescription = document.getElementById("blogDescription").value;
  const blogContent = document.getElementById("blogContent").value;

  // Get existing blogs from LocalStorage or initialize an empty array
  let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  // Code to add the blog details to LocalStorage or display it dynamically
  console.log("Blog Added:", {
    blogUrl,
    blogTitle,
    blogDescription,
    blogContent,
  });

  // Create a new blog object
  const newBlog = {
    id: Date.now(), // Unique ID based on timestamp
    url: blogUrl,
    title: blogTitle,
    description: blogDescription,
    content: blogContent,
  };

  // Add the new blog to the blogs array
  blogs.push(newBlog);
  // Close modal after submission
  modal.style.display = "none";

  // Save the updated blogs array to LocalStorage
  localStorage.setItem("blogs", JSON.stringify(blogs));

  // Render the updated blog list dynamically
  renderBlogs();
  // Optionally clear form fields after submission
  blogForm.reset();
});

// Function to render blogs from LocalStorage
function renderBlogs() {
  const blogContainer = document.querySelector(".blog-cards");
  blogContainer.innerHTML = ""; // Clear existing content

  let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

  if (blogs.length === 0) {
    blogContainer.innerHTML =
      "<p>No blogs available. Please add a new blog!</p>";
    return;
  }
  // Loop through each blog and create a new blog card
  blogs.forEach((blog) => {
    const blogCard = `
      <div class="blog-card">
        <img
          src="${blog.url}"
          alt="${blog.title} Image"
          width="300px"
        />
        <h2>Blog Title: ${blog.title}</h2>
        <p>Blog Description: ${blog.description}</p>
        <button class="read-btn" data-blog-id="${blog.id}">Read</button>
      </div>
    `;
    blogContainer.innerHTML += blogCard;
  });
  // Attach event listeners to all "Read" buttons
  document.querySelectorAll(".read-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const blogId = this.getAttribute("data-blog-id");
      window.location.href = `read.html?blogId=${blogId}`;
    });
  });
}

// Initial render when the page loads
window.onload = renderBlogs;
