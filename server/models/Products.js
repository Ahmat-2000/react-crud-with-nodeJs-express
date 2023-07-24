module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define('Products',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
          },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        unite_price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        
    },
    {
        //option pour stoper la labrerie inflection de mettre le nom de tables en pluriels
        freezeTableName: true,
    }
    );
    
    return Products;
}