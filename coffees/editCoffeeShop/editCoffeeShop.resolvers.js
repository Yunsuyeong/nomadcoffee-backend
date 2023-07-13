import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processCategory } from "../coffees.utils";

export default {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { id, name, latitude, longitude, file, category },
        { loggedInUser }
      ) => {
        const existShop = await client.coffeeShop.findFirst({
          where: {
            id,
          },
          include: {
            categories: {
              select: {
                id: true,
              },
            },
          },
        });
        if (!existShop) {
          return {
            ok: false,
            error: "Shop not found",
          };
        }
        await client.coffeeShop.update({
          where: {
            id,
          },
          data: {
            name,
            latitude,
            longitude,
            ...(category && {
              categories: {
                disconnect: existShop.categories,
                connectOrCreate: processCategory(category),
              },
            }),
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
