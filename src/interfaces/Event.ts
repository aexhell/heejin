import { Bot } from '../client/Client';
import { Message } from 'discord.js';

export interface RunFunction {
   (client: Bot, ...args: any[]): Promise<void>; 
}

export interface Event {
   name: string,
   run: RunFunction
}