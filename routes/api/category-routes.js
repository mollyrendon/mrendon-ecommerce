const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

/*Category Find All/Product Name:
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

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
