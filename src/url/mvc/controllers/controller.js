// import action from '../models/action.js'

function serialize (name, val, opt) {
  const pairs = [name + '=' + encodeURI(val)]
  opt = opt || []
  if (opt.maxAge) pairs.push('Max-Age=' + opt.maxAge)
  if (opt.domain) pairs.push('Domain=' + opt.domain)
  if (opt.path) pairs.push('Path=' + opt.path)
  if (opt.expires) pairs.push('Expires=' + opt.expires.toUTCString())
  if (opt.httpOnly) pairs.push('HttpOnly')
  if (opt.secure) pairs.push('Secure')
  return pairs.join(';')
}

export default {
  action: (req, res, args) => {
    // console.log(req, res, args)
    console.log(req.cookies)
    if (!req.cookies.isVisit) {
      res.setHeader('Set-Cookie', serialize('isVisit', '1'))
      res.end('欢迎第一次来动物园')
    } else {
      res.writeHead(200)
      res.end('动物园再次欢迎您')
    }
  }
}