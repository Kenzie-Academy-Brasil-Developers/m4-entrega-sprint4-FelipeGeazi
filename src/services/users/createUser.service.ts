import { IUserRequest } from "./../../interfaces/users/index";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { hash } from "bcrypt";

const createUserService = async (user: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const emailExistente = users.find((item) => item.email === user.email);

  if (emailExistente) {
    throw new Error("Email já existente");
  }

  const hashedPassword = await hash(user.password, 10);
  const userCreate = userRepository.create({
    name: user.name,
    email: user.email,
    isAdm: user.isAdm,
    password: hashedPassword,
  });

  await userRepository.save(userCreate);
  return userCreate;
};

export default createUserService;
