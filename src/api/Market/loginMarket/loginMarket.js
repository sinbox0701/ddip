import { prisma } from "../../../../generated/prisma-client";
import * as bcrypt from "bcryptjs";
import { generateToken } from "../../../utils";

export default{
    Mutation:{
        logInMarket: async(_,args) => {
            const {login_id, password} = args;
            const market = await prisma.market({login_id});//입력받은 이메일을 가지고 있는 user 반환
            if(!market){
                throw Error("No Market!");
            }
            const passwordMatch = await bcrypt.compare(password, market.password);//암호 복호화 후 입력 비번과 비교
            if(passwordMatch){//맞으면
                return generateToken(market.id);//Token 반환
            }else{
                throw Error("Wrong Password");
            }
        }
    }
};