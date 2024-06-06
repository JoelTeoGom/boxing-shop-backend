const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'Product',
    tableName: 'products',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        name: {
            type: 'varchar',
        },
        description: {
            type: 'text',
        },
        image: {
            type: 'varchar',
        },
        price: {
            type: 'decimal',
        },
        brand: {
            type: 'varchar',
        },
        category: {
            type: 'varchar',
            nullable: false,
        }
    },
});
