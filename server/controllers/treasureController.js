

module.exports = {
dragonTreasure: async (req, res) => {
  const db = req.app.get('db')
  let dt = await db.get_dragon_treasure(1)
  res.status(200).send(dt)
},
getUserTreasure: async (req, res) => {
  const db = req.app.get('db')
  let ut = await db.get_user_treasure(req.session.user.id)
  res.status(200).send(ut)
},
addUserTreasure: async (req, res) => {
  const {treasureUrl} = req.body
  const {id} = req.session.user
  const db = req.app.get('db')
  let userTreasure = await db.add_user_treasure(treasureUrl, id)
  res.status(200).send(userTreasure)
},
getAllTreasures: async (req, res) => {
const db = req.app.get('db')
let at = await db.get_all_treasure()
res.status(200).send(at)
}
}