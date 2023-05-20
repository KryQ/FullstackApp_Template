import {User} from "../entities/DisplayEntity.js";
import Fastify from "fastify";
import {z} from "zod";

const UserRoute = (
	fastify: Fastify.FastifyInstance,
	options: Fastify.RouteOptions,
	done: Fastify.DoneFuncWithErrOrRes) => {
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
};

export default UserRoute;
