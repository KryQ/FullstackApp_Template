import Fastify from "fastify";
import "reflect-metadata"

import db from "./db.js";
import UserRoute from "./routes/user.js";
import DeviceRoute from "./routes/device.js";

const fastify = Fastify({
	logger: true
});

fastify.register(UserRoute, {prefix: '/rest'});
fastify.register(DeviceRoute, {prefix: '/rest'});

// Declare a route
fastify.get('/', async (request, reply) => {
	return {hello: 'world'}
})

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
