// Book Constructor
function Book(title, author, genre) {
  this.title = title;
  this.author = author;
  this.genre = genre;
}


// UI Constructor
function UI() {

}

// Add Book to List
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById('book-list');
  // Create tr element
  const row = document.createElement('tr');
  // Insert columns
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.genre}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);

}

// Show Alert
UI.prototype.showAlert = function(message, className) {
  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className =  `alert ${className}`;
  // Add Text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const container = document.querySelector('.container');
  // Get form
  const form = document.querySelector('#book-form');
  // Insert Alert
  container.insertBefore(div, form);

  // Timeout after 3 seconds
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000);
}

// Delete book
UI.prototype.deleteBook = function(target) {
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('genre').value = '';
}

// Event Listener for adding book
document.getElementById('book-form').addEventListener('submit', function (e) {
  // Get Form Values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    genre = document.getElementById('genre').value;

  // console.log(title, author, genre);

  // Instantiate a book
  const book = new Book(title, author, genre);

  // Instantiate UI
  const ui = new UI();

  // Validate
  if (title === '' || author === '' || genre === '') {
    // Error Alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add Book to list
    ui.addBookToList(book);

    // Show success
    ui.showAlert('Book Added', 'success');

    // Clear fields
    ui.clearFields();

  }

  e.preventDefault();
});

// Event Listener for Delete
document.getElementById('book-list').addEventListener('click', function(e) {

  // Instantiate UI
  const ui = new UI();

  ui.deleteBook(e.target);

  // Show message
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault();
});