import http from 'http';
import app from '../app';
import { port } from '../config'

app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`server running on port ${port}`)
})
  .on('error', (e) => console.log(e))
