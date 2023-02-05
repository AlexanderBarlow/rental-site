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
    {
        profile {
            email
            city
            rentable_items {
                itemName
                description
                itemPrice
                city
            }
        }
    }
`;

export const QUERY_ALL_ITEM = gql`
    query items {
        items {
        itemName
        description
        itemPrice
        _id
    }
    }
`;