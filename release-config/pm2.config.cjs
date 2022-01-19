module.exports = {
  apps: [
    {
      name: 'prod-db-update',
      script: 'npm',
      args: ['run', 'db-update'],
    },
    {
      name: 'server',
      script: 'npm',
      args: ['run', 'server'],
    },
  ],
};
