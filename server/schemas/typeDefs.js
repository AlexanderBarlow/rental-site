const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Profile {
      email: String
      address: String
      rentable_items: [Items]
    }
    type Items {
        itemName: String
        description: String
        itemPrice: Int
        itemOwner: Profile
        itemRenter: Profile
        itemCity: Profile
    }

    type Query {
        profiles: [Profile] 
        profile(profileId: ID!): Profile
        items: [Items]
        item(itemId: ID!): Items
    }


`;
    
module.exports = typeDefs;