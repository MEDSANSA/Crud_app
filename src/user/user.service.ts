import { Injectable } from "@nestjs/common";
import { User } from "./user.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UserService {
    private users: User[] = [];

    //call model
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async insertUser(name: string, email: string, password: string) {
        const newUser = new this.userModel({
            name: name,
            email: email,
            password: password,
        });
        const result = await newUser.save();
        return result.id as string;
    }

    async getUsers() {
        const users = await this.userModel.find().exec();
        return users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
        }));
    }

    async getSingleUser(userId: string) {
        const user = await this.findUser(userId);
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
        };
    }

    private async findUser(id: string): Promise<User> {
        let user;
        try {
            user = await this.userModel.findById(id).exec();
        }
        catch (error) {
            throw new error('Could not find user.');
        }
        if (!user) {
            throw new Error('Could not find user.');
        }
        return user;
    }

    async updateUser(userId: string, name: string, email: string, password: string) {
        const updatedUser = await this.findUser(userId);
        if (name) {
            updatedUser.name = name;
        }
        if (email) {
            updatedUser.email = email;
        }
        if (password) {
            updatedUser.password = password;
        }
        updatedUser.save();
    }

    async deleteUser(userId: string) {
        const result = await this.userModel.deleteOne({ _id: userId }).exec();
        if (result.deletedCount === 0) {
            throw new Error('Could not find user.');
        }
    }

    /*
    //login function
    async login(email: string, password: string) {
        // Find the user by their email address and check that a valid password was provided
        console.log("Login");
        var user = null;
        try {
            user = await this.userModel.findOne({ email: email, password: password }).exec();
            }
        catch (error) {
            throw new error('Could not find user.');
            };
        if (!user) {
            throw new Error('Could not find user.');
            };
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
        };
        }
        */
}