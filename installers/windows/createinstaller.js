const createWindowsInstaller = require("electron-winstaller").createWindowsInstaller;
const path = require("path");

function getInstallerConfig() {
	console.log("creating windows installer");
	const rootPath = path.join("./");
	const outPath = path.join(rootPath, "release-builds");

	return Promise.resolve({
		appDirectory: path.join(outPath, "faster-food-win32-ia32/"),
		authors: "Diogo Domene",
		noMsi: true,
		outputDirectory: path.join(outPath, "windows-installer"),
		exe: "faster-food.exe",
		setupExe: "FasterFoodInstaller.exe",
		setupIcon: path.join("./", "build/skull.ico")
	});
}

getInstallerConfig()
	.then(createWindowsInstaller)
	.catch((error) => {
		console.error(error.message || error);
		process.exit(1);
	});
