const test = "/user/Strim/1004f/";

const arr = test.split("/").filter((t) => t !== "");
if (arr.length > 0 && !isNaN(arr[arr.length - 1])) {
  arr.pop();
}
const result = "/" + arr.join("/") + "/";

//console.log(!isNaN(arr[arr.length - 1]));

console.log(result);

/*
const deleteResource = (endpoint) => {
  for (let i = endpoint.length - 1; i > 0; i--) {
    if (endpoint[i] === "/") {
      return endpoint.substring(0, i) + "/";
    }
  }
  return;
};

console.log(deleteResource(test));
*/
