const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

/*Get All Products:

*/

router.get('/', (req, res) => {
  Product.findAll(
    {
      include: [
        {
          model: Category,
          attributes: ['category_name']
        },
        {
          model: Tag,
          attributes: ['tag_name']
        }
      ]
    }
  )
  .then(productData => res.json(productData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});



/*Get One Product:

*/

router.get('/:id', (req, res) => {
  Product.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Category,
        attributes: ['category_name']
      },
      {
        model: Tag,
        attributes: ['tag_name']
      }
    ]
  })
  .then(productData => res.json(productData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});



/*Create New Product:

*/

router.post('/', (req, res) => {
  Product.create(req.body)
    .then((product) => {
      if (req.body.tagsIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return{
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      /*If there are no product tags there is a a 200 res.status message that notifies the user that the request they made has succeeded.*/
      res.status(200).json(product);
    })
      .then((productTagIds) => res.status(200).json(productTagIds))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
    });


/*Update Product:

*/

router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});


/*Delete Product:

*/

router.delete('/:id', (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(productData => {
    if (!productData) {
      res.status(404).json({ message: 'There is not a product with that ID.' });
      return;
    }
    res.json(productData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;