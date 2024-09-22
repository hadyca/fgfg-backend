import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createChatRoom: protectedResolver(
      async (_, { guideId, payload }, { loggedInUser }) => {
        const guide = await client.guide.findUnique({
          where: {
            id: guideId,
          },
        });

        const exist = await client.chatRoom.findFirst({
          where: {
            AND: [
              {
                users: {
                  some: { id: loggedInUser.id },
                },
              },
              {
                users: {
                  some: { id: guide.userId },
                },
              },
            ],
          },
        });
        if (exist) {
          console.log("이미 존재하는 채팅방입니다.");
          return {
            id: exist.id,
          };
        }

        const chatRoom = await client.chatRoom.create({
          data: {
            users: {
              connect: [{ id: loggedInUser.id }, { id: guide.userId }],
            },
          },
        });

        //메시지 생성
        await client.message.create({
          data: {
            payload,
            user: {
              connect: { id: loggedInUser.id },
            },
            chatRoom: {
              connect: { id: chatRoom.id },
            },
          },
        });

        return {
          id: chatRoom.id,
        };
      }
    ),
  },
};
