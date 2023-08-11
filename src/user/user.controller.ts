import { Controller, Post, Get, Param, Patch, Delete, Body, Query } from "@nestjs/common";
import { UserService } from "./user.service";

//controller qui va gérer les routes de l'api 
@Controller('users')
export class UserController {
    constructor(private readonly userservice: UserService) { }

    //ajout
    @Post()
    async addUser(@Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string) {
        const UserId = await this.userservice.insertUser(name, email, password);
        return { id: UserId }
    }

    //affichage
    @Get()
    async getAllUsers() {
        const users = await this.userservice.getUsers();
        return users;
    }

    //recherche
    @Get(':id')
    getUser(@Param('id') userId: string) {
        return this.userservice.getSingleUser(userId);
    }

    //modification
    @Patch(':id')
    async updateUser(@Param('id') userId: string,
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string): Promise<any> {
        await this.userservice.updateUser(userId, name, email, password);
        return null;
    }

    //supprimer
    @Delete(':id')
    async removeUser(@Param('id') userId: string) {
        await this.userservice.deleteUser(userId);
        return null;
    }

    @Get('search')
    async searchUsersByName(@Query('name') name: string) {
        const users = await this.userservice.searchByName(name);
        return users;
    }

}