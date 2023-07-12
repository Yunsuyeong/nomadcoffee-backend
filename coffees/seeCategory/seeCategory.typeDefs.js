import { gql } from "apollo-server";

export default gql`
  type Query {
    seeCategory(offset: Int!): [CoffeeShop]
  }
`;
