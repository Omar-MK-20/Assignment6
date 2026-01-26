import { Sequelize } from 'sequelize';

const DBConfig = {
    database: "Assignment6",
    username: "root",
    password: "0000",
    host: "localhost",
    dialect: "mysql"
};


export const sequelize = new Sequelize(DBConfig.database, DBConfig.username, DBConfig.password,
    {
        host: DBConfig.host,
        dialect: DBConfig.dialect
    }
);

export async function testDBConnection()
{
    try
    {
        await sequelize.authenticate();
        console.log("DB connected successfully");
    }
    catch (error)
    {
        console.log({ "Error connecting to database": error });
    }
}


export async function syncDBConnection({ alter, force })
{
    await sequelize.sync({ alter: alter, force: force });
}