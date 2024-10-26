// Get query parameter from URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Get the blog ID from the URL
const blogId = getQueryParam("blogId");

// Fetch blogs from LocalStorage
let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

// Find the blog with the matching ID
const blog = blogs.find((b) => b.id == blogId);
console.log(blog.url);

if (blog) {
  // If the blog exists, display its details on the page
  document.getElementById("blogTitle").textContent = blog.title;
  document.getElementById("blogDescription").textContent = blog.description;
  document.getElementById("blogContent").textContent = blog.content;
  document.getElementById("blogImage").src = blog.url;
} else {
  // If no blog is found with the given ID, display an error message
  document.getElementById("blogTitle").textContent = "Blog not found";
}
