const DeviceRoute = (fastify, options, done) => {
	fastify.get('/device', async (request, reply) => {
		return {};
	})

	done();
};

export default DeviceRoute;
