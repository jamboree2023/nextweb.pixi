
import { Assets, BigPool, Container, EventSystem, Rectangle, TextureStyle, autoDetectRenderer, Text } from 'pixi-v8';
import { BunnyV8 } from './bunny';
import { Pane } from 'tweakpane';

TextureStyle.defaultOptions.scaleMode = 'nearest'
EventSystem.defaultEventFeatures.move = false;
EventSystem.defaultEventFeatures.globalMove = false;

const bunnyPool: BunnyV8[] = [];


export async function jamboRee({ preference }: { preference: 'webgl' | 'webgpu' }) {

    const renderer = await autoDetectRenderer({
        preference,
        clearBeforeRender: true,
        backgroundAlpha: 1,
        backgroundColor: 0xFFFFFF,
        width: 800,
        height: 600,
        resolution: 1,
        antialias: false,
        hello: true,
    })

    document.body.appendChild(renderer.view.canvas as HTMLCanvasElement)
    let initialSize = 1000000;
    const stage = new Container();
    stage.children.length = initialSize;
    const textures = Object.values(await Assets.load([
        './assets/bunnies/rabbitv3_ash.png',
        './assets/bunnies/rabbitv3_batman.png',
        './assets/bunnies/rabbitv3_bb8.png',
        './assets/bunnies/rabbitv3_frankenstein.png',
        './assets/bunnies/rabbitv3_neo.png',
        './assets/bunnies/rabbitv3_sonic.png',
        './assets/bunnies/rabbitv3_spidey.png',
        './assets/bunnies/rabbitv3_stormtrooper.png',
        './assets/bunnies/rabbitv3_superman.png',
        './assets/bunnies/rabbitv3_tron.png',
        './assets/bunnies/rabbitv3_wolverine.png',
        './assets/bunnies/rabbitv3.png',
    ]));

    const bounds = new Rectangle(0, 0, 800, 600);

    // 

    const bunnies: BunnyV8[] = new Array<BunnyV8>(initialSize);
    let bunnyIndex = 0;
    //const bunnies: BunnyV8[] = [];


    const basicText = new Text('Basic text in pixi');

    basicText.x = 50;
    basicText.y = 100;
    
    stage.addChild(basicText);

    setInterval(function(){
        //basicText.text = "There are total " + bunnies.length;
        basicText.text = bunnyIndex + " vs" + bunnies.length;
    }, 1000)

    function addBunny() {

        //const bunny = bunnyPool.pop() || new BunnyV8(textures[bunnies.length % textures.length], bounds)
        const bunny = bunnyPool.pop() || new BunnyV8(textures[bunnyIndex % textures.length], bounds);
        bunnyIndex++;
        
        bunny.reset();

        stage.addChild(bunny.view);
        // if (bunnyIndex > bunnies.length){
        //     bunnies.push(bunny);
        // } else {
        //     bunnies[bunnyIndex] = bunny;
        // }
        bunnies[bunnyIndex] = bunny;
    }

    function loadWatcher(){
        requestAnimationFrame( () => {
            let t = Date.now();
            let fps = Math.round(1000 / (Date.now() - t));
            let addHackathonist = true;
            
            if (fps < 60) {
                console.log("fps danger zone");
                addHackathonist = true;
            }

            if (fps < 24){
                console.log("fps lag detected");
                addHackathonist = false;
            }
            if (addHackathonist){
                addBunny();
            }
            loadWatcher();
        });
    }

    loadWatcher();


    let pause = false;

    renderer.view.canvas.addEventListener('mousedown', () => {
        pause = !pause
    })


    function renderUpdate() {

        if (!pause) {
            for (let i = 0; i < bunnies.length; i++) {
                if (!bunnies[i]){
                    continue;
                }
                bunnies[i].update();
            }
        }

        // bunnies[0].view.visible = !bunnies[0].view.visible;

        renderer.render(stage);
        requestAnimationFrame(renderUpdate)
    }

    renderUpdate();


}


export async function jamboReeUnallocated({ preference }: { preference: 'webgl' | 'webgpu' }) {

    const renderer = await autoDetectRenderer({
        preference,
        clearBeforeRender: true,
        backgroundAlpha: 1,
        backgroundColor: 0xFFFFFF,
        width: 800,
        height: 600,
        resolution: 1,
        antialias: false,
        hello: true,
    })

    document.body.appendChild(renderer.view.canvas as HTMLCanvasElement)

    const stage = new Container();

    const textures = Object.values(await Assets.load([
        './assets/bunnies/rabbitv3_ash.png',
        './assets/bunnies/rabbitv3_batman.png',
        './assets/bunnies/rabbitv3_bb8.png',
        './assets/bunnies/rabbitv3_frankenstein.png',
        './assets/bunnies/rabbitv3_neo.png',
        './assets/bunnies/rabbitv3_sonic.png',
        './assets/bunnies/rabbitv3_spidey.png',
        './assets/bunnies/rabbitv3_stormtrooper.png',
        './assets/bunnies/rabbitv3_superman.png',
        './assets/bunnies/rabbitv3_tron.png',
        './assets/bunnies/rabbitv3_wolverine.png',
        './assets/bunnies/rabbitv3.png',
    ]));

    const bounds = new Rectangle(0, 0, 800, 600);

    const bunnies: BunnyV8[] = [];


    const basicText = new Text('Basic text in pixi');

    basicText.x = 50;
    basicText.y = 100;
    
    stage.addChild(basicText);

    setInterval(function(){
        basicText.text = "There are total " + bunnies.length;
        //basicText.text = bunnyIndex + " vs" + bunnies.length;
    }, 1000)

    function addBunny() {

        const bunny = bunnyPool.pop() || new BunnyV8(textures[bunnies.length % textures.length], bounds)
        
        bunny.reset();

        stage.addChild(bunny.view);
        bunnies.push(bunny);
    }

    function loadWatcher(){
        requestAnimationFrame( () => {
            let t = Date.now();
            let fps = Math.round(1000 / (Date.now() - t));
            let addHackathonist = true;
            
            if (fps < 60) {
                console.log("fps danger zone");
                addHackathonist = true;
            }

            if (fps < 24){
                console.log("fps lag detected");
                addHackathonist = false;
            }
            if (addHackathonist){
                addBunny();
            }
            loadWatcher();
        });
    }

    loadWatcher();


    let pause = false;

    renderer.view.canvas.addEventListener('mousedown', () => {
        pause = !pause
    })


    function renderUpdate() {

        if (!pause) {
            for (let i = 0; i < bunnies.length; i++) {
                if (!bunnies[i]){
                    continue;
                }
                bunnies[i].update();
            }
        }

        // bunnies[0].view.visible = !bunnies[0].view.visible;

        renderer.render(stage);
        requestAnimationFrame(renderUpdate)
    }

    renderUpdate();


}