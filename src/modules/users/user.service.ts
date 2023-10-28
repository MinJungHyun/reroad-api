import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export class UserService {
  constructor() {}

  async fetchAll() {
    const result = await this.userRepository.find({
      relations: ['imageUser'],
    });

    return result;
  }

  async fetch({ id }) {
    const result = await this.userRepository.findOne({
      where: { id: id },
      relations: ['imageUser'],
    });

    return result;
  }

  async findUserByEmail({ email }) {
    const result = await this.userRepository.findOne({
      where: { email: email },
    });

    return result;
  }

  async create({ createUserInput }) {
    const { email, password, imageUser, ...rest } = createUserInput;

    const user = await this.userRepository.findOne({ where: { email } });
    if (user) throw new ConflictException('이미 가입된 이메일입니다');

    /* 유저 이미지를 등록했다면 */
    let img;
    if (imageUser) {
      img = await this.imageUserRepository.save({
        url: imageUser,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await this.userRepository.save({
      email,
      imageUser: img,
      password: hashedPassword,
      ...rest,
    });

    return result;
  }

  async update({ id, updateUserInput }) {
    const { ...user } = updateUserInput;

    const result = await this.userRepository.save({
      id: id,
      ...user,
    });

    return result;
  }

  async delete({ id }) {
    return await this.userRepository.delete({
      id: id,
    });
  }
}
