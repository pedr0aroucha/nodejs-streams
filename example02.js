import { pipeline, Readable, Writable, Transform } from "stream";
import { promisify } from "util";
import { createWriteStream } from "fs";

const pipelineAsync = promisify(pipeline);

{
	const readableStream = Readable({
		read: function () {
			this.push("Hello Dude 0");
			this.push("Hello Dude 1");
			this.push("Hello Dude 2");
			this.push(null);
		},
	});

	const writableStram = Writable({
		write: (chunk, encoding, callback) => {
			console.log("msg", chunk.toString());
			callback();
		},
	});
}

{
	const readableStream = Readable({
		read() {
			for (let index = 0; index < 1e5; index++) {
				const person = {
					id: Date.now() + index,
					name: `Pedro-${index}`,
				};

				const data = JSON.stringify(person);

				this.push(data);
			}

			// avisa que acabaram os dados
			this.push(null);
		},
	});

	const writableMapToCSV = Transform({
		transform(chunk, encoding, callback) {
			const data = JSON.parse(chunk);
			const result = `${data.id},${data.name.toUpperCase()}\n`;

			callback(null, result);
		},
	});

	const setHeader = Transform({
		transform(chunk, encoding, callback) {
			this.counter = this.counter ?? 0;
			if (this.counter) {
				return callback(null, chunk);
			}

			this.counter++;

			callback(null, `id,name\n${chunk}`);
		},
	});

	await pipelineAsync(
		readableStream,
		writableMapToCSV,
		setHeader,
		// process.stdout,
		createWriteStream("output.csv"),
	);
}
console.log("processo 02 acabou");
