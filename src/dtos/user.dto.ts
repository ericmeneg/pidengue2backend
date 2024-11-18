import { IsNotEmpty, IsString, IsEmail, MinLength } from "class-validator"

export class createUserDTO{
    @IsString()
    @IsNotEmpty()
    name!: string

    @IsEmail()
    email!: string

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password!: string
}