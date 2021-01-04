const axios = require('axios');
const mongoose = require('mongoose')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

// Question Type

const QuestionType = new GraphQLObjectType({
  name:'Question',
  fields:() => ({
    
  })
})

// Root Query
const RootQuery = new GraphQLObjectType({
  name:'RootQueryType',
  fields: {
    question:{
      type:QuestionType,
      args:{
        _id:{type:GraphQLString}
      },
      resolve(parentValue, args) {

      }

    }
  },
  questions: {
    type: new GraphQLList(QuestionType),
    resolve(parentValue, args) {

    }
  }
  
})

module.exports = new GraphQLSchema({
  query: RootQuery
});








