var express = require('express');
var router = express.Router();
const cors = require('cors');
router.use(cors());

const fs = require('fs');

/* GET users listing. */
router.get('/', function (req, res, next) {
  fs.readFile('recepies.json', function (err, data) {
    if (err) {
      console.log('något gick fel');
    }
    const recepies = JSON.parse(data);

    res.send(recepies);
    return;
  });
});

router.post('/add', function (req, res, next) {
  fs.readFile('recepies.json', function (err, data) {
    if (err) {
      console.log('något gick fel');

      res.send('404 - något gick fel');
    }
    const recepies = JSON.parse(data);

    let newRecepie = {
      recepieName: req.body.recepieName,
      description: req.body.description,
      ingredients: req.body.ingredients,
      prepTime: req.body.prepTime,
    };
    recepies.push(newRecepie);

    fs.writeFile(
      'recepies.json',
      JSON.stringify(recepies, null, 2),
      function (err) {
        if (err) {
          console.log('404 - något gick fel');
        }
      }
    );

    res.send(recepies);
    return;
  });
});

module.exports = router;
