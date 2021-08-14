import { Bot } from '../client/Client';
import { Message } from 'discord.js';

export interface RunFunction {
   (client: Bot, message: Message, args: String[]): Promise<void>; 
}

export interface Command {
   name: string,
   aliases: string[],
   run: RunFunction
}