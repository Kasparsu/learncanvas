import { Scene } from "phaser";
import atlas from './assets/0x72_DungeonTilesetII_v1.4.png';
import atlasJSON from './assets/atlas.json';
import mapJSON from './assets/map.json';
import { Player } from "./Player";
import { Enemy } from "./Goblin";
export class MainScene extends Scene {
    map;
    enemyGroup;
    player;
    canRestart = false; // Flag to control restart

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
        this.player = this.add.existing(new Player(this, 250, 100)); // Assign to the class property
        let enemy = this.add.existing(new Enemy(this, 800, 400, this.player)); // Use this.player
        let enemy2 = this.add.existing(new Enemy(this, 600, 800, this.player)); // Use this.player
        //create a group of enemy
        let enemyGroup = this.add.group();
        enemyGroup.add(enemy);
        enemyGroup.add(enemy2);
        this.enemyGroup = enemyGroup;
        const edges = map.createLayer(2, tiles, 0, 0);
        edges.setScale(4);
        this.physics.add.collider(this.player, floor); // Use this.player
        this.map = map;

        // Create a game over text (initially invisible)
        this.gameOverText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2 - 50, // Adjust the Y position
            'Defeat\nPress R to Restart',
            {
                fontSize: '48px',
                fill: '#fff',
                align: 'center',
            }
        );
        this.gameOverText.setOrigin(0.5);
        this.gameOverText.setVisible(false);

        // Create a victory text (initially invisible)
        this.victoryText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2 - 30, // Adjust the Y position
            'Victory!\nPress R to Restart',
            {
                fontSize: '48px',
                fill: '#fff',
                align: 'center',
            }
        );
        this.victoryText.setOrigin(0.5);
        this.victoryText.setVisible(false);

        // Handle restart on "R" key press when allowed
        this.input.keyboard.on('keydown-R', () => {
            if (this.canRestart) {
                // Reload the current page to restart the game
                window.location.reload();
            }
        });
    }

    // Add this method to update the game over screen
    update() {
        if (this.player.health <= 0 && !this.gameOverText.visible) { // Use this.player
            // Show the game over text
            this.gameOverText.setVisible(true);
            this.canRestart = true; // Allow restart
            // Disable player input
            this.player.input.enabled = false;
        }

        // Check for victory conditions (all goblins defeated)
        let allGoblinsDefeated = true;
        this.enemyGroup.children.iterate((goblin) => {
            if (goblin.health > 0) {
                allGoblinsDefeated = false;
                return false; // Exit iteration early if at least one goblin is alive
            }
        });

        if (allGoblinsDefeated && !this.victoryText.visible) {
            // Show the victory text
            this.victoryText.setVisible(true);
            this.canRestart = true; // Allow restart
            // Disable player input
            this.player.input.enabled = false;
        }
    
    }
    
}