import MessageType from '@adiwajshing/baileys'
let impuesto = 0.02
let handler = async (m, { conn, text }) => {
  let who
  if (m.isGroup) who = m.mentionedJid[0]
  else who = m.chat
  if (!who) throw '๐ค Menciona al usuario con @user'
  let txt = text.replace('@' + who.split`@`[0], '').trim()
  if (!txt) throw '๐ค Ingrese la cantidad de ๐ช que quiere transferir'
  if (isNaN(txt)) throw ' ๐ข sรณlo nรบmeros'
  let xp = parseInt(txt)
  let exp = xp
  let imt = Math.ceil(xp * impuesto)
  exp += imt
  if (exp < 1) throw '๐ค Mรญnimo es  1'
  let users = global.db.data.users
  if (exp > users[m.sender].exp) throw '๐ค ๐ช insuficiente para transferir'
  users[m.sender].exp -= exp
  users[who].exp += xp

  m.reply(`
โญโโฆโโโฎโฆโฌโฆโฏโโโฆโโฎ
โฝTRANSFERENCIA De ๐ช
โโโโโโโโโโโโโโโโโโโโโโโโ
โโฎโฎโฎโฎ TURBO NITRO โฏโฏโฏโฏ
โญโโโโโโโโโโโโโโโโโโโโโโโโก
โฝ  ${-xp} ๐ช
โ Impuesto 2% : ${-imt} ๐ช 
โ Total gastado: ${-exp} ๐ช
โฐโโโโโโโโโโโโโโโโโโโโโโโ`)
  conn.fakeReply(m.chat, `แณโโช Recibiste \n\n +${xp} ๐ช`, who, m.text)
}
handler.help = ['payxp @user <monto>']
handler.tags = ['xp']
handler.command = ['payxp', 'transferxp', 'darxp'] 
handler.rowner = false

export default handler

