/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type FilterCriteriaInfo = {
  filter?: InputMaybe<IFilterCriterion>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<ISortCriteria>;
};

export type IFilterCriterion = {
  filters?: InputMaybe<Array<IFilterCriterion>>;
  property?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  typeValue?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type ISortCriteria = {
  column: Scalars['String']['input'];
  order: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProduct: Product;
  createUser: User;
  removeProduct: Product;
  removeUser: User;
  updateProduct: Product;
  updateUser: User;
};


export type MutationCreateProductArgs = {
  productInputDto: ProductInputDto;
};


export type MutationCreateUserArgs = {
  userInputDto: UserInputDto;
};


export type MutationRemoveProductArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateProductArgs = {
  id: Scalars['Int']['input'];
  productInputDto: ProductInputDto;
};


export type MutationUpdateUserArgs = {
  id: Scalars['Int']['input'];
  userInputDto: UserInputDto;
};

export type Product = {
  __typename?: 'Product';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  enabled?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ProductInputDto = {
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  key: Scalars['String']['input'];
  value?: InputMaybe<Scalars['String']['input']>;
};

export type ProductListPageInfoResponse = {
  __typename?: 'ProductListPageInfoResponse';
  data?: Maybe<Array<Product>>;
  limit?: Maybe<Scalars['Int']['output']>;
  page?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
  totalRecords?: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  __typename?: 'Query';
  product: Product;
  productFindAll: Array<Product>;
  productListPage: ProductListPageInfoResponse;
  user: User;
  userFindAll: Array<User>;
  userListPage: UserListPageInfoResponse;
};


export type QueryProductArgs = {
  id: Scalars['Int']['input'];
};


export type QueryProductFindAllArgs = {
  criteria?: InputMaybe<FilterCriteriaInfo>;
};


export type QueryProductListPageArgs = {
  productCriteria?: InputMaybe<FilterCriteriaInfo>;
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserFindAllArgs = {
  criteria?: InputMaybe<FilterCriteriaInfo>;
};


export type QueryUserListPageArgs = {
  userCriteria: FilterCriteriaInfo;
};

export type Role = {
  __typename?: 'Role';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  users: Array<User>;
};

export type User = {
  __typename?: 'User';
  active?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  enabled?: Maybe<Scalars['Boolean']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  password: Scalars['String']['output'];
  role: Role;
  roleId: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UserInputDto = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  email: Scalars['String']['input'];
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  roleId: Scalars['ID']['input'];
};

export type UserListPageInfoResponse = {
  __typename?: 'UserListPageInfoResponse';
  data?: Maybe<Array<User>>;
  limit?: Maybe<Scalars['Int']['output']>;
  page?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
  totalRecords?: Maybe<Scalars['Int']['output']>;
};

export type ProductListPageQueryVariables = Exact<{
  productCriteria: FilterCriteriaInfo;
}>;


export type ProductListPageQuery = { __typename?: 'Query', productListPage: { __typename?: 'ProductListPageInfoResponse', data?: Array<{ __typename?: 'Product', name: string }> | null } };


export const ProductListPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"productListPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productCriteria"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterCriteriaInfo"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productListPage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productCriteria"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productCriteria"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<ProductListPageQuery, ProductListPageQueryVariables>;