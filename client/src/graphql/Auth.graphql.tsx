import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      name
      email
      role
      permissions
      billings {
        id
        name
        address {
          street
          city
          postal
          country
        }
        ICO
        DIC
        ICDPH
        IBAN
        SWIFT
      }
    }
  }
`;

export const ME = gql`
  query me {
    me {
      id
      name
      email
      role
      permissions
      billings {
        id
        name
        address {
          street
          city
          postal
          country
        }
        ICO
        DIC
        ICDPH
        IBAN
        SWIFT
      }
    }
  }
`;
