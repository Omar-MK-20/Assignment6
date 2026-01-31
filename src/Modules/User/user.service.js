import { User } from "../../DB/User/user.model.js";
import { ResponseError } from "../../util/ResponseError.js";

const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;

export async function signup(bodyData)
{
    const { email, password } = bodyData;

    const existUser = await User.findOne({ where: { email: email } });

    if (existUser)
    {
        throw new ResponseError("Email already exist", 409, { email: email });
    }

    if (!passwordValidation.test(password))
    {
        throw new ResponseError("Password must be Minimum 5 characters, at least one uppercase letter, one lowercase letter, one number and one special character", 422, { password: password });
    }

    try
    {
        const newUser = User.build(bodyData);
        const result = await newUser.save();
        return { message: "User created successfully", result };
    }
    catch (error)
    {
        throw new ResponseError("error creating user");
    }

}

export async function updateOrCreate(userId, bodyData)
{
    const { password } = bodyData;

    if (!passwordValidation.test(password))
    {
        throw new ResponseError("Password must be Minimum 5 characters, at least one uppercase letter, one lowercase letter, one number and one special character", 422, { password: password });
    }

    const result = await User.upsert({ ...bodyData, id: userId }, { validate: false });

    if (result[1])
    {
        return { statusCode: 201, message: "User created successfully", result };
    }

    return { statusCode: 200, message: "User updated successfully", result };
}

export async function getByEmail(email)
{
    const user = await User.findOne({ where: { email: email }, attributes: { exclude: ["password"] } });

    if (!user)
    {
        throw new ResponseError("No user found", 404, { email });
    }

    return { message: "success", user };
}

export async function getById(userId)
{
    const user = await User.findByPk(userId, { attributes: { exclude: ["password", "role"] } });

    if (!user)
    {
        throw new ResponseError("no user found", 404, { userId });
    }

    return { message: "success", user };
}