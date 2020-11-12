import { prisma } from "../../../../generated/prisma-client";
import * as bcrypt  from "bcryptjs";

export default{
    Mutation:{
        createAccount: async (_,args) => {
            const{
                username,
                password,
                email,
                gender,
                tel,
                certification
            } = args;

            // const certificationNum = generateSecret();

            const exists = await prisma.$exists.user({
                OR: [
                    {username},
                    {email}
                ]
            });
            
            if(exists){
                throw Error("Already Having Email Or Username");
            }
            // await sendMessage(tel,certificationNum);
            try{
                const hashedPassword = await bcrypt.hash(password,5);
                const certificationN = await prisma.phones({
                    where:{tel}
                });
                //console.log("aaaa");
                //console.log(certificationN[0].certification);
                if(certification === certificationN[0].certification){
                    const newUser = await prisma.createUser({
                        username,
                        password:hashedPassword,
                        email,
                        gender,
                        tel,
                        certification:certificationN[0].certification
                    });
                    //console.log(newUser);
                    return newUser;
                }
                else{
                    throw Error("Error certification");
                }
            }catch(error){
                throw Error("Error createAccount");
                //console.log(error);
            }
        }
    }
};