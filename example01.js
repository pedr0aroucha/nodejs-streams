// # 1

// const sdtin = process.stdin.on("data", (msg) =>
// 	console.log("entrada terminal", msg.toString()),
// );

// const stdout = process.stdout.on("data", (msg) =>
// 	console.log("saida terminal", msg.toString()),
// );

// sdtin.pipe(stdout);

// # 2

// import http from "http";

// import { readFileSync, createReadStream } from "fs";

// // node -e "process.stdout.write(crypto.randomBytes(1e9));" > big.file
// http.createServer((req, res) => {
// 	createReadStream("big.file").pipe(res);
// }).listen(3000, console.log("..."));

// # 3

// import net from "net";

// net.createServer((socket) => socket.pipe(process.stdout)).listen(3000);

// // node -e "process.stdin.pipe(require('net').connect(3000));"
