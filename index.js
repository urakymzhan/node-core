// Path
// The path module provides utilities for working with file and directory paths.
const path = require("path");

// path.dirname()
console.log(path.dirname("/foo/bar/baz/asdf/quux")); // Returns: '/foo/bar/baz/asdf'

// path.extname()
console.log(path.extname("file.txt"));
console.log(path.extname("groceries.csv"));

// path.join()
path.join("/foo", "bar", "baz/asdf", "quux", ".."); // Returns: '/foo/bar/baz/asdf'

// path.resolve()
path.resolve("/foo/bar", "./baz"); // Returns: '/foo/bar/baz'
path.resolve("/foo/bar", "/tmp/file/"); // Returns: '/tmp/file'
path.resolve("wwwroot", "static_files/png/", "../gif/image.gif");
// If the current working directory is /home/myself/node,
// this returns '/home/myself/node/wwwroot/static_files/gif/image.gif'

// DNS
const dns = require("dns");

dns.lookup("google.com", (err, address, family) => {
  console.log(`address: ${address} family: IPv${family}`);
});

// File System and Handling Errors
const fs = require("fs").promises;

async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath);
    console.log(data.toString());
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}
readFile("file.txt");

async function openFile() {
  try {
    const csvHeaders = "name, quantity, price";
    await fs.writeFile("groceries.csv", csvHeaders);
  } catch (error) {
    console.error(`Got an error trying to write to a file: ${error.message}`);
  }
}
async function addGroceryItem(name, quantity, price) {
  try {
    const csvLine = `\n${name},${quantity},${price}`;
    await fs.writeFile("groceries.csv", csvLine, { flag: "a" });
  } catch (error) {
    console.error(`Got an error trying to write to a file: ${error.message}`);
  }
}
(async function () {
  await openFile();
  await addGroceryItem("eggs", 12, 1.5);
  await addGroceryItem("nutella", 1, 4);
  await readFile("groceries.csv");
})();

// Check appendFile too
fs.appendFile("file.txt", "Some more text", function (err) {
  if (err) throw err;
  console.log("Saved!");
});

// HTTP
var http = require("http");
// create a server object:
http
  .createServer(function (req, res) {
    // res.write("Hello World!"); // write a response
    // res.end(); // end the response
    res.writeHead(200, { "Content-Type": "text/html" }); // http header
    res.write("<h1>Hello World!<h1>"); //write a response
  })
  .listen(3001, function () {
    console.log("server start at port 3001"); //the server object listens on port 3000
  });

//create a server object:
http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" }); // http header
    var url = req.url;
    if (url === "/about") {
      res.statusCode = 200;
      res.write("<h1>about us page<h1>"); //write a response
      res.end(); //end the response
    } else if (url === "/contact") {
      res.statusCode = 200;
      res.write("<h1>contact us page<h1>"); //write a response
      res.end(); //end the response
    } else {
      // res.redirect("/"); // in express
      res.statusCode = 200;
      res.write("<h1>Hello World!<h1>"); // write a response
      res.end(); //end the response
    }
  })
  .listen(3000, function () {
    console.log("server start at port 3000"); //the server object listens on port 3000
  });

//   http request
const options = {
  host: "localhost",
  port: 3000,
  path: "/about",
};
// Make a request
const req = http.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);
});
req.on("error", (error) => {
  console.log(error);
});
req.end();

// Process
// The process object is a global that provides information about, and control over, the current Node.js process.
// As a global, it is always available to Node.js applications without using require().
// It can also be explicitly accessed using require(): const process = require('process');
// The process.env property returns an object containing the user environment.
process.env.secretKey = "123";
console.log("secret key: ", process.env.secretKey);
