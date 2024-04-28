import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm"

type DisplayConfiguration = {
	id: string;
	type: "line" | "temperature" | "crosses" | "workingHours";
	visible: boolean;
}

type LineState = {
	id: string;
	text: string;
}

type TemperatureState = {
	id: string;
	temperature: number;
}

type CrossesState = {
	id: string;
	crosses: {
		// TODO: TBD
	}[]
}

type WorkingHoursState = {
	id: string;
	open: string;
	close: string;
}

@Entity()
export class DisplayEntity extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number

	@Column("json")
	configuration!: DisplayConfiguration

	@Column("json")
	state!: (LineState | TemperatureState | CrossesState | WorkingHoursState)[]
}

export default DisplayEntity;
