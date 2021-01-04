const Query = require('../queryModel')
const mongoose = require('mongoose')



const getAll = async (req, res) => {
  try {
    let queries = await Query.find()
    res.json(queries)
  } catch (e) {
    res.status(400).json(e)
  }
}

const edit = async (req, res) => {
  let id = req.params.id
  let data = req.body
  Query.update(
    { _id: id },
    {
      $set: {
        questionTitle: data.questionTitle,
        returningAnswer: data.returningAnswer,
        topic: data.topic,
        replies: data.replies,
        status: data.status,
        views: data.views,
        likes: data.likes,
        postedBy: data.postedBy,
        likedBy: data.likedBy
      },
    },
    (err, result) => {
      if (err) {
        res.json(err)
      } else {
        res.json(result)
      }
    }
  )
}
const deleteQuery = async (req, res) => {
  try {
    let id = req.params.id
    let response = await Query.findByIdAndDelete(id)
    if (!response) {
      res.status(404)
      return
    } else {
      res.json('deleted')
    }
  } catch (e) {
    res.status(404).json(e)
  }
}

module.exports = {
  createQuery,
  getAll,
  deleteQuery,
  edit,
}
