module.exports = {
  apps: [
    {
      name: 'pkg',
      script: 'npm',
      args: ['run', 'pkg'],
      autorestart: false,
      watch: ['dist/*'],
      // must add a ignore_watch, otherwise it wont restart job.
      // weird bug
      // ignore_watch: ['node_modules'],
      watch_delay: 100,
      watch_options: {
        // not working for some reason
        ignoreInitial: true,
      },
    },
    {
      name: 'app',
      script: './bin/app',
      autorestart: false,
      watch: ['./bin/app'],
      // must add a ignore_watch, otherwise it wont restart job.
      // weird bug
      watch_delay: 5000,
      watch_options: {
        // not working for some reason
        ignoreInitial: true,
      },
    },
  ],
};
