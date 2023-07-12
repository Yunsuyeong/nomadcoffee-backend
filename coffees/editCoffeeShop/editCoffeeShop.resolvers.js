import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../coffees.utils";

export default {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (_, { id, name }, { loggedInUser }) => {
        const existShop = await client.coffeeShop.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },
          include: {
            categories: {
              select: {
                name: true,
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
            categories: {
              disconnect: existShop.categories,
              connectOrCreate: processHashtags(name),
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
