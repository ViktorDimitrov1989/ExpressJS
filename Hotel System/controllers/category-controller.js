const Category = require('mongoose').model('Category');


module.exports = {

    addGet: (req,res) => {
        res.render('category/addCat');
    },
    addPost: (req, res) => {
        let category = {
            category: req.body.category,
            creator: req.user._id
        }

        Category.create(category).then(() => {
            res.redirect('back');
        })
    },
    listCategories: (req, res) => {
        let isAdmin = false;
        
        
        
        
        Category.find({}).then((categories) => {
            if(req.user){
                isAdmin = req.user.roles.indexOf('Admin') >= 0;
            }
            console.log(isAdmin);

            res.render('category/categoryList', {categories: categories, isAdmin: isAdmin});
        });
    },
    deleteCategory: (req,res) => {
        let catId = req.params.category;

        Category.findById(catId).remove().then(() => {

            res.render('category/categoryList', {successMessage: 'Category was removed'} );

        });
    }

}