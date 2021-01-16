module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current'
                }
            }
        ],
        '@babel/preset-typescript'
    ],
    plugins: [
        ['module-resolver', {
            alias: {
                '@config': './src/api/config',
                '@models': './src/api/models',
                '@controllers': './src/api/controllers',
                '@middlewares': './src/api/middlewares'
            }
        }]
    ],
    ignore: [
        '**/*.spec.ts'
    ]
}