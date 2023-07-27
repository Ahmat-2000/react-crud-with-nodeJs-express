module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
          },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            min: 3
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            min: 4,
            max: 12,
            defaultValue: 0,
        },
        
    },
    {
        //option pour stoper la labrerie inflection de mettre le nom de tables en pluriels
        freezeTableName: true,
    }
    );

    /* Association one to many , one user has many products and one product belong to one user*/
    Users.associate = (models) => {
        Users.hasMany(models.Products,{
            onDelete: "cascade",
        });
    };
    return Users;
}