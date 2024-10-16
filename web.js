var blocklyEditor = {
    code: "",
    workspace: null,
    projectName: "",
    lastEdit: {}
};

const blocklyArea = document.getElementById("blocklyArea");
const blocklyDiv = document.getElementById("blocklyDiv");
const editorId = (Math.random() + 1).toString(36).substring(7);

console.log(editorId);

blocklyEditor.workspace = Blockly.inject(blocklyDiv, {
    toolbox: toobox_def,
});
blocklyEditor.onresize = () => {
    // Compute the absolute coordinates and dimensions of blocklyArea.
    var element = blocklyArea;
    var x = 0;
    var y = 0;
    do {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    } while (element);
    // Position blocklyDiv over blocklyArea.
    blocklyDiv.style.left = x + "px";
    blocklyDiv.style.top = y + "px";
    blocklyDiv.style.width = blocklyArea.offsetWidth + "px";
    blocklyDiv.style.height = blocklyArea.offsetHeight + "px";
    Blockly.svgResize(blocklyEditor.workspace);
};
window.addEventListener("resize", blocklyEditor.onresize, false);
blocklyEditor.onresize();

const supportedEvents = new Set([
    Blockly.Events.BLOCK_CHANGE,
    Blockly.Events.BLOCK_CREATE,
    Blockly.Events.BLOCK_DELETE,
    Blockly.Events.BLOCK_MOVE,
]);

blocklyEditor.updateCode = (event) => {
    if (blocklyEditor.workspace.isDragging()) return; // Don't update while changes are happening.
    if (!supportedEvents.has(event.type)) return;

    blocklyEditor.code = javascript.javascriptGenerator.workspaceToCode(
        blocklyEditor.workspace,
    );

    let data = Blockly.serialization.workspaces.save(blocklyEditor.workspace);
    blocklyEditor.code = `// ${JSON.stringify(data)}\n// AUTOGENERATED BY BLOCKLY \n// !!! DO NOT EDIT !!!\n\n${blocklyEditor.code}`;

    document.getElementById("textarea").value = blocklyEditor.code;
    // console.log(blocklyEditor.code);
}

blocklyEditor.onChangeHandler = (event) => {
    if (event.isUiEvent)
        return;

    const json = event.toJson();
    const changeEvent = {
        id: editorId,
        app: "blocklyEditor",
        method: "blocklyEditor.onChangeHandler",
        event: json,
    };

    EventBridge.emitWebEvent(JSON.stringify(changeEvent));
    console.log("Send change: " + JSON.stringify(changeEvent));
    blocklyEditor.lastEdit = json;
}

blocklyEditor.onScriptEventReceived = (message) => {
    console.log("Message received: " + message);
    try {
        message = JSON.parse(message);
    } catch (error) {
        console.log("Couldn't parse script event message: " + error);
        return;
    }
    //console.log("Message parsed: " + JSON.stringify(message));
    switch (message.method) {
        case "blocklyEditor.updateProjectname":
            // document.getElementById("projectName").innerHTML = message.projectName;
            blocklyEditor.projectName = message.projectName;
            console.log("File name updated: " + message.projectName);
            break;
        case "blocklyEditor.updateWorkspace":

            console.log(`test ${editorId} ms ${message.id}`);
            if (message.id == null || message.id == editorId || blocklyEditor.lastEdit == message.event)
                return;

            Blockly.Events.disable();
            let updateEvent = Blockly.Events.fromJson(message.event, blocklyEditor.workspace);
            updateEvent.run(true);
            blocklyEditor.updateCode(updateEvent);
            Blockly.Events.enable();
            console.log("Workspace updated: " + message.event);
            blocklyEditor.lastEdit = message.event;

            break;
        case "blocklyEditor.loadWorkspace":
            if (message.data == null)
                return;
            Blockly.Events.disable();
            console.log("Workspace loaded: " + message.data);
            Blockly.serialization.workspaces.load(JSON.parse(message.data), blocklyEditor.workspace);
            Blockly.Events.enable();
            break;
    }
}
EventBridge.scriptEventReceived.connect(blocklyEditor.onScriptEventReceived);

const saveButton = document.getElementById("saveButton");
saveButton.addEventListener("click", () => {
    var saveEvent = {
        app: "blocklyEditor",
        method: "blocklyEditor.saveButtonClick",
        data: blocklyEditor.code,
    };
    EventBridge.emitWebEvent(JSON.stringify(saveEvent));
    console.log("Save button pressed: " + JSON.stringify(saveEvent));
});

const loadButton = document.getElementById("loadButton");
loadButton.addEventListener("click", () => {
    var loadEvent = {
        app: "blocklyEditor",
        method: "blocklyEditor.loadButtonClick"
    };
    EventBridge.emitWebEvent(JSON.stringify(loadEvent));
    console.log("Load button pressed: " + JSON.stringify(loadEvent));
});

// const projectnameBox = document.getElementById("projectname");
// projectnameBox.addEventListener("input", (val) =>{
//     var prEvent = {
//         app: "blocklyEditor",
//         method: "blocklyEditor.updateProjectname",
//         projectName: val.target.value
//     };
//     EventBridge.emitWebEvent(JSON.stringify(prEvent));
//     console.log("AAAAAAAAAAAAAAAAAAAAA " + JSON.stringify(prEvent));
// });

Blockly.JavaScript.init(blocklyEditor.workspace);
blocklyEditor.workspace.addChangeListener(blocklyEditor.updateCode);
blocklyEditor.workspace.addChangeListener(
    shadowBlockConversionChangeListener,
);
blocklyEditor.workspace.addChangeListener(blocklyEditor.onChangeHandler);