const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'Cart',
    tableName: 'cart',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        userId: {
            type: 'int',
            nullable: false,
        },
        productId: {
            type: 'int',
            nullable: false,
        },
        quantity: {
            type: 'int',
            nullable: false,
        },
    },
    relations: {
        product: {
            target: 'Product',
            type: 'many-to-one',
            joinColumn: { name: 'productId' },
        },
    },
});
