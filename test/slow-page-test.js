var helpers = require('./global-setup')
var path = require('path')
const expect = require('chai').expect

var describe = global.describe
var it = global.it
var before = global.before
var after = global.after

describe('Slow loading page', function () {
  helpers.setupTimeout(this)

  var app = null

  before(function () {
    return helpers
      .startApplication({
        args: [path.join(__dirname, 'fixtures', 'slow')]
      })
      .then(function (startedApp) {
        app = startedApp
      })
  })

  after(function () {
    return helpers.stopApplication(app)
  })

  describe('webContents.isLoading()', function () {
    it('resolves to true', function () {
      return app.webContents.isLoading().should.eventually.be.true
    })
  })

  describe('waitUntilWindowLoaded(timeout)', function () {
    it('rejects with an error when the timeout is hit', async function () {
      await expect(app.client.waitUntilWindowLoaded(100)).to.be.rejectedWith(
        Error
      )
    })
  })
})
