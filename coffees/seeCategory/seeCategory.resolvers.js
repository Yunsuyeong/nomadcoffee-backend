import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeCategory: protectedResolver(async (_, { offset }, { loggedInUser }) => {
      const categories = await client.category.findMany({
        take: 3,
        skip: offset,
        where: {
          OR: {
            userId: loggedInUser.id,
          },
        },
        select: {
          shops: true,
        },
      });
      return categories.map((category) => category.shops);
    }),
  },
};
