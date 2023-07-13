import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processCategory } from "../coffees.utils";

export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { id, name, latitude, longitude, file, category },
        { loggedInUser }
      ) => {
        const shop = await client.coffeeShop.create({
          data: {
            name,
            latitude,
            longitude,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            categories: {
              connectOrCreate: processCategory(category),
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
