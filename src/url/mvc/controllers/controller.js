// import action from '../models/action.js'

export default {
  action: (req, res, args) => {
    console.log(req, res, args)
    res.writeHead(200)
    res.end(args)
  }
}