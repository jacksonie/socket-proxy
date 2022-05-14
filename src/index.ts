import { Proxy } from './proxyFactory';

import * as config from './config.json';

for (const server of config.servers) {
  const proxy = new Proxy(server.proxies, server.proxyPort);

  proxy.server.on('error', (err) => {
    console.log(err);
  });

  proxy.listen();
}
