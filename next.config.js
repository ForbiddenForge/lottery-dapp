/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	reactStrictMode: true,
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
	env: {
		NEXT_PUBLIC_CLIENT_ID: "6c8807106e8ce26d29f3fed938b934a2",
		NEXT_PUBLIC_SMART_CONTRACT: 0xc07ea1c6bbb14088fcab9d4d49a2023f2d455191,
		NEXT_PUBLIC_SMART_CONTRACT_STR: "0xC07EA1c6BbB14088Fcab9D4D49A2023f2d455191",
		DISABLE_ESLINT_PLUGIN: true,
		customKey: "my-value",
	},
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	},
};

module.exports = nextConfig;
