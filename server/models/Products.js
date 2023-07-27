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
            allowNull: false
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
        indexes: [
            // Add a unique constraint across UserId and name
            {
                unique: true,
                fields: ['UserId', 'name'],
                name: 'unique_product_for_user'
            }
        ]
    }
    );

    /* Association one to many, one user has many products and one product belongs to one user */
    Products.associate = (models) => {
        Products.belongsTo(models.Users, {
            foreignKey: {
                name: 'UserId',
                allowNull: false
            },
            onDelete: "cascade",
        });
    };

    return Products;
}