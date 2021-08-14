import { Client, Collection, Intents } from "discord.js";
import { Command } from '../interfaces/Command';
import { Event } from '../interfaces/Event';
import glob from 'glob';
import { promisify } from 'util';
import { Config } from "../interfaces/Config";

const globPromise = promisify(glob);

class Bot extends Client {
   public commands: Collection<String, Command> = new Collection();
   public aliases: Collection<String, Command> = new Collection();
   public events: Collection<String, Event> = new Collection();
   public utils = require("../config/config");

   public constructor() {
      super({ ws: { intents: Intents.ALL }, messageCacheLifetime: 180, messageCacheMaxSize: 200, messageEditHistoryMaxSize: 200, messageSweepInterval: 200 });
   };

   public async start(token: string): Promise<void> {
      const commandFiles: string[] = await globPromise(`${__dirname}/../commands/**/*{.ts,.js}`);
      const eventFiles: string[] = await globPromise(`${__dirname}/../events/**/*{.ts,.js}`);
      
      commandFiles.map(async (value: string) => {
         const file: Command = await import(value);
         this.commands.set(file.name, file);

         if (file.aliases && Array.isArray(file.aliases)) {
            file.aliases.forEach((alias) => {
               this.aliases.set(alias, file);
            });
         }
         console.log(`[COMMAND] ${file.name} loaded!`);
      });

      eventFiles.map(async (value: string) => {
         const file: Event = await import(value);
         this.events.set(file.name, file);
         console.log(`[EVENT] ${file.name} loaded!`);
         this.on(file.name, file.run.bind(null, this));
      });
      
      this.login(token);
   }
};

export { Bot };