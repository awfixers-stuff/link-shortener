import { Resend } from "resend";
import { env } from "./env";

export const resendServer = new Resend(env.RESEND_API_KEY);
export const resendClient = new Resend(process.env.RESEND_API_KEY);
