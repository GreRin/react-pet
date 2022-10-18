import { createProxyMiddleware } from 'http-proxy-middleware';

const proxy = {
  target: 'http://localhost:4000',
  changeOrigin: true,
};
module.exports = function (app: { use: (arg0: string, arg1: any) => void }) {
  app.use('/api', createProxyMiddleware(proxy));
};
