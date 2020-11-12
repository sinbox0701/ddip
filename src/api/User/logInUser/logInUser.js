import { prisma } from "../../../../generated/prisma-client";
import * as bcrypt from "bcryptjs";
import { generateToken } from "../../../utils";

export default{
    Mutation:{
        logInUser: async(_,args) => {
            const {email, password} = args;
            const user = await prisma.user({email});
            if(!user){
                throw Error("No User!");
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if(passwordMatch){
                return generateToken(user.id);
            }else{
                throw Error("Wrong Password");
            }
        }
    }
};