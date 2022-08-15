import { Application } from '@pixi/app';
import { extensions } from '@pixi/core';
import { Ticker, TickerPlugin } from '@pixi/ticker';
import { Live2DModel } from 'pixi-live2d-display';

extensions.add(
    // register Ticker for Application
    TickerPlugin
);

// register Ticker for Live2DModel
Live2DModel.registerTicker(Ticker);

function createView(): HTMLCanvasElement {
	const node = document.createElement('canvas');
	node.width = node.height = 400;
	document.body.appendChild(node);

	return node;
}

(async function () {
    const app = new Application({
        view: createView(),
        transparent: true
    });

    const model = await Live2DModel.from('https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/haru/haru_greeter_t03.model3.json');
    model.scale.set(0.25);

    app.stage.addChild(model);
})();