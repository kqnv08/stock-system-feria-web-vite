import { graphql } from "../../../gql";

export const GET_PRODUCTS = graphql(`
query productListPage($productCriteria:FilterCriteriaInfo!){
  productListPage(productCriteria:$productCriteria){
    data{
      id
      name
      description
    }
    totalRecords
  }
}`)