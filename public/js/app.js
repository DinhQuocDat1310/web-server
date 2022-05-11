// const weatherLocationForm = document.querySelector("form");

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
//   //Ta truyền vào hàm then 1 callback function
//   //Callback đó sẽ chạy khi có được json và được parsed data
//   //Ta truyền data đó vào làm argument
// });
const keySearch = document.querySelector("input");
let message_error = document.querySelector("#message-error");
let message_success = document.querySelector("#message-success");

const handleLocation = addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(keySearch.value);

  message_error.textContent = "Loading...";
  message_success.textContent = "";

  fetch(`/weather?address=${keySearch.value}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        message_error.textContent = data.error;
      } else {
        message_error.textContent = `Location: ${data.location}`;
        message_success.textContent = `Feelslike: ${data.feelslike}`;
      }
    });
  });
});
