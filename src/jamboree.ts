
import { Assets, Loader, Graphics, Sprite, Container, EventSystem, Rectangle, TextureStyle, autoDetectRenderer, Text } from 'pixi-v8';
import { BunnyV8 } from './bunny';
import { Buttons } from './buttons';
import { Pane } from 'tweakpane';

TextureStyle.defaultOptions.scaleMode = 'nearest'
EventSystem.defaultEventFeatures.move = false;
EventSystem.defaultEventFeatures.globalMove = false;

const bunnyPool: BunnyV8[] = [];
const activeButtonsPool: Buttons[] = [];

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
    });

    renderer.resize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.view.canvas as HTMLCanvasElement)

    const stage = new Container();

    // Load the image
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
        './assets/challanges/final/EnergyRev.png',
        './assets/challanges/final/PainMGMT.png',
        './assets/challanges/final/SenseMotion.png',
        './assets/challanges/final/ResourceRev.png',
        './assets/challanges/final/PeekBehindEyes.png',
        './assets/challanges/final/InteractiveGames.png',
        './assets/challanges/final/SustainableAI.png'
    ]));


    const junctionTexture = Object.values(await Assets.load([
        './assets/junction.map.png'
    ]));

    const junction = new Sprite(junctionTexture[0]);

    junction.anchor.x = 0.5;
    junction.anchor.y = 0.5;

    junction.position.x = window.innerWidth/3;
    junction.position.y = window.innerHeight/3;

    stage.addChild(junction);

    let lastPos: any, delta: any, startPos: any;
    let isKeyDown: boolean;

    addEventListener('pointerdown', onDown);
    addEventListener('pointermove', onMove);
    addEventListener('pointerup', onUP);

    function onDown(e: any) {
        isKeyDown = true
        startPos = { x: e.x, y: e.y }
        console.log("OnDownPress");
        console.log(startPos);
        lastPos = null
    }
    function onMove(e: any) {
        if (!isKeyDown) return
        if (!lastPos) delta = { x: startPos.x - e.x, y: startPos.y - e.y }
        else delta = { x: e.x - lastPos.x, y: e.y - lastPos.y }
        lastPos = { x: e.x, y: e.y }
        stage.x += delta.x
        stage.y += delta.y
    }
    function onUP(e: any) {
        isKeyDown = false
    }
    

    const bounds = new Rectangle(0, 0, window.innerWidth, window.innerHeight);

    const bunnies: BunnyV8[] = [];

    const activeButtons: Buttons[] = [];

    const basicText = new Text('Basic text in pixi 2');

    basicText.x = 50;
    basicText.y = 100;
    
    stage.addChild(basicText);

    setInterval(function(){
        basicText.text = "Hackathonists Arrived:: " + bunnies.length;
    }, 1000)

    function addBunny() {
        const bunnyTextureCount = 12; //textures.length
        const bunny = bunnyPool.pop() || new BunnyV8(textures[bunnies.length % bunnyTextureCount], bounds, 1151.1811026028956, 419.6868185311248)
        //const bunny = bunnyPool.pop() || new BunnyV8(textures[0], bounds, 1151.1811026028956, 419.6868185311248)
        bunny.reset();

        stage.addChild(bunny.view);
        bunnies.push(bunny);
    }

    function addButtons() {
        const tempLenght = 1; // challangeButtons.length

        for (let i = 0; i < tempLenght; i++) {
            console.log("button adding");
            const button = activeButtonsPool.pop() || new Buttons(textures[i], bounds, 282.68548583984375, 275.02545166015625)
            button.reset();
    
            stage.addChild(button.view);
            activeButtons.push(button);
        }

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
            //loadWatcher();
        });
    }

    loadWatcher();
    addButtons();


    let pause = false;

    renderer.view.canvas.addEventListener('mousedown', (e) => {
        pause = !pause;
    });


    function renderUpdate() {

        if (!pause) {
            for (let i = 0; i < bunnies.length; i++) {
                if (!bunnies[i]){
                    continue;
                }
                bunnies[i].update();
            }
        }

        renderer.render(stage);
        requestAnimationFrame(renderUpdate)
    }

    renderUpdate();


}