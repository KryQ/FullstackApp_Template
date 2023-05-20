import Fastify from "fastify";
import FastifyStatic from "@fastify/static";
import "reflect-metadata"

import db from "./db.js";
import UserRoute from "./routes/user.js";
import DeviceRoute from "./routes/device.js";

const fastify = Fastify({
	logger: true
});

fastify.register(FastifyStatic, {
	root: `${process.cwd()}/public`,
	prefix: '/public'
});

fastify.register(UserRoute, {prefix: '/rest'});
fastify.register(DeviceRoute, {prefix: '/rest'});

fastify.get('/*', async (request, reply) => {
	return reply.sendFile('index.html');
});

// Run the server!
const start = async () => {
	try {
		await db();
		await fastify.listen({port: 3000})
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
}

start()
