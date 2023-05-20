import * as net from "node:net";

// TODO: Do times for closing and opening slopes

// TODO: Check functionality
const utfTocustomEncoding = (hexString: string): string => {
	const utf = ['c485', 'c487', 'c499', 'c582', 'c584', 'c3b3', 'c59b', 'c5bc', 'c5ba', 'c484', 'c486', 'c498', 'c581', 'c583', 'c393', 'c59a', 'c5bb', 'c5b9'];
	const a3d = ['84', '88', '86', '90', '8c', '92', '8a', '8e', '94', '83', '87', '85', '8f', '8b', '91', '89', '8d', '93'];

	for (let i = 0; i < utf.length; i++) {
		hexString = hexString.replace(utf[i], a3d[i]);
	}
	return hexString;
}

const parseTextData = (text: string) => {
	if (text.length > 125) {
		console.log("Text is too long");
		return;
	}

	const hexTextInput = Buffer.from(text, 'utf8').toString('hex');
	let cmd = `FFFE${utfTocustomEncoding(hexTextInput)}e0`;
	cmd = cmd.padEnd(252, '20') + '0d0a';

	return cmd;
}

type SlopeState = 'open' | 'closed' | 'off';

// TODO: Check functionality
type parseCrossesDataProps = {
	crossesPrefix?: string,
	slopesStates: SlopeState[]
}
const parseCrossesData = async (data: parseCrossesDataProps) => {
	const {crossesPrefix = 'FFFA', slopesStates} = data;
	let cmd = crossesPrefix;
	const slopeStateString = slopesStates
		.map(slopeState => {
			switch (slopeState) {
				case 'open':
					return '3130';
				case 'closed':
					return '3031';
				default:
					return '2020';
			}
		}).join('');
	cmd += slopeStateString;

	cmd = cmd.padEnd(252, '20') + '0d0a';

	return cmd;
}

//TODO: Check functionality
const parseTempData = (tempData: number) => {
	var cmd = "FFFB" + tempData;
	return cmd.padEnd(252, '20') + '0d0a';
}

// const sendData = async (host, port, data, start, close) => {
// 	if (start) {
// 		client = net.createConnection({host: host, port: port}, () => {
// 			client.write(new Buffer(data, 'hex'), function () {
// 				if (close) {
// 					setTimeout(function () {
// 						client.destroy();
// 						console.log('host unreachable');
// 					}, destroyDelay);
// 				}
// 			});
// 		});
// 	} else {
// 		client.write(new Buffer(data, 'hex'), function () {
// 			if (close) {
// 				setTimeout(function () {
// 					client.destroy();
// 					console.log('host unreachable');
// 				}, destroyDelay);
// 			}
// 		});
// 	}
// }

type sendDataToDisplayProps = {
	host: string,
	port: number,
	data: {
		text?: string,

	},
}
const sendDataToDisplay = async (data: string) => {
	return 'ok'
}

export default sendDataToDisplay;
