module.exports = {
    content: [
        './src/pages/**/*.js',
        './src/js/**/*.js',
        './views/**/*.php',
        './node_modules/flowbite/**/*.js'
    ],
    theme: {
        extend: {
            colors: {
                primary: '#407dc0',
                error: '#f44336',
                success: '#4caf50',
                warning: '#ff9800'
            },
            spacing: {
                nav: '44px',
                banner: '80px'
            }
        }
    },
    plugins: [require('flowbite/plugin')]
};