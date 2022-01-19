module.exports = {
  apps: [
    {
      name: 'db-update',
      script: 'npm',
      args: ['run', 'db-update'],
    },
    {
      name: 'run-server',
      script: 'npm',
      args: ['run', 'run-server'],
    },
    // {
    //   name: 'db-insert-coins-price',
    //   script: 'npm',
    //   args: ['run', 'db-insert-coins-price'],
    // },
    // {
    //   name: 'insert-sparkline-db',
    //   script: 'npm',
    //   args: ['run', 'insert-sparkline-db'],
    // },
    // {
    //   name: 'db-update-sparkline-db',
    //   script: 'npm',
    //   args: ['run', 'db-update-sparkline'],
    // },
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
    {
      name: 'build-server',
      script: 'npm',
      args: ['run', 'transpile-watch'],
    },
  ],
};
