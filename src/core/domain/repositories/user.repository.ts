import { Injectable } from "@decorators/di";
import { Model } from "mongoose";
import { User, UserDoc } from "../models";
import { BaseRepository } from "./base.repository";

@Injectable()
export class UserRepository extends BaseRepository {
  user: Model<UserDoc>;
  constructor() {
    super(User);
    this.user = User;
  }
}