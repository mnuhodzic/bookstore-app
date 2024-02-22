import { gql } from '@apollo/client/core';

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories(sort: "name") {
      data {
        id
        attributes {
          name
          slug
          image {
            data {
              id
              attributes {
                url
              }
            }
          }
          products {
            data {
              id
              attributes {
                slug
              }
            }
          }
        }
      }
    }
  }
`;

/* we have slug from url and we can't call category API because fetching one category is only possible with id in Strapi,
so this is a workaround to call categories API and filter it*/
export const GET_CATEGORY = gql`
  query GetCategory($slug: String) {
    categories(filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          name
          slug
          products {
            data {
              id
              attributes {
                slug
                name
                price
                image {
                  data {
                    id
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

/* similliar as abobe, we have slug from url and we can't call product API because fetching one product is only possible with id in Strapi,
so this is a workaround to call products API and filter it*/
export const GET_PRODUCT = gql`
  query GetProduct($slug: String) {
    products(filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          slug
          name
          price
          description
          image {
            data {
              id
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_SAME_CATEGORY_PRODUCTS = gql`
  query GetProduct($slug: String) {
    categories(filters: { products: { slug: { contains: $slug } } }) {
      data {
        id
        attributes {
          slug
          products {
            data {
              id
              attributes {
                slug
                name
                image {
                  data {
                    id
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
