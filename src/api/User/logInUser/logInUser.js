import { prisma } from "../../../../generated/prisma-client";
import * as bcrypt from "bcryptjs";
import { generateToken } from "../../../utils";

export default{
    Mutation:{
        logInUser: async(_,args) => {
            const {email, password} = args;
            const user = await prisma.user({email});//입력받은 이메일을 가지고 있는 user 반환
            if(!user){
                throw Error("No User!");
            }
            const passwordMatch = await bcrypt.compare(password, user.password);//암호 복호화 후 입력 비번과 비교
            if(passwordMatch){//맞으면
                return generateToken(user.id);//Token 반환
            }else{
                throw Error("Wrong Password");
            }
        }
    }
};