import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
query allProfiles {
    profiles {
        _id
        email
        rentable_items
    }
}
`;

export const QUERY_SINGLE_PROFILE = gql`
    query singleProfile($profileId: ID!) {
        profile(profileId: $profileId) {
            email
            city
        }
    }
`;

export const QUERY_SESSION_USER = gql`
query profile($profileId: ID!) {
    profile(profileId: $profileId) {
      email
      city
      rentable_items {
        itemName
      }
    }
  }
`;

export const QUERY_ITEMS = gql`
query Rentable_items($profileId: ID!) {
  rentable_items(profileId: $profileId) {
    _id
    itemName
    itemPrice
    description
  }
}
`;

export const  GetItemDetails = gql`
query GetItemDetails($itemId: ID!) {
    item(itemId: $itemId) {
      _id
      itemName
      description
      itemPrice
      city
      availability
    }
  }
`;

export const QUERY_ALL_ITEM = gql`
    query items {
        items {
          _id
          availability
          city
          description
          itemName
          itemPrice
    }
    }
`;

export const GET_CART = gql`
query Items($userId: ID!) {
  userCart(userId: $userId) {
    itemName
    itemPrice
    itemOwner {
      _id
    }
  }
} 
`;

export const GET_CREDITS = gql`
query Query($userId: ID!) {
  userCredits(userId: $userId) {
    amount
  }
}
`