import { RunFunction } from "../../interfaces/Command";

export const run: RunFunction = async (client, message, args) => {
   message.channel.send({
      embed: {
         title: ":heartbeat:",
         fields: [
            {
               name: "API",
               value: `\`${Math.round(client.ws.ping)}\` ms.`,
               inline: true
            },
            {
               name: "Edit",
               value: "wip",
               inline: true
            }
         ],
         color: "RANDOM"
      }
   });
}

export const name: string = 'ping';
export const aliases: string[] = [];