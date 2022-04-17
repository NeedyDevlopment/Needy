const Post = require("../models/post");

module.exports = async function getPostsArrayAndtotalPosts(selectedCity, selectedCategory, currentPage, selectedSort) {
    var postsArray;
    var totalPosts;
    let sort = {"date" : -1};
    switch(selectedSort){
        case "likes":{
            sort =  {"likes" : -1}
            break;
        }
        case "date":{
            sort = {"date" : -1}
            break;
        }
        case "comments":{
            sort = {"comments" : -1}
            break;
        }
    }
    if (selectedCategory == "All Category" && selectedCity == "All City") {
        postsArray = await Post.find()
            .populate("creator")
            .limit(5)
            .skip(5 * (currentPage - 1))
            .sort(sort);
        totalPosts = await Post.count({});
    } else if (selectedCategory == "All Category") {
        postsArray = await Post.find({ city: selectedCity })
            .populate("creator")
            .limit(5)
            .skip(5 * (currentPage - 1))
            .sort(sort);
        totalPosts = await Post.count({
            city: selectedCity,
        });
    } else if (selectedCity == "All City") {
        postsArray = await Post.find({ category: selectedCategory })
            .populate("creator")
            .limit(5)
            .skip(5 * (currentPage - 1))
            .sort(sort);
        totalPosts = await Post.count({
            category: selectedCategory,
        });
    } else {
        postsArray = await Post.find({
                category: selectedCategory,
                city: selectedCity,
            })
            .populate("creator")
            .limit(5)
            .skip(5 * (currentPage - 1))
            .sort(sort);
        totalPosts = await Post.count({
            category: selectedCategory,
            city: selectedCity,
        });
    }
    return {
        postsArray: postsArray,
        totalPosts: totalPosts,
        sort : selectedSort,
    };
};