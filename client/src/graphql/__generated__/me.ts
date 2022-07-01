/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: me
// ====================================================

export interface me_me_billings_address {
  __typename: "Address";
  street: string;
  city: string;
  postal: string;
  country: string;
}

export interface me_me_billings {
  __typename: "Billing";
  id: any | null;
  name: string;
  address: me_me_billings_address;
  ICO: string;
  DIC: string;
  ICDPH: string;
  IBAN: string | null;
  SWIFT: string | null;
}

export interface me_me {
  __typename: "User";
  id: any;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  billings: me_me_billings[];
}

export interface me {
  me: me_me;
}
