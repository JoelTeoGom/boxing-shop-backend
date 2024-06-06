const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'Gloves',
    tableName: 'gloves',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        productId: {
            type: 'int',
        },
        size: {
            type: 'varchar',
        },
        stock: {
            type: 'int',
        }
    },
    relations: {
        product: {
            target: 'Product',
            type: 'many-to-one',
            joinColumn: { name: 'productId' },
            onDelete: 'CASCADE',
        }
    }
});
