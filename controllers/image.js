const Clarifai = require('clarifai');

const app = new Clarifai.App ({
  apiKey: 'b4f02dc2e31640dd842c6ee2bd9ead12'
});
const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.image)
    .then (data =>{
        res.json(data)
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
    let {id} = req.body;
    db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('could not preform action'))
}

module.exports = {
    handleImage,
    handleApiCall
}