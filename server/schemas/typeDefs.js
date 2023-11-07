const { gql } = require("apollo-server-express");

const typeDefs = gql`
type Profile {
  _id: ID
  email: String!
  username: String!
  city: String!
  profileImage: String  # Store image path or reference
  backgroundImage: String  # Store image path or reference
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
  itemImage: String  # Store image path or reference
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

type CheckoutSession {
  sessionUrl: String
}

type Query {
  profiles: [Profile]
  profile(profileId: ID!): Profile
  items: [Item]
  item(itemId: ID!): Item
  rentable_items(profileId: ID!): [Item]
  userCart(userId: ID!): [Item]
  transactions(userId: ID!): [Transaction]
  userCredits(userId: ID!): Credit
}

type Mutation {
  addProfile(email: String!, username: String!, password: String!, city: String!): Auth
  removeProfile(profileId: ID): Profile
  login(email: String!, password: String!): Auth
  addItem(
    itemName: String!
    description: String
    itemPrice: String!
    city: String!
    itemImage: String
  ): Item
  rentItem(_id: ID!): Profile
  removeItem(_id: ID!): Item
  updateItemAvailability(_id: ID!): Item
  addItemToCart(userId: ID!, itemId: ID!): Profile
  addCreditToUser(userId: ID!, amount: Float!): Credit
  removeCreditFromUser(userId: ID!, amount: Float!): Credit
  createCheckoutSession(quantity: Int!): CheckoutSession
  editProfile(
    profileId: ID!
    username: String
    email: String
    city: String
  ): Profile
}

`;

module.exports = typeDefs;
