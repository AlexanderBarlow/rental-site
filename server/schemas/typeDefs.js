const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Profile {
    _id: ID
    email: String
    city: String
    password: String
    rentable_items: [Item]
  }
  type Item {
    _id: ID
    itemName: String
    description: String
    itemPrice: String
    itemOwner: Profile
    itemRenter: Profile
    city: String,
    availability: Boolean
  }
  type Address {
    streetName: String!
    city: String!
    state: String!
    zip: String!
  }

  input AddressData {
    streetName: String!
    city: String!
    state: String!
    zip: String!
  }
  type Auth {
    token: ID
    profile: Profile
  }
  type Query {
    profiles: [Profile]
    profile(profileId: ID!): Profile
    items: [Item]
    item(itemId: ID!): Item
    rentable_items(profileId: ID!): [Item]
  }
  type Mutation {
    addProfile(email: String!, password: String!, city: String!): Auth
    removeProfile(profileId: ID): Profile
    login(email: String!, password: String!): Auth
    addItem(
      itemName: String!
      description: String
      itemPrice: String!
      city: String!
    ): Item
    rentItem(_id: ID!): Profile
    removeItem(_id: ID!): Item
  }
`;

module.exports = typeDefs;
