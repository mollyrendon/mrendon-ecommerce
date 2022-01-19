const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

/*Get All Products:
This part of the code is used to find all products that have a product_name attribute.  The Category.findAll() method is used to return an array of all products that have been categorized as 'category_name'
and then res.json() is used to return the categoryData to the user.  If there is an error retrieving the data then the user will get back a 500 error message.  
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
This piece of code is used to find a single product on its id.  The Category.findOne() method is used to request an array of products from a specific category named 'category_id'.  Just like the previous section of code, the
results are returned as JSON data using the res.json() method.  Again if there is an error, the data the user is trying to retrieve can't be found, then a 500 error appears.  
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
This part of the code is used to create a new category.  It returns an object with properties like name.  The code creates a new category on the server and then returns it to the user in JSON format using the res.json()method again.
Once again if there is an error in retrieving the data a 500 error appears.   
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
This piece of code is used to update a category.  First the code checks to see if it is the correct category the user is trying to update, basically to see it the category exists at all to make an update on.  If the category doesn't 
exist then the a 404 error will appear, letting the user know that there isn't a category with that id.  If the category does exist then the code updates the data in that category by calling the update method.  The code will update
the category with the specified ID in the URL to a new value.  
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
This section of code is used to delete a category.  Just like before the code first checks to see if there is even a category with the id the user is trying to find.  If there is not a category matching that ID then a 404 error will appear. 
If the category exists then the data for that category is sent back and the category with the spcified ID will be deleted.  
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
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
