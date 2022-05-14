import { Server, createServer, connect } from 'net';

type ProxyInfo = {
  host: string;
  port: number;
};

export class Proxy {
  hosts: ProxyInfo[];
  port: number;
  private _server: Server;

  // getter
  get server(): Server {
    return this._server;
  }

  constructor(hosts: ProxyInfo[], port: number) {
    this.hosts = hosts;
    this.port = port;

    this._server = createServer((socket) => {
      for (const info of this.hosts) {
        const client = connect({ host: info.host, port: info.port });
        client.on('error', (err) => {
          // console.log(err);
        });

        socket.pipe(client).pipe(socket);

        socket.on('error', function (err) {
          // console.log('Error: ' + err);
        });
        // socket.on('close', function () {
        //   console.log('Client disconnected from proxy');
        // });
      }
    });

    this._server.on('listening', () => {
      console.log(`Proxy service started listening at 127.0.0.1:${this.port}`);
      console.log(`Proxy list: ${JSON.stringify(this.hosts, null, 2)}`);
    });
  }

  listen = () => {
    this.server.listen(this.port);
  };
}
