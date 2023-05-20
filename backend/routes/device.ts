import {FastifyError, FastifyInstance, FastifyPluginOptions} from "fastify";
import fp from "fastify-plugin";

export default fp(async (fastify: FastifyInstance, options: FastifyPluginOptions, done: (error?: FastifyError) => void): Promise<void> => {
	fastify.get('/device', async (request, reply) => {
		return {};
	})

	done();
});
