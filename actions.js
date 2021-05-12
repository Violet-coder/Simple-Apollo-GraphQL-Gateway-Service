'use strict';

const log = console.log
const fs = require('fs');


const getAllUsers = () => {
    log("enter this")
    try {
      const usersFromFile = fs.readFileSync('./json/users.json')
      return JSON.parse(usersFromFile)
    } catch (e) {
      return []
    }
}

const getUserByID = (ID) => {
    const users = getAllUsers()
    // console.log("type", typeof(users[0].id))
    // console.log("type of ID", typeof(ID.id))
    const targetUser = users.filter((user) => user.id === parseInt(ID.id))
    // log("name",targetUser[0])
    if (targetUser.length > 0){
        return targetUser[0]
    } else{
        return []
    }
}

const getAllPosts = () => {
    try {
      const postsFromFile = fs.readFileSync('./json/posts.json')
      return JSON.parse(postsFromFile)
    } catch (e) {
      return []
    }
}

const getPostByID = (ID) => {
    const posts = getAllPosts()
    console.log("type", typeof(posts[0].id))
    console.log("type of ID", typeof(ID.id))
    const targetPost = posts.filter((post) => post.id === parseInt(ID.id))
    // log("name",targetUser[0])
    if (targetPost.length > 0){
        return targetUser[0]
    } else{
        return []
    }
}

module.exports = {
	getAllUsers,
    getUserByID,
    getAllPosts,
    getPostByID
}