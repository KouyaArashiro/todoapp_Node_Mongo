const params = window.location.search;
const id = new URLSearchParams(params).get("id");
console.log(id);