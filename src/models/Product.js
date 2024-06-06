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
            nullable: false,
        },
        description: {
            type: 'text',
            nullable: true,
        },
        image: {
            type: 'varchar',
            nullable: true,
        },
        price: {
            type: 'decimal',
            nullable: false,
        },
        brand: {
            type: 'varchar',
            nullable: false,
        },
        type: {
            type: 'varchar',
            nullable: false,
        },
        stock: {
            type: 'int',
            nullable: false,
        }
    }
});
