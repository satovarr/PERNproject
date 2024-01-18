import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.mjs";

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    user_id: { type: GraphQLInt },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    oauth_id: { type: GraphQLString },
    role_id: { type: GraphQLInt },
    role: {
      type: RoleType,
      resolve: ()=>"Role"
    },
  }),
});

const RoleType = new GraphQLObjectType({
  name: "Role",
  fields: () => ({
    role_id: { type: GraphQLInt },
    role_name: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { oauth_id: { type: GraphQLString } },
      resolve(parent, args) {
        return getUsers(parent, args);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: getUsers,
    },
    role: {
      type: RoleType,
      args: { role_id: { type: GraphQLInt } },
      resolve: ()=>"Role"
    },
    roles: {
      type: new GraphQLList(RoleType),
    resolve: ()=>"Roles"
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        oauth_id: { type: GraphQLString },
        role_id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        return createUser(parent, args);
      }
    },
    updateUser: {
      type: UserType,
      args: {
        user_id: { type: new GraphQLNonNull(GraphQLInt) },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        oauth_id: { type: GraphQLString },
        role_id: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return updateUser(parent, args);
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        user_id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        return deleteUser(parent, args);
      }
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
