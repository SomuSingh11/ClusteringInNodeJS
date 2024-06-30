const express = require("express");
const PORT = 3000;

const app = express();

// Display the process ID of the current worker.
console.log(`worker pid=${process.pid}`);

// Define a GET route for "/nocluster"
app.get("/nocluster", (req, res) => {
  console.time("API-without-cluster"); // Start a timer for the API request

  let result = 0;
  for (let i = 0; i <= Math.pow(9, 7); i++) {
    // Loop from 0 to 9^7
    result = result + i + Math.pow(i, 10); // Perform a complex calculation
  }

  // Stop the timer and log the elapsed time for the operation
  console.timeEnd("API-without-cluster");

  console.log(`RESULT IS ${result} - from PROCESS ${process.pid}`);

  // Send the result as the response
  res.send(`Result number is ${result}`);
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
