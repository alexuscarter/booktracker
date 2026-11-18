"use strict";
// Book Tracker — all JavaScript written by me.
// =============================================================================
const books = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    pages: 320,
    status: "finished",
    rating: 5,
  },
  {
    id: 2,
    title: "The Alchemist",
    author: "Paulo Coelho",
    pages: 208,
    status: "finished",
    rating: 4,
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    pages: 328,
    status: "reading",
    rating: null,
  },
  {
    id: 4,
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    pages: 336,
    status: "want",
    rating: null,
  },
  {
    id: 5,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    pages: 256,
    status: "finished",
    rating: 5,
  },
  {
    id: 6,
    title: "Dune",
    author: "Frank Herbert",
    pages: 688,
    status: "reading",
    rating: null,
  },
  {
    id: 7,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    pages: 180,
    status: "want",
    rating: null,
  },
  {
    id: 8,
    title: "Clean Code",
    author: "Robert C. Martin",
    pages: 464,
    status: "finished",
    rating: 4,
  },
  {
    id: 9,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: 310,
    status: "want",
    rating: null,
  },
  {
    id: 10,
    title: "Deep Work",
    author: "Cal Newport",
    pages: 304,
    status: "reading",
    rating: null,
  },
];

const bookList = document.querySelector("#book-list");
const emptyState = document.querySelector("#empty-state");

let editingId = null;

const STATUS_OPTIONS = [
  { value: "want", label: "Want to read" },
  { value: "reading", label: "Reading" },
  { value: "finished", label: "Finished" },
];

const createBookCard = (book) => {
  const li = document.createElement("li");
  li.className = "book";
  li.dataset.status = book.status;
  li.dataset.id = String(book.id);
  if (editingId === book.id) {
    li.classList.add("is-editing");
  }

  const cover = document.createElement("div");
  cover.className = "book__cover";
  cover.setAttribute("aria-hidden", "true");
  cover.textContent = book.title[0].toUpperCase();

  const body = document.createElement("div");
  body.className = "book__body";

  const title = document.createElement("h3");
  title.className = "book__title";
  title.textContent = book.title;

  const author = document.createElement("p");
  author.className = "book__author";
  author.textContent = book.author;

  const meta = document.createElement("p");
  meta.className = "book__meta";

  const pages = document.createElement("span");
  pages.className = "book__pages";
  pages.textContent = `${book.pages} pages`;
  meta.appendChild(pages);

  if (book.status === "finished" && book.rating != null) {
    const stars = document.createElement("span");
    stars.className = "stars";
    stars.setAttribute("aria-label", `Rated ${book.rating} out of 5`);

    const filled = document.createElement("span");
    filled.className = "stars__filled";
    filled.setAttribute("aria-hidden", "true");
    filled.textContent = "★".repeat(book.rating);

    const empty = document.createElement("span");
    empty.className = "stars__empty";
    empty.setAttribute("aria-hidden", "true");
    empty.textContent = "★".repeat(5 - book.rating);

    stars.append(filled, empty);
    meta.appendChild(stars);
  }

  const actions = document.createElement("div");
  actions.className = "book__actions";

  const select = document.createElement("select");
  select.className = "input select select--small book__status";
  select.setAttribute("aria-label", `Status of ${book.title}`);

  STATUS_OPTIONS.forEach(({ value, label }) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    select.appendChild(option);
  });
  select.value = book.status;

  const editBtn = document.createElement("button");
  editBtn.className = "btn btn--small btn--ghost book__edit";
  editBtn.type = "button";
  editBtn.textContent = "Edit";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn--small btn--danger book__delete";
  deleteBtn.type = "button";
  deleteBtn.textContent = "Delete";

  actions.append(select, editBtn, deleteBtn);
  body.append(title, author, meta, actions);
  li.append(cover, body);

  return li;
};

const render = (list = books) => {
  bookList.innerHTML = "";

  if (list.length === 0) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;
  for (const book of list) {
    bookList.appendChild(createBookCard(book));
  }
};

render();
