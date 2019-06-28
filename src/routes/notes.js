const router = require('express').Router();

const Note= require('../models/Note');
const {isAuthenticated}= require('../helpers/auth');
// consultas a la base de datos son procesos asincronos 

router.get('/notes/add', isAuthenticated, (req, res) => {
    res.render('notes/addNotes');
});

router.post('/notes/addNotes',isAuthenticated, async(req, res) => {

    const { title, description } = req.body;
    const errors = []
    if (!title) {
        errors.push({ text: 'Porfavor escribe un titulo' })
    }
    if (!description) {
        errors.push({ text: 'Porfavor escribe una descripcion' })
    }
    if (errors.length > 0) {
        res.render('notes/addNotes', {
            errors,
            title,
            description 
        });
    } else {
        const newNote = new Note({title,description});
        newNote.user = req.user.id;
        await newNote.save();
        req.flash('success_msg', 'Has agregado un a nueva nota');
        res.redirect('/notes');
    }

});

router.get('/notes',isAuthenticated, async(req, res)=> {
  const notes =  await Note.find({user: req.user.id}).sort({date: 'desc'});
  res.render('notes/allNotes', { notes })
});

router.get('/notes/edit/:id',isAuthenticated, async(req, res)=> {
    const notes =  await Note.findById(req.params.id);
    res.render('notes/editNotes', { notes });
  });

  router.put('/notes/edit/:id',isAuthenticated, async(req, res)=> {
    const { title,description} = req.body;  
    await Note.findByIdAndUpdate(req.params.id, {title,description});
    res.redirect('/notes');
  });

  router.delete('/notes/delete/:id', isAuthenticated, async(req,res)=>{
     await Note.findByIdAndDelete(req.params.id)
     res.redirect('/notes')
    
  });

module.exports = router;