module.exports = {
    entry: "./src/index.tsx",
    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: "ts-loader"
        },
        {
            enforce: "pre",
            test: /\.js$/,
            loader: "source-map-loader"
        },
        {
            test: /\.css$/,
            loader: "style-loader!css-loader",
            include: /node_modules/
        },
        {
            test: /\.css$/,
            loader: "style-loader!css-loader?modules&localIdentName=[local]_[hash:base64:5]",
            exclude: /node_modules/
        },
        {
            test: /\.(png|jpe?g|gif)/,
            loader: "url-loader?limit=8192&name=images/[hash:8].[name].[ext]"
        }
        ]
    },

    plugins: [],
};