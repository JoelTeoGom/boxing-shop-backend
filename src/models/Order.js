const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'Order',
    tableName: 'orders',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        userId: {
            type: 'int',
        },
        productId: {
            type: 'int',
        },
        quantity: {
            type: 'int',
        },
        total: {
            type: 'decimal',
        },
        createdAt: {
            type: 'timestamp',
            createDate: true,
        },
    },
});
