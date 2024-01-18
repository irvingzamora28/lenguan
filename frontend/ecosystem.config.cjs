module.exports = {
	apps: [
		{
			name: "lenguan-frontend",
			script: "yarn",
			args: "start",
			cwd: "/var/www/lenguan/frontend",
			watch: true,
		},
		{
			name: "lenguan-socket",
			script: "yarn",
			args: " start:socket",
			cwd: "/var/www/lenguan/frontend",
			watch: true,
		},
	],
};
