import { prisma } from "../../../../generated/prisma-client";
import * as bcrypt from "bcryptjs";

export default {
    Mutation: {
        createAccount: async (_, args) => {
            const {
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
                    { username },
                    { email }
                ]
            });
            //user의 username과 이메일은 중복 X
            if (exists) {
                throw Error("Already Having Email Or Username");
            }
            // await sendMessage(tel,certificationNum);
            const hashedPassword = await bcrypt.hash(password, 5);
            //비밀번호 암호화
            const certificationN = await prisma.phones({
                where: { tel }
            });
            //입력한 폰번호를 가지고 있는 phone Db의 Instance 불러옴
            console.log("aaaa");
            //console.log(certificationN[0].certification);
            console.log(certificationN[0].certification);
            if (certification === certificationN[0].certification) {//입력 인증번호와 불러온 Instance의 인증번호가 같다면
                await prisma.createUser({
                    username,
                    password: hashedPassword,
                    email,
                    gender,
                    tel,
                    certification: certificationN[0].certification
                });
                //새로운 유저 생성
                return true;
            }
        }
    }
};