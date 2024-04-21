const router = require('express').Router()
const {v4: generateID } = require('uuid')
const fs = require('fs/promises')

async function getData() {
    const data = await fs.readFile('./db/db.json', 'utf8')

    return JSON.parse(data)
}

async function saveData(data) {
    try {
    await fs.writeFile('./db/db.json', JSON.stringify(data, null, 2))
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
      console.log(newNote);
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }

    
  });


 // DELETE  Delete a note with the specified ID
router.delete('/notes/:id', async (req, res) => {
    try {
      const { id } = req.params; // Get the note ID from the request parameters
      let data = await getData(); 
  
      // Find the index of the note with the specified ID
      const index = data.findIndex(note => note.id === id);
  
      if (index !== -1) {
       
        data.splice(index, 1);
        // Save the updated data back to the db.json file
        await saveData(data);
        // Send a success response
        res.status(200).json({ success: true, message: 'Note deleted successfully' });
      } else {
        // If the note with the specified ID does not exist, send a not found response
        res.status(404).json({ success: false, message: 'Note not found' });
      }
    } catch (error) {
      
      console.error('Error deleting note:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  });
  


module.exports = router