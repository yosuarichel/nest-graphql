// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

module.exports = {
    up: async (queryInterface) => {
        const newData = [];
        const rawData = fs.readFileSync('./src/masterdata/setting.json');
        const Datas = JSON.parse(rawData);
        await Promise.all(
            Datas.map(async (x) => {
                const seedData = {
                    is_app_maintenance: x.is_app_maintenance,
                    app_maintenance_message: x.app_maintenance_message,
                    cms_expiry: x.cms_expiry,
                    deleted_at: null,
                    created_at: new Date(),
                    updated_at: new Date(),
                };
                newData.push(seedData);
            }),
        );

        return queryInterface.bulkInsert('settings', newData);
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    down: (queryInterface, Sequelize) =>
        queryInterface.bulkDelete('settings', null, {
            truncate: true,
            restartIdentity: true,
        }),
};
