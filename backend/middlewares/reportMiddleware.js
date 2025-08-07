const reportMiddleware = (req, res, next) => {
  const url = req.url;
  const time = new Date();
  console.log(`[${time.toISOString()}] Se ha recibido una consulta a la ruta: ${url}`);
  next();
};

module.exports = reportMiddleware;