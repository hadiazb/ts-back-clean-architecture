import Joi from 'joi';
import { Service } from 'typedi';

@Service()
export default class UserSchema {
  public id = Joi.number().min(1);
  public name = Joi.string().min(5).max(15);
  public lastName = Joi.string().min(5).max(15);
  public email = Joi.string().email();
  public password = Joi.string().alphanum().min(8).max(15);
  public rolName = Joi.string();
  public phone = Joi.string().min(7).max(15);
  public isBlock = Joi.boolean();
  public place = Joi.string().min(2).max(30);
  public number = Joi.number();

  public createUserSchema() {
    return Joi.object({
      name: this.name.required(),
      lastName: this.lastName.required(),
      email: this.email.required(),
      password: this.password.required()
    });
  }
  public getUserSchema() {
    return Joi.object({
      id: this.id.required()
    });
  }
  public deleteUserSchema() {
    return Joi.object({
      id: this.id.required()
    });
  }
  public updateUserSchema() {
    return Joi.object({
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      isBlock: this.isBlock,
      phone: this.phone,
      rolName: this.rolName,
      adress: Joi.array().items(
        Joi.object({
          id: this.id,
          idUser: this.id,
          city: this.place,
          state: this.place,
          country: this.place,
          postalCode: this.number
        })
      )
    });
  }
}
