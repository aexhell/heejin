import { RunFunction } from "../../interfaces/Event";

export const run: RunFunction = async (client, message) => {
   if (message.author.bot) return;
   if (message.channel.type === "dm") return;
      
   let messageArray: string[] = message.content.split(" ");
   let cmd: string = messageArray[1];
   let args: string[] = messageArray.slice(2);

   if (messageArray[0] !== client.utils.config.prefix) return;

   let commandfile = client.commands.get(cmd) || client.aliases.get(cmd);
   if (commandfile) {
      console.log(`[EXEC] ${message.author.tag} executed command "${cmd}"`);
      return commandfile.run(client, message, args);
   }
}

export const name: string = 'message';