import http from 'http'
import url from 'url'
// import querystring from 'querystring'
import { readdir } from 'fs/promises'

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


function parseCookie (cookie) {
  const cookies = {}
  if (!cookie) return cookies
  const list = cookie.split(';')
  list.forEach(item => {
    const pair = item.split('=')
    cookies[pair[0].trim()] = pair[1]
  })
  return cookies
}


// 最常见的根据路径进行业务处理的应用是静态文件服务器，它会根据路径去查找磁盘中的文件，然后将其相应给客户端
const server = http.createServer(async (req, res) => {
  res.setHeader('Content-type','text/html;charset=utf8')

  // 路径处理
  const pathname = url.parse(req.url).pathname
  const paths = pathname.split('/')
  const controller = paths[1] || 'index'
  const action = paths[2] || 'index'
  const args = paths.splice(3)

  // 参数处理
  const query = url.parse(req.url, true).query
  req.query = query
  console.log(query)

  // cookie
  req.cookies = parseCookie(req.headers.cookie)

  if (handles[controller] && handles[controller][action]) {
    handles[controller][action].apply(null, [req, res].concat(args))
  } else {
    res.writeHead(500)
    res.end('找不到响应控制器')
  }
  
})

server.listen(1337, '127.0.0.1')
console.log('Server running at http://localhost:1337/')