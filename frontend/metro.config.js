const path = require("path");

// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Do NOT set this to false — Better Auth requires package exports
// config.resolver.unstable_enablePackageExports = false;

const sharedPath = path.resolve(__dirname, "../shared");
config.watchFolders = [sharedPath];

// config.resolver.extraNodeModules = {
// 	"@shared": sharedPath,
// };
config.resolver.nodeModulesPaths = [path.resolve(__dirname, "node_modules")];

config.resolver.sourceExts.push("sql");
module.exports = config;
