module.exports = ({ config }) => {
	const profile = process.env.EAS_BUILD_PROFILE;

	const isDevelopment = profile === "development";
	const isPreview = profile === "preview";

	return {
		...config,
		name: isDevelopment
			? "Meowcros Dev"
			: isPreview
				? "Meowcros Preview"
				: config.name,
		android: {
			...config.android,
			package: isDevelopment
				? "com.jeedan.meowcrosapp.dev"
				: isPreview
					? "com.jeedan.meowcrosapp.preview"
					: config.android.package,
		},
	};
};
