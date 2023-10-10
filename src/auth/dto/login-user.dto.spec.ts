import { plainToClass } from 'class-transformer';
import { LoginUserDto } from './login-user.dto';
import { validate } from 'class-validator';

describe('login-user.dto', () => {
  let loginUserDto: LoginUserDto;

  beforeAll(() => {
    loginUserDto = {
      email: '',
      password: '',
    };
  });

  afterEach(() => {
    loginUserDto = {
      email: '',
      password: '',
    };
  });

  describe('email field', () => {
    it('email is empty', async () => {
      const ofImportDto = plainToClass(LoginUserDto, loginUserDto);
      const errors = await validate(ofImportDto);

      expect(errors.map((err) => err.property).includes('email')).toBeTruthy();
    });

    it('wrong email format', async () => {
      loginUserDto = { ...loginUserDto, email: 'test1234' };
      const ofImportDto = plainToClass(LoginUserDto, loginUserDto);
      const errors = await validate(ofImportDto);

      expect(errors.map((err) => err.property).includes('email')).toBeTruthy();
    });

    it('correct email format', async () => {
      loginUserDto = { ...loginUserDto, email: 'test1234@gmail.com' };
      const ofImportDto = plainToClass(LoginUserDto, loginUserDto);
      const errors = await validate(ofImportDto);

      expect(errors.map((err) => err.property).includes('email')).toBeFalsy();
    });
  });

  describe('password field', () => {
    it('password is empty', async () => {
      const ofImportDto = plainToClass(LoginUserDto, loginUserDto);
      const errors = await validate(ofImportDto);

      expect(
        errors.map((err) => err.property).includes('password'),
      ).toBeTruthy();
    });

    it('password less than min length(5)', async () => {
      loginUserDto = { ...loginUserDto, password: 'test' };
      const ofImportDto = plainToClass(LoginUserDto, loginUserDto);
      const errors = await validate(ofImportDto);

      expect(
        errors.map((err) => err.property).includes('password'),
      ).toBeTruthy();
    });

    it('right password length', async () => {
      loginUserDto = { ...loginUserDto, password: 'test2445' };
      const ofImportDto = plainToClass(LoginUserDto, loginUserDto);
      const errors = await validate(ofImportDto);

      expect(
        errors.map((err) => err.property).includes('password'),
      ).toBeFalsy();
    });
  });
});
