import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
    mutation addProfile(
        $email: String!
        $username: String!
        $password: String!
        $city: String!
        ) {
        addProfile
        (
            email: $email
            username: $username
            password: $password
            city: $city
        )   
        {
            token
            profile 
            {
                _id
            }
        }
    }
`;

export const EDIT_PROFILE = gql`
  mutation editProfile(
    $profileId: ID!
    $username: String
    $email: String
    $city: String
    $profileImage: String
    $backgroundImage: String
  ) {
    editProfile(
      profileId: $profileId
      username: $username
      email: $email
      city: $city
      profileImage: $profileImage
      backgroundImage: $backgroundImage
    ) {
      _id
      username
      email
      city
      profileImage
      backgroundImage
    }
  }
`;

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password) {
            token
            profile {
                _id
                email
            }
        }
    }
`;

export const ADD_ITEM = gql`
        mutation addItem($itemName: String!, $description: String, $itemPrice: String!, $city: String!){
            addItem(itemName: $itemName, description: $description, itemPrice: $itemPrice, city: $city){
                _id
                itemName
                description
                itemPrice
                city
            }
        }
`;

export const UPDATE_ITEM_AVAILABILITY = gql`
  mutation updateItemAvailability($_id: ID!) {
    updateItemAvailability(_id: $_id) {
      _id
      itemName
      description
      itemPrice
      city
      availability
    }
  }
`;

export const ADD_ITEM_TO_CART = gql`
mutation AddItemToCart($userId: ID!, $itemId: ID!) {
    addItemToCart(userId: $userId, itemId: $itemId) {
      _id
      email
      cart {
        _id
        itemName
        itemPrice
      }
    }
  }
  `;