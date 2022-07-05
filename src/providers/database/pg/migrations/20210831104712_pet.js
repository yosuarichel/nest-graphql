module.exports = {
    up: async (queryInterface, Sequelize) => {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.createTable(
                'pets',
                {
                    id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: Sequelize.BIGINT,
                    },
                    name: {
                        allowNull: false,
                        type: Sequelize.STRING,
                    },
                    created_at: {
                        type: Sequelize.DATE,
                    },
                    updated_at: {
                        type: Sequelize.DATE,
                    },
                    deleted_at: {
                        type: Sequelize.DATE,
                    },
                },
                {
                    transaction,
                },
            );
            await queryInterface.addIndex(
                'pets',
                ['id', 'name', 'created_at', 'updated_at', 'deleted_at'],
                {
                    transaction,
                },
            );
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    down: (queryInterface, Sequelize) => queryInterface.dropTable('pets'),
};
