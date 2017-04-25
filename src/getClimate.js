const request = require('superagent')

export const getClimate = async (message, conversation) => {
  try {

    if (!await conversation.getMemory('locationkey')) {
      const payload = [{ type: 'text', content: 'Retrieval of the locationkey not possible.' }]
      await message.addReply(payload)
      return await message.reply()
    }
    const locationkey = await conversation.getMemory('locationkey')

    return new Promise((resolve) => request
      .get(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationkey.value}`)
      .query({ apikey: process.env.KEY })
      .query({ language: 'en-us' })
      .query({ details: 'false' })
      .query({ metric: 'true' })
      .set('Accept', 'application/json')
      .end(async (err, res) => {
        if (err) { throw err }
        if (!res.body.DailyForecasts || res.body.DailyForecasts.length <= 0 || !res.body.Headline.Text) { throw err }

        await conversation.setMemory({
          climate: {
            min: res.body.DailyForecasts[0].Temperature.Minimum.Value,
            max: res.body.DailyForecasts[0].Temperature.Maximum.Value,
            weather: res.body.Headline.Text,
          },
        })
        return resolve()
      }))
  } catch (err) {
    console.error('Error in geoLocationKey: ', err)
  }
}
