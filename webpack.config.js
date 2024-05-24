const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';


module.exports = {
    mode,
    entry: './src/index.tsx',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'docs'),
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            "@app": path.resolve(__dirname, './src/app/index'),
            "@widgets": path.resolve(__dirname, './src/widgets/index'),
            "@features": path.resolve(__dirname, './src/features/index'),
            "@entities": path.resolve(__dirname, './src/entities/index'),
            "@shared": path.resolve(__dirname, './src/shared/index'),
        }
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.(ts)x?$/,
                exclude: /node_modules|\.d\.ts$/, // this line as well
                use: {
                    loader: 'ts-loader',
                    options: {
                        compilerOptions: {
                            noEmit: false, // this option will solve the issue
                        },
                    }
                }
            }
            ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './public/index.html',
            inject: 'body'
        }),
    ],
};