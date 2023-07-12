import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { username }, { loggedInUser }) => {
      const ok = await client.user.findUnique({
        where: { username },
      });
      if (!ok) {
        return {
          ok: false,
          error: "That user does not exist",
        };
      }
      const currentFollowing = await client.user.findFirst({
        where: {
          id: loggedInUser.id,
          following: {
            some: {
              username,
            },
          },
        },
        select: {
          id: true,
        },
      });
      if (!currentFollowing) {
        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            following: {
              connect: {
                username,
              },
            },
          },
        });
      } else {
        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            following: {
              disconnect: {
                username,
              },
            },
          },
        });
      }
      return {
        ok: true,
      };
    }),
  },
};
