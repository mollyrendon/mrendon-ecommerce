const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

/*Get All Tags:
This section of code is used to find all of the tags that are associated with a product.  The data is returned in JSON format and a 500 error message will appear if there is a problem with retreival.  
*/

router.get('/', (req, res) => {
    Tag.findAll({
        include: {
          model: Product
        }
      })
    .then(tagData => res.json(tagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });



/*Get One Tag:
The part of the code is used to find a product with a specific ID.  Once the product with the specific ID is found the data is returned as JSON.  Otherwise a 500 error message appears if there is an issue in retreival.   
*/

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product
    }
  })
  .then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


/*Create New Tag:
This is used to create a new tag.  The code creates a new tag on the server and then returns it to the user in JSON format.  If there is an error in retrieval a 500 error message will appear.  
*/

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


/*Update Tag:
This piece of code is used to update a tag.  The code first check if there is a tag that already exists with the specific ID.  If there is not a tag with the specific ID then a 404 error returns with a message informing the user.  
Otherwise it updates the tag successfully.  A 500 error message is sent back if there is an issue in retreival.  
*/

router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(tagData => {
      if (!tagData) {
        res.status(404).json({ message: 'There is not a tag with that ID.'});
        return;
      }
      res.json(tagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


/*Delete Tag:
This section is used to delete a tag.  First the code checks to see if there is even a tag with that specific ID.  If there isn't the user gets a 404 error with a message informing the user that there is not a tag with the specific ID.  
If the tag does exists then the data for that tag is sent back and the tag with the specific ID is then deleted.  If there is an error in retrival then a 500 error message will appear.  
*/


router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(tagData => {
    if (!tagData) {
      res.status(404).json({ message: 'There is not a tag with that ID.'});
      return;
    }
    res.json(tagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
