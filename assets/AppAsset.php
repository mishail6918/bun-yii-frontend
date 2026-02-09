<?php
namespace frontend\assets;

use yii\web\AssetBundle;

class AppAsset extends AssetBundle
{
    public $basePath = '@frontend/web/dist';
    public $baseUrl = '@cdn/dist';

    public $css = [
        'styles/main.css',
    ];

    public $js = [
        'js/main.js',
    ];

    public $depends = [
        'yii\web\YiiAsset',
    ];
}