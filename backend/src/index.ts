import Fastify from "fastify";
import FastifyStatic from "@fastify/static";
import "reflect-metadata"
import { fileURLToPath } from 'url';
import path from 'path';

import db from "./db.js";
import DeviceRoute from "./routes/device.js";

const __dirname = path.dirname(fileURLToPath(new URL(import.meta.url)));

const fastify = Fastify({
	logger: true
});

fastify.register(FastifyStatic, {
	root: `${__dirname}/public`,
	prefix: '/public',
});

fastify.register(DeviceRoute, {prefix: '/rest'});

fastify.get('/*', async (request, reply) => {
	return reply.sendFile('index.html');
});

// Run the server!
const start = async () => {
	try {
		await db();
		await fastify.listen({host: '0.0.0.0', port: 3000})
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
}

start()
