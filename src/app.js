const Koa = require('koa')
const KoaError = require('koa-json-error')
const mongoose = require('mongoose')
const parameter = require('koa-parameter')

const { connectionStr } = require('./config')


const app = new Koa()

mongoose.connect(connectionStr, { useNewUrlParser: true, useCreateIndex: true }, () => console.log('Mongoose connection success！'))

mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err)
})

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose connection disconnected!')
})

app.use(KoaError({
  postFormat: (e, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
}))

app.use(async (ctx) => {
  if (ctx.url === '/') {
    ctx.body = '<h2>hello world!</h2>'
  }
})

app.use(parameter(app))

app.listen(3005, () => {
  console.log('app has started at port 3005');
})
