import {DataSource} from "typeorm";
import DisplayEntity from "./entities/DisplayEntity.js";

const db = new DataSource({
	type: "sqlite",
	database: "database.sqlite",
	entities: [
		DisplayEntity
	],
	synchronize: true,
	logging: false
});

const createConnection = async (): Promise<DataSource> =>
	new Promise(async (resolve, reject) => {
		let tries = 0;

		try {
			resolve(await db.initialize());
			return;
		} catch (e) {
		}

		const intervalHandler = setInterval(async () => {
			tries++;
			console.log(`Trying to connect to database (try ${tries}/15)`);

			db.initialize()
				.then(connection => {
					clearInterval(intervalHandler);
					resolve(connection);
					return;
				})
				.catch(() => {
				});

			if (tries >= 15) {
				clearInterval(intervalHandler);
				reject("Could not connect to database");
				return;
			}
		}, 2000);
	});

export default createConnection;
