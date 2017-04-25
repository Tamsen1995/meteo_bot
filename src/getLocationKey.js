const request = require('superagent')

export const getLocationKey = async (conversation) => {
  try {
    const locationMem = conversation.getMemory('location')

    console.log('PROCESS ENV-->', process.env)
    return new Promise((resolve) => request
      .get('http://dataservice.accuweather.com/locations/v1/search')
      .query({ apikey: process.env.KEY })
      .query({ q: locationMem.raw })
      .query({ language: 'en-us' })
      .query({ details: 'false' })
      //   .set('Accept', 'application/json')
      .end(async (err, res) => {
        // in case no city was matched
        if (res.body.length <= 0) { throw err }
        console.log('IN MEMORY NOW', await conversation.setMemory({ locationkey: { value: res.body[0].Key } }))
        return resolve()
      }))
  } catch (err) {
    console.error('Error in geLocationKey: ', err)
  }
}
