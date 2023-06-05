import { App } from './App'
import { Bullet } from './Bullet';
import { MainScene } from './MainScene'
import { Player } from './Player';
import './style.css'
import Phaser from 'phaser';
// let scene = new MainScene();
// let app = new App('canvas', scene);
// scene.add(new Player(100, 100, 300, 5));
// console.log(App.app);

var config = {
    type: Phaser.CANVAS,
    width: window.innerWidth,
    height: window.innerHeight,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    },
    scene: new MainScene()
};

var game = new Phaser.Game(config);

