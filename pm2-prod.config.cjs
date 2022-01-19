module.exports = {
  apps: [
    {
      name: 'prod-server',
      script: 'npm',
      args: ['run', 'prod-server'],
    },
    {
      name: 'prod-update',
      script: 'npm',
      args: ['run', 'prod-update'],
    },
  ],
};
