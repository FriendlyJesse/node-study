import http from 'http'
import url from 'url'
import { readFile, readdir } from 'fs/promises'

const handles = {}
const files = await readdir('./src/url/mvc/controllers')
console.log(files)
for (const file of files) {
  console.log(file)
  const name = file.split('.js')[0]
  const controllerModule = await import('./mvc/controllers/' + files)
  handles[name] = controllerModule.default
}
console.log(handles)


// 最常见的根据路径进行业务处理的应用是静态文件服务器，它会根据路径去查找磁盘中的文件，然后将其相应给客户端
const server = http.createServer(async (req, res) => {
  res.setHeader('Content-type','text/html;charset=utf8')

  const pathname = url.parse(req.url).pathname
  const paths = pathname.split('/')
  const controller = paths[1] || 'index'
  const action = paths[2] || 'index'
  const args = paths.splice(3)

  if (handles[controller] && handles[controller][action]) {
    handles[controller][action].apply(null, [req, res].concat(args))
  } else {
    res.writeHead(500)
    res.end('找不到响应控制器')
  }
  
  // try {
  //   const file = await readFile('./src/url/html/' + pathname)
  //   res.writeHead(200)
  //   res.end(file)
  // } catch (err) {
  //   res.writeHead(404)
  //   res.end('找不到相关文件。- -')
  // }
})

server.listen(1337, '127.0.0.1')
console.log('Server running at http://localhost:1337/')