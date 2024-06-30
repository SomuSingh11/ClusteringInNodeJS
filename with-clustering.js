const express = require("express");
const PORT = 3000;
const cluster = require("cluster");
const totalCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  // Display the number of available CPU cores
  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Master ${process.pid} is running`);

  // Fork worker processes equal to the number of CPU cores
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  // Listen for the 'exit' event on workers to restart them if they die
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Starting/fork another worker!");
    cluster.fork();
  });
} else {
  // Worker processes share the same server code
  start();
}

function start() {
  const app = express();
  console.log(`Worker with id ${process.pid} started`);

  app.get("/cluster", function (req, res) {
    console.time("API-with-cluster"); // Start a timer to measure the request duration

    let result = 0;

    // Iterate 9^7 times.
    for (let i = Math.pow(9, 7); i >= 0; i--) {
      // Perform a complex operation.
      result = result + i + Math.pow(i, 10);
    }
    console.timeEnd("API-with-cluster"); // Stop the timer and log the elapsed time for the computation

    console.log(`Result is ${result} - from PROCESS ${process.pid}`);

    res.send(`Result number is ${result}`);
  });

  app.listen(PORT, () => {
    console.log(`App listening on PORT : ${PORT}`);
  });
}
