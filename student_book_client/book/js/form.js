// 전역 변수
const API_BASE_URL = "http://localhost:8080";

// DOM 요소 가져오기
const bookForm = document.getElementById("bookForm");
const bookTableBody = document.getElementById("bookTableBody");

// 문서 로딩 시 도서 목록 불러오기
document.addEventListener("DOMContentLoaded", function () {
  loadBooks();
});

// 폼 제출 이벤트 처리
bookForm.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("도서 등록 제출됨...");

  const formData = new FormData(bookForm);

  const bookData = {
    title: formData.get("title").trim(),
    author: formData.get("author").trim(),
    isbn: formData.get("isbn").trim(),
    price: parseInt(formData.get("price")),
    publishDate: formData.get("publishDate"),
    detailRequest: {
      language: formData.get("language").trim(),
      pageCount: parseInt(formData.get("pageCount")),
      publisher: formData.get("publisher").trim(),
      coverImageUrl: formData.get("coverImageUrl").trim(),
      edition: formData.get("edition").trim()
    }
  };

  if (!validateBook(bookData)) {
    return;
  }

  fetch(`${API_BASE_URL}/api/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bookData)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("도서 등록 실패");
      }
      return response.json();
    })
    .then((result) => {
      alert("도서 등록 성공!");
      bookForm.reset();
      loadBooks();
    })
    .catch((error) => {
      alert("에러: " + error.message);
      console.error(error);
    });
});

// 도서 유효성 검사 함수
function validateBook(book) {
  if (!book.title) {
    alert("제목을 입력해주세요.");
    return false;
  }
  if (!book.author) {
    alert("저자를 입력해주세요.");
    return false;
  }
  if (!book.isbn) {
    alert("ISBN을 입력해주세요.");
    return false;
  }
  if (!book.price || book.price <= 0) {
    alert("가격은 0보다 커야 합니다.");
    return false;
  }
  if (!book.publishDate) {
    alert("출판 날짜를 입력해주세요.");
    return false;
  }

  const detail = book.detailRequest;
  if (!detail.language) {
    alert("언어를 입력해주세요.");
    return false;
  }
  if (!detail.pageCount || detail.pageCount <= 0) {
    alert("페이지 수는 0보다 커야 합니다.");
    return false;
  }
  if (!detail.publisher) {
    alert("출판사를 입력해주세요.");
    return false;
  }
  if (!detail.coverImageUrl) {
    alert("표지 이미지 URL을 입력해주세요.");
    return false;
  }
  if (!detail.edition) {
    alert("에디션을 입력해주세요.");
    return false;
  }

  return true;
}

// 도서 목록 로드 함수 (미구현)
function loadBooks() {
  console.log("도서 목록 불러오는 중...");
}
