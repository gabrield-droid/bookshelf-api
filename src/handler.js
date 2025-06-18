const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload;

  const id = nanoid(16);
  const finished = (pageCount === readPage) ? true : false;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    name, year, author, summary, publisher, pageCount, readPage,
    reading, id, finished, insertedAt, updatedAt
  };

  const isName = (name) ? true : false;
  const isReadPageLessOrEqualPageCount = readPage <= pageCount;

  if (isName && isReadPageLessOrEqualPageCount) {
    books.push(newBook);
    const isSuccess = (books.filter((book) => book.id === id).length > 0);
    if (isSuccess) {
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      });
      response.code(201);
      return response;
    }
  } else if (!isName) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  } else if (!isReadPageLessOrEqualPageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal menambahkan buku',
  });
  response.code(500);
  return response;
};

const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;
  const arrayBook = [];
  let filterNum = 0;
  const filters = {};
  if (name) { filters.name = name.toLowerCase(); filterNum++; }
  if (reading) { filters.reading = reading; filterNum++; }
  if (finished) { filters.finished = finished; filterNum++; }

  for (const book of books) {
    let arrayBookElement = {};

    if (filterNum === 0) {
      arrayBookElement = {
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      };
      arrayBook.push(arrayBookElement);
    } else {
      let filterPassed = 0;
      for (const filter in filters) {
        if (filter === 'name') {
          if (book[filter].toLowerCase().includes(filters[filter])) {
            filterPassed++;
          }
        }
        else {
          if (book[filter] == filters[filter]) {
            filterPassed++;
          }
        }
      };
      if (filterNum === filterPassed) {
        arrayBookElement = {
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        };
        arrayBook.push(arrayBookElement);
      }
    }
  };

  const response = h.response({
    status: 'success',
    data: {
      books: arrayBook,
    },
  });
  response.code(200);
  return response;
};

const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const book = books.filter((n) => n.id === bookId)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const isName = (name) ? true : false;
  const isReadPageLessOrEqualPageCount = readPage <= pageCount;
  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1 && isName && isReadPageLessOrEqualPageCount) {
    const finished = (pageCount === readPage) ? true : false;
    const updatedAt = new Date().toISOString();

    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  } else if (!isName) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  } else if (!isReadPageLessOrEqualPageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan'
  });
  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteNoteByIdHandler,
};