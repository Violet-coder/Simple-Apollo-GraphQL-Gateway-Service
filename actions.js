'use strict';
// Functions to fetch data from database(json folder)

const log = console.log
const fs = require('fs');


const getAllUsers = () => {
    try {
      const usersFromFile = fs.readFileSync('./json/users.json')
      return JSON.parse(usersFromFile)
    } catch (e) {
      return []
    }
}

const getUserByID = (ID) => {
    const users = getAllUsers()
    const targetUser = users.filter((user) => user.id === parseInt(ID.id))
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
    const targetPost = posts.filter((post) => post.id === parseInt(ID.id))
    if (targetPost.length > 0){
        return targetPost[0]
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