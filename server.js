const {createServer} = require('./dist/server');

createServer().then(({app}) => {
  const port = process.env.PORT || 8080;

  app.listen(port, () => {
    console.log(`Hydrogen running at http://localhost:${port}`);
  });
});
