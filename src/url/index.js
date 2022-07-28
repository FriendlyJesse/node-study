import http from 'http'
import url from 'url'
import { open, readFile } from 'fs/promises'

// 最常见的根据路径进行业务处理的应用是静态文件服务器，它会根据路径去查找磁盘中的文件，然后将其相应给客户端
const server = http.createServer(async (req, res) => {
  const pathname = url.parse(req.url).pathname
  res.setHeader('Content-type','text/html;charset=utf8')
  // promise api
  
  try {
    const file = await readFile('./src/url/html/' + pathname)
    res.writeHead(200)
    res.end(file)
  } catch (err) {
    res.writeHead(404)
    res.end('找不到相关文件。- -')
  }
  
  // callback api
  // fs.readFile('./src/url/html/' + pathname, (err, file) => {
  //   if (err) {
  //     res.writeHead(404)
  //     res.end('找不到相关文件。- -')
  //     return
  //   }
  //   res.writeHead(200)
  //   res.end(file)
  // })
})

server.listen(1337, '127.0.0.1')
console.log('Server running at http://localhost:1337/')