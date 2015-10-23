
// Application configuration details

exports.dev = {
  db: 'mongodb://localhost/',
  ports: {
    mongo: 27017,
    server: 8002
  }
};

exports.prod = {
    db: 'mongodb://localhost/',
    ports: {
      mongo: 27017,
      server: 80
    }
}
