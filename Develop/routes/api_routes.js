const router = require('express').Router()
const {v4: generateID } = require('uuid')
const fs = require('fs/promises')

async function getData() {
    const data = await fs.readFile('./Develop/db/db.json', 'utf8')

    return JSON.parse(data)
}

async function saveData(data) {
    try {
    await fs.writeFile('./Develop/db/db.json', JSON.stringify(data, null, 2))
} catch (err) {
    console.log(err)
}
}

router.get('/notes', async (req, res) => {
    try {

    const data = await getData()
    res.json(data)

    } catch (err) {
        console.log(err)
    }
  

})

router.post('/notes', async (req, res) => {
    try {
      const data = await getData();
      const newNote = {
        id: generateID(),
        title: req.body.title,
        text: req.body.text
      };
      data.push(newNote);
      await saveData(data);
      res.status(201).json(newNote); // Return the newly created note
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


module.exports = router