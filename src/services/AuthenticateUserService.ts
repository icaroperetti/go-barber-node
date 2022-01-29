import {getRepository} from 'typeorm'
import User from '../models/User';
import {compare} from 'bcryptjs';
import {sign,verify} from 'jsonwebtoken'

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({email,password}:Request):Promise<Response> {

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where:{email}
    });

    if (!user){
      throw new Error('Incorrect email/password combination');
    }

    const passwordMatched = await compare(password,user.password);


    if (!passwordMatched){
      throw new Error('Incorrect email/password combination');
    }

    const token = sign({},'8e0aa9be3067b42fc11f634348a0e68c',{
      subject:user.id,
      expiresIn:'1d',
    })

    return {
      user,
      token
    }

  }
}

export default AuthenticateUserService;
