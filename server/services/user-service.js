const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');

class UserService {
    async signup(email, password) {
        const existingUser = await UserModel.findOne({email});

        if (existingUser) {
            throw ApiError.BadRequest('User with this email address already exists.')
        }
        const hashPwd = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
        
        const user = await UserModel.create({email, password: hashPwd, activationLink})
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)
        
        const userDto = new UserDto({...user._doc})

        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        
        return {
            ...tokens,
            user: userDto
        }
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if (!user) {
            throw ApiError.BadRequest('Incorrect activation link')
        }

        user.isActivated = true
        await user.save()
    }
}

module.exports = new UserService();
