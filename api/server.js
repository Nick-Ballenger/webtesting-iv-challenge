const express = require('express');
const helmet =require('helmet')
const potterhelper = require('../PotterChars/potterHelper');
const morgan =require('morgan')
const cors =require('cors')
const server = express();

server.use(helmet)
server.use(morgan('dev'))
server.use(express.json());
server.use('cors')


//get harry
server.get('/', (req, res) => {
    res.status(200).json({ name: 'Harry' });
});


//delete
server.delete('/potterChar', async(req, res) => {
    const potterChar = req.body;

    if(potterChar.name) {
        const deleted = await potterhelper.remove(potterChar);

        if(deleted > 0) {
            res.status(200).json(deleted);
        } else {
            res.status(404).json({ message: 'This pal was not here yet' });
        }

    } else {
        res.status(400).json({message: 'Please state which character needs to be deleted'});
    }
});


server.post('/potterChar', async(req, res) => {
    const potterCHar = req.body;

    if(potterCHar.name) {
        const posted = await potterhelper.add(potterChar);

        res.status(201).json(posted);
    } else {
        res.status(400).json({ message: 'Everyone needs a name, even Potter pals' })
    }
});



module.exports = server; 