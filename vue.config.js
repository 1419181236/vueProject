// function mock(app, url, data) {
//   app.get(url, (request, response) => {
//     response.json(data)
//   })
// }
//
// const homeData = require('./src/mock/bookHome')
// const shelfData = require('./src/mock/bookShelf')
// const listData = require('./src/mock/bookList')
// const flatListData = require('./src/mock/bookFlatList')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  lintOnSave: false,
  devServer: {
    // host: '10.137.226.230',
    // port: 8081,
    // before: (app) => {
    //   mock(app, '/book/home', homeData)
    //   mock(app, '/book/shelf', shelfData)
    //   mock(app, '/book/list', listData)
    //   mock(app, '/book/flat-list', flatListData)
    // },
    // setupMiddlewares: require('./mock/index')
    // //onBeforeSetupMiddleware: require('./mock/index')
    // onBeforeSetupMiddleware: (app) => {
    //   mock(app, '/book/home', homeData)
    //   mock(app, '/book/shelf', shelfData)
    //   mock(app, '/book/list', listData)
    //   mock(app, '/book/flat-list', flatListData)
    // }

    // onBeforeSetupMiddleware: function (devServer) {
    //     mock(devServer.app, '/book/home', homeData)
    //     mock(devServer.app, '/book/shelf', shelfData)
    //     mock(devServer.app, '/book/list', listData)
    //     mock(devServer.app, '/book/flat-list', flatListData)
    // }
  },
  configureWebpack: {
    performance: {
      hints: 'warning',
      maxAssetSize: 524288,
      maxEntrypointSize: 524288
    }
  }
}
