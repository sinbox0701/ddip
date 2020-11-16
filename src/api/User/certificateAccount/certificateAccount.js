import {prisma} from "../../../../generated/prisma-client";
import { generateSecret, sendMessage } from "../../../utils";

export default {
    Mutation:{
        certificateAccount: async (_,args) => {
            const {tel} = args;
            const certification = String(generateSecret());
            //생성한 난수를 String으로 바꿔서 저장
            //console.log(certification);
            try{
                const exists = await prisma.$exists.phone({
                    OR: [
                        {tel}
                    ]
                });
                await sendMessage(tel,certification);
                //메세지 보내기
                if(exists){
                    //console.log("exist");
                    //console.log(tel);
                    await prisma.updatePhone({
                        where:{tel:tel},
                        data:{certification}
                    });
                }
                else{
                    await prisma.createPhone({
                        tel,
                        certification
                    });
                }
                //핸드폰 번호 + 인증 번호 저장 
                return true;
            }
            catch(error){
                console.log("here");
                console.log(error);
                return false;
            }
        }
    }
};