// the result gets passed as conversation
import { getLocationKey } from './getLocationKey'
import { getClimate } from './getClimate'
import { makeReply } from './makeReply'

export const centerPillar = async (message, conversation) => {
  try {
    console.log('MEMORY', conversation.getMemory())
    if (conversation.getMemory('location')) {

      // here we get the location key
      // the climate
      // and then make a payload to send to the user
      if (conversation.action && conversation.action.slug === 'get-weather') {
        await getLocationKey(conversation)
        await getClimate(message, conversation)
      } else if (conversation.action && conversation.action.slug === 'yes') {
        await makeReply(message, conversation)
      }
    } else {
      console.log('Please type in the name of a city')
    }
  } catch (err) {
    console.error('Error in the centerPillar: ', err)
  }
}
