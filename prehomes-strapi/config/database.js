module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('DATABASE_HOST', '34.123.198.32'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapidb'),
        username: env('DATABASE_USERNAME', 'strapiserver'),
        password: env('DATABASE_PASSWORD', 'r1v*bhc*XO$*pBeTQPgr'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      options: {}
    },
  },
});
