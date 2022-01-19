const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

/*Get All Categories:
This piece of code uses a function called Category.findAll() which takes an object with two keys: include and model, where the value of include is set to {model: Product} and attributes is set to ['product_name].
The function then uses .then() to return the data as JSON after it has been found.  Simply put, the code attempts to retrieve all products from the database and then returns them as JSON.  If there are no records found
for the criteria then a 500 error message will be sent back.  
*/
router.get('/', (req, res) => {
  Category.findAll(
    {
      include: {
        model: Product,
        attributes: ['product_name']
      }
    }
  )
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


/*Get One Category:
This piece of code uses a function called Category.findOne .  This is trying to find a category with the id of "1" and then return its data.  If there is an error, can't find the data that the user is asking for, then a 500 error
message will be sent back.  
*/
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['category_id']
    }
  })
  .then(categoryData => res.json(categoryData))
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });
});


/*Post New Category:
This piece of code creates a new category and thens returns the data to the user.  The 
*/
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


/*Put Update Category:
*/
router.put('/:id', (req, res) => {
  Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id
        }
      })
      .then(categoryData => {
        if (!categoryData) {
          res.status(404).json({ message: 'There is not a Category with that ID.'});
          return;
        }
        res.json(categoryData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});


/*Delete category:

*/

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(categoryData => {
    if (!categoryData) {
      res.status(404).json({ message: 'There is not a Category with that ID.'});
      return;
    }
    res.json(categoryData);
  });
});

module.exports = router;
