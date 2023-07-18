import { graphql } from "../src/gql";

export const GET_PRODUCTS = graphql(`
query productListPage($productCriteria:FilterCriteriaInfo!){
  productListPage(productCriteria:$productCriteria){
    data{
      name
    }
    
  }
}`)