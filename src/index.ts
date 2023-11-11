

async function init() {
    const { jamboRee, jamboReeUnallocated } = await import('./jamboree');
    //jamboRee({ preference: "webgpu" });
    jamboReeUnallocated({ preference: "webgpu" });
}

init()