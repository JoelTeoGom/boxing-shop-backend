const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'Heavybag',
    tableName: 'heavybag',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        productId: {
            type: 'int',
            unique: true,
        },
        weight: {
            type: 'decimal',
        },
        stock: {
            type: 'int',
        }
    },
    relations: {
        product: {
            target: 'Product',
            type: 'one-to-one',
            joinColumn: { name: 'productId' },
            onDelete: 'CASCADE',
        }
    }
});
