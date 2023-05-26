import { Scene } from "phaser";
import atlas from './assets/0x72_DungeonTilesetII_v1.4.png';
import atlasJSON from './assets/atlas.json';
import mapJSON from './assets/map.json';
import { Goblin } from "./Goblin";
import { Player } from "./Player";

export class MainScene extends Scene {
    map;
    goblin;
      
    preload() {
        this.load.atlas('atlas', atlas, atlasJSON);
        this.load.tilemapTiledJSON('map', mapJSON);
    }
    
    create() {
        const map = this.make.tilemap({ key: 'map' });
        const tiles = map.addTilesetImage('0x72_DungeonTilesetII_v1.4', 'atlas');
        const floor = map.createLayer(0, tiles, 0, 0);
        floor.setScale(4);
        floor.setCollisionByExclusion([130]);
        const walls = map.createLayer(1, tiles, 0, 0);
        walls.setScale(4);
        walls.setCollisionByExclusion([130]);
        let player = this.add.existing(new Player(this, 250, 300));
        let goblin = this.add.existing(new Goblin(this, 600, 600, player));
        this.goblin = goblin;
        const edges = map.createLayer(2, tiles, 0, 0);
        edges.setScale(4);
        this.physics.add.collider(player, floor);
        this.physics.add.collider(goblin, floor);
        this.map = map;
    }
    
}