import {FastifyError, FastifyInstance, FastifyPluginOptions} from "fastify";
import fp from "fastify-plugin";
import {z} from "zod";

import {User} from "../entities/DisplayEntity.js";

export default fp(async (fastify: FastifyInstance, options: FastifyPluginOptions, done: (error?: FastifyError) => void): Promise<void> => {
	fastify.get('/user', async (request, reply) => {
		return User.find();
	})

	const UserCreationSchema = z.object({
		firstName: z.string(),
		lastName: z.string(),
		age: z.number()
	});

	fastify.post('/user', async (request, reply) => {
		const userBody = UserCreationSchema.parse(request.body);
		const user = new User();
		user.firstName = userBody.firstName;
		user.lastName = userBody.lastName;
		user.age = userBody.age;

		return user.save();
	})

	done();
});
