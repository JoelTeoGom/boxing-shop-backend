const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'Manoplas',
    tableName: 'manoplas',
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
