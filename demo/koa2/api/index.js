const fetch = require('../utils/fetch.js')
const API = {
  hotRepair: () => {
    return fetch.get('/common/hotrepair')
  }
}

module.exports = API