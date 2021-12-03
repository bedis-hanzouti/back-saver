const express = require('express');
const router = express.Router();
const user = require('../controllers/adminController');

////////////ADMIN////////////
router.post('/login', user.login);
router.post('/register', user.register);



////////////BOAT////////////
router.post('/boat', user.createBoats);
router.get('/boat', user.getBoat);
router.delete('/boat/:id', user.deleteBoat);
router.put('/boat/:id', user.updateBoat);




////////////SAVERS////////////
router.post('/saver', user.createSavers);
router.get('/saver', user.getSaver);
router.delete('/saver/:id', user.deleteSaver);
router.put('/saver/:id', user.updateSaver);



////////////SURVIVERS////////////
router.post('/surviver', user.createSurvivers);
router.get('/surviver', user.getSurvivers);
router.delete('/surviver/:id', user.deleteSurviver);
router.put('/surviver/:id', user.updateSurviver);

////////////SORTIE////////////
router.post('/sortie', user.createSortie);
router.get('/sortie', user.getSorties);
router.delete('/sortie/:id', user.deleteSortie);
router.put('/sortie/:id', user.updateSortie);


router.get('/w', user.welcome);


module.exports = router;