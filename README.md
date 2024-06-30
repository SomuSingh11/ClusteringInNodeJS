# Clustering in Node.js

### 1. Introduction:
Node.js follows a single-threaded event loop based architecture by default.

### 2. Problem:
- Node.js uses only one CPU core for the main thread, even if the computer has multiple CPU cores.
- This limitation means that Node.js can only handle one request at a time, queuing additional requests, which is insufficient for handling heavy loads.

### 3. Solution:
- Launching a cluster of Node.js processes allows the utilization of multiple cores, enabling the handling of more concurrent requests.

---

## Cluster Module:
- The cluster module in Node.js allows the creation of child processes, which are copies of the main program running concurrently.
- Each child process has its own event loop, V8 instance, and memory, managed by a parent process that routes traffic to them.
- Using the cluster module on a multi-core machine allows handling significantly more traffic.

### 1. How It Works:
- The cluster module provides a load balancing server.
- Multiple processes can handle incoming requests simultaneously, reducing wait times and improving performance.
- The master process distributes the load to child processes, utilizing multiple cores.

### 2. Parent and Child Processes:
- The parent (master) process manages load distribution to child processes on a shared port.
- Traffic is routed using either the round-robin technique or by sending work to interested child processes.

### 3. Advantages of Clustering:
- Improved Load Balancing: Distributes processing burden across all available cores, enhancing throughput.
- Non-blocking Operation: Blocking or lengthy jobs impact only one worker, allowing others to handle requests.
- Seamless Updates: Worker processes can be restarted one at a time, ensuring minimal downtime during updates.
- Automatic Recovery: New processes can replace unexpectedly terminated ones without manual intervention.
- Resource Utilization: Maximizes processor potential, reducing hardware resource wastage.
