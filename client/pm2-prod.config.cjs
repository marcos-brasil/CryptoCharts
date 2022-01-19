module.exports = {
  apps: [
    {
      name: 'prod-web',
      script: 'npm',
      args: ['run', 'watch-bundle'],
    },
    // {
    //   name: 'native',
    //   script: 'npm',
    //   args: ['run', 'native'],
    // {
    //   name: 'build-server',
    //   script: 'npm',
    //   args: ['run', 'watch-bundle-server'],
    // },
    // },
    // {
    //   name: 'server',
    //   script: 'yarn',
    //   args: ['run', 'watch-server'],
    // },
  ],
};
