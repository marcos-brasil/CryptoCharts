module.exports = {
  apps: [
    {
      name: 'bundle-server',
      script: 'npm',
      args: ['run', 'bundle-server'],
      watch: ['server'],
      ignore_watch: ['server/dist'],
      autorestart: false,
    },
    {
      name: 'sync-vm',
      script: 'npm',
      args: ['run', 'sync-vm'],
      autorestart: false,
      watch: ['server/dist', 'server/package.json', 'server/package-lock.json'],
      // must add a ignore_watch, otherwise it wont restart job.
      // weird bug
      ignore_watch: ['server/node_modules'],
      watch_delay: 10,
    },
  ],
};
