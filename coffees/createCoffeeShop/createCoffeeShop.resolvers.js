import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (_, { name }, { loggedInUser }) => {
        let categoryObjs = [];
        if (name) {
          const categories = name.match(/#[\w]+/g);
          categoryObjs = categories.map((category) => ({
            where: { category },
            create: { category },
          }));
        }
        return client.coffeeShop.create({
          data: {
            name,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            categories: {
              connectOrCreate: categoryObjs,
            },
          },
        });
      }
    ),
  },
};
