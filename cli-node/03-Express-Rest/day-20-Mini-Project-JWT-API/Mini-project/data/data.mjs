import fs from "fs";

const DATA_FILE = "../storage.json";

export function loadData() {
	if (!fs.existsSync(DATA_FILE)) {
		return { users: [] };
	}
	const rawData = fs.readFileSync(DATA_FILE, "utf-8");
	return JSON.parse(rawData);
}

export function saveData(data) {
	fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}