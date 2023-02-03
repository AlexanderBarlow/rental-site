import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
    mutation addProfile($email: String!, $password: String!, $city: String!){
        addProfile(email: $email, password: $password, city: $city){
            token
            profile {
                _id
            }
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
        mutation addItem($itemName: String!, $description: String!, $itemPrice: String!, $address: AddressData!){
            addItem(itemName: $itemName, description: $description, itemPrice: $itemPrice, address: $AddressData){
                _id
                email
                item
            }
        }
`;