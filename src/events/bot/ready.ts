import { RunFunction } from "../../interfaces/Event";

export const run: RunFunction = async (client) => {
   console.log("[READY] I am ready!");
}

export const name: string = 'ready';