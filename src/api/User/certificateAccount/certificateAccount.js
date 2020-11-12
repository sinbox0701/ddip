import {prisma} from "../../../../generated/prisma-client";
import { generateSecret, sendMessage } from "../../../utils";

export default {
    Mutation:{
        certificateAccount: async (_,args) => {
            const {tel} = args;
            const certification = String(generateSecret());
            //console.log(certification);
            try{
                await sendMessage(tel,certification);
                await prisma.createPhone({
                    tel,
                    certification
                })
                return true;
            }
            catch(error){
                //console.log(error);
                return false;
            }
        }
    }
};