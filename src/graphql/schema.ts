import { gql } from 'apollo-server';


export const schema = gql`
    type Query{
        customerOrdersByEmail(email: String!): [Order!]
        getOrderById(orderId: ID!): Order,
        getOrders(paging: PagingFilterInput): [Order]
        getUsers(paging: PagingFilterInput): [User]
    },

    type Mutation{
        # addCustomer(input: String!): Customer,
        addOrder(input: CreateOrderDtoInput): Order,
        deleteOrder(orderId: ID!): Boolean!,
        updateOrder(orderId: ID!, input: UpdateOrderDtoInput): SuccessResponse!,
        userRegistration(registration: UserRegistrationInput): SuccessResponse
        userLogin(login: UserLoginInput): SuccessResponse
    },


    type Customer{
    # uid: ID!,
    email: String!,
    name: String!,
    phone: String!,
    # address: Address,
    # createdAt: Int!,
    # updatedAt: Int!,
    },

    type Address{
        # uid: ID!,
        city: String!,
        country: String!,
        street: String!,
        zip: String!,
        created_at: Float!
        updated_at: Float!
    },

    type Order{
        uid: ID!
        title: String!
        bookingDate:Float!
        customer: Customer!
        updated_at: Float!
        address:Address!
    },

    type User {
        email: String
        name: String
        phone: String
        uid: String
    },

    type SuccessResponse{
        success: Boolean!
        message: String!
    },

    input AddressInput{
        city: String!,
        country: String!,
        street: String!,
        zip: String!,
    },
    input CustomerInput{
        email: String!,
        name: String!,
        phone: String!,
    },
    input CreateOrderDtoInput{
        title: String!
        bookingDate: Float!,
        address: AddressInput!
        customer: CustomerInput!
    },

    input UpdateAddressInput{
        city: String,
        country: String,
        street: String,
        zip: String,
    },
    input UpdateOrderDtoInput{
        title: String
        bookingDate: Float,
        address: UpdateAddressInput!
    },

    input UserRegistrationInput{
        email: String!
        name: String!
        phone: String!
        password: String!
        confirmPassword: String!
    }

    input UserLoginInput{
        email: String!
        password: String!
    }

    input PagingFilterInput{
        page: Int,
        pageSize: Int
    },

    

`;