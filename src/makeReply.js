export const makeReply = async (message, conversation) => {

  const climate = await conversation.getMemory('climate')
  console.log(climate)
  const payload = [
    { type: 'text', content: `Minimum: ->> ${climate.min}` },
    { type: 'text', content: `Maximum: ->> ${climate.max}` },
    { type: 'text', content: `It's gonna be a ${climate.weather}` },
  ]

  await message.addReply(payload)
  await message.reply()
  return

}
