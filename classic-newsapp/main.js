let newsTopic = "news";
const API_KEY = "9c3156037405420ca0a8d1b53bc3bd41"; // This is a public key, don't use it in production

let date = new Date();
let formattedDate = `${date.getFullYear()}-${(
  "0" +
  (date.getMonth() + 1)
).slice(-2)}-${("0" + date.getDate()).slice(-2)-1}`;
console.log(formattedDate);

const API_URL = `https://newsapi.org/v2/everything?q=${newsTopic}&from=${formattedDate}&sortBy=publishedAt&apiKey=${API_KEY}`;

// Function to fetch news data based on a given topic
async function newsFetch(topic) {
  const API_URL = `https://newsapi.org/v2/everything?q=${topic}&from=${formattedDate}&sortBy=publishedAt&apiKey=${API_KEY}`;
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    console.log(`data is`, data);
    bindData(data.articles); // Bind the fetched data to the UI
  } catch (error) {
    console.error(error);
  }
}

// Fetch news data when the window is loaded
window.addEventListener("load", () => {
  newsFetch(newsTopic);
});

// Function to bind the fetched news data to the UI
function bindData(articles) {
  const cardsContainer = document.getElementById("card-container");
  const template = document.getElementById("news-card");
  cardsContainer.innerHTML = "";
  articles.forEach((element) => {
    if (!element.urlToImage) return;
    const clone = template.content.cloneNode(true);
    fillData(clone, element); // Fill the cloned template with data
    cardsContainer.appendChild(clone);
  });
}

// Function to fill the cloned template with data
const fillData = (clone, article) => {
  const img = clone.querySelector("#img");
  const title = clone.querySelector("#news-title");
  const content = clone.querySelector("#description");
  const link = clone.querySelector("#link");

  img.src = article.urlToImage;
  title.innerHTML = article.title;
  content.innerHTML = article.content;
  link.href = article.url;
};

let activeListItem = null;

// Function to handle navigation item clicks
const onNavClick = (topic) => {
  newsFetch(topic); // Fetch news data based on the clicked topic
  activeListItem?.classList.remove("active");
  activeListItem = document.getElementById(topic);
  activeListItem.classList.add("active");
  console.log(topic);
};

const navItems = ["Politics", "Sports", "Finance", "Entertainment"];

// Add click event listeners to navigation items
navItems.forEach((item) => {
  document.getElementById(item).addEventListener('click', function() {
    onNavClick(item.toLowerCase()); // Convert the topic to lowercase before fetching news data
    newsFetch(topic); // Fetch news data based on the clicked topic
    activeListItem?.classList.remove("active");
    activeListItem = document.getElementById(topic);
    activeListItem.classList.add("active");
  });
});
