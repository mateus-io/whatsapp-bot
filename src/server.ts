import dotenv from 'dotenv'
import qrcode from 'qrcode-terminal'
import { Client, LocalAuth, Message } from 'whatsapp-web.js'
import slugify from 'slugify';
import { handleInsertParticipantList } from './ParticipantList/controllers/handleInsertParticipantList';
dotenv.config()

const client = new Client({
  authStrategy: new LocalAuth()
});

client.on('qr', qr => {
  qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
  console.log('Client is ready!');
});

const BOT_NUMBER = "13156887484"

let participants: any[] = []
let present: string[] = []
let absent: string[] = []
let currentlyCalled: any = null
let groupName = ""

function reset() {
  participants = []
  present = []
  absent = []
  currentlyCalled = null
}

function callNextParticipant(message: Message) {
  const participant = participants.pop()
  if (participant) {
    client.sendMessage(message.from, `@${participant.id.user} está presente? Responda ':sim' ou ':não'`, {
      mentions: [participant]
    })
  }
  return participant
}
  
client.on('message', async message => {
  const content = message.body;
  
  if (content.match(new RegExp(/:Lista .+/gi))) {
    reset()
    const chats = await client.getChats()
    const parts = content.split(new RegExp(/:Lista /gi))
    groupName = parts[1]
    const myGroup: any = chats.find((chat) => chat.name === groupName);
    console.log(myGroup.groupMetadata.participants)
    for (const participant of myGroup.groupMetadata.participants) {
      if (participant.id.user != BOT_NUMBER) {
        participants.push(participant)
      }
    }
    if (participants.length > 0) {
      currentlyCalled = callNextParticipant(message)
    }
  }

  if (content === ":sim") {
    if (currentlyCalled) {
      present.push(currentlyCalled.id.user)
    }
    if (participants.length === 0) {
      const date = (new Date()).toLocaleDateString('pt-BR')
      
      console.log({
        present,
        absent,
        groupName,
        date
      })

      await handleInsertParticipantList({
        item: {
          present,
          absent,
          date,
          groupName,
          slug: slugify(`lista ${groupName} ${date}`)
        }
      })

      client.sendMessage(message.from, "Fim da Lista")
      
      reset()
    } else {
      currentlyCalled = callNextParticipant(message)
    }
  }

  if (content === ":não") {
    if (currentlyCalled) {
      absent.push(currentlyCalled.id.user)
    }
    if (participants.length === 0) {
      const date = (new Date()).toLocaleDateString('pt-BR')
      
      console.log({
        present,
        absent,
        groupName,
        date
      })

      await handleInsertParticipantList({
        item: {
          present,
          absent,
          date,
          groupName,
          slug: slugify(`lista ${groupName} ${date}`)
        }
      })

      client.sendMessage(message.from, "Fim da Lista")

      reset()
    } else {
      currentlyCalled = callNextParticipant(message)
    }
  }

});

client.initialize();
 