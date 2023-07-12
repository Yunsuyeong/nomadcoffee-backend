import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeCoffeeShops: protectedResolver((_, { offset }, { loggedInUser }) =>
      client.coffeeShop.findMany({
        take: 3,
        skip: offset,
        where: {
          OR: [
            {
              userId: loggedInUser.id,
            },
          ],
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    ),
  },
};
