import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeCategory: async (_, { id, lastId }) =>
      client.category
        .findUnique({
          where: { id },
        })
        .shops({
          take: 3,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        }),
  },
};
