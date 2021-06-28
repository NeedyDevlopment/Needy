const Post = require("../models/post");

module.exports = async function getPostsArrayAndtotalPosts(selectedCity, selectedCategory, currentPage) {
    var postsArray;
    var totalPosts;
    if (selectedCategory == "All Category" && selectedCity == "All City") {
        postsArray = await Post.find()
            .limit(5)
            .skip(5 * (currentPage - 1))
            .sort("-date");
        totalPosts = await Post.count({});
    } else if (selectedCategory == "All Category") {
        postsArray = await Post.find({ city: selectedCity })
            .limit(5)
            .skip(5 * (currentPage - 1))
            .sort("-date");
        totalPosts = await Post.count({
            city: selectedCity,
        });
    } else if (selectedCity == "All City") {
        postsArray = await Post.find({ category: selectedCategory })
            .limit(5)
            .skip(5 * (currentPage - 1))
            .sort("-date");
        totalPosts = await Post.count({
            category: selectedCategory,
        });
    } else {
        postsArray = await Post.find({
                category: selectedCategory,
                city: selectedCity,
            })
            .limit(5)
            .skip(5 * (currentPage - 1))
            .sort("-date");
        totalPosts = await Post.count({
            category: selectedCategory,
            city: selectedCity,
        });
    }
    return {
        postsArray: postsArray,
        totalPosts: totalPosts
    };
};