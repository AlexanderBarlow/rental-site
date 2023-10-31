const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Profile {
    _id: ID
    email: String!
    city: String!
    password: String!
    rentable_items: [Item]
    cart: [Item]
    transactions: [Transaction]
    credits: [Credit]
  }

  type Item {
    _id: ID
    itemName: String
    description: String
    itemPrice: String
    itemOwner: Profile
    itemRenter: Profile
    city: String
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

  type Transaction {
    _id: ID
    userId: ID
    type: String
    amount: Float
    description: String
    timestamp: String
  }

  type Credit {
    _id: ID
    userId: ID
    amount: Float
    transactions: [Transaction]
  }

  type Query {
    profiles: [Profile]
    profile(profileId: ID!): Profile
    items: [Item]
    item(itemId: ID!): Item
    rentable_items(profileId: ID!): [Item]
    userCart(userId: ID!): [Item]
    transactions(userId: ID!): [Transaction] # Query to get user's transactions
    userCredits(userId: ID!): Credit # Query to get user's credit details
  }

  type CheckoutSession {
    sessionUrl: String
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
    updateItemAvailability(_id: ID!): Item
    addItemToCart(userId: ID!, itemId: ID!): Profile
    addCreditToUser(userId: ID!, amount: Float!): Credit
    removeCreditFromUser(userId: ID!, amount: Float!): Credit
    createCheckoutSession(quantity: Int!): CheckoutSession
  }
`;

module.exports = typeDefs;
