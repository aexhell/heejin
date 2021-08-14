import { Bot } from "./client/Client";
import { Config } from "./interfaces/Config";
import dotenv from 'dotenv';
dotenv.config();
let config: Config = require('./config/config');

new Bot().start(process.env.DISCORD_TOKEN);