// This file holds the main code for the plugin. It has access to the *document*.
// You can access browser APIs such as the network by creating a UI which contains
// a full browser environment (see documentation).

// Runs this code if the plugin is run in Figma

if (figma.editorType === 'figma') {

  figma.showUI(__html__);

  for (const node of figma.currentPage.selection.map(async node => {
    if (node.type === "TEXT")
      await Promise.all(
        node.getRangeAllFontNames(0, node.characters.length)
          .map(figma.loadFontAsync)
      )
  }))

    for (const node of figma.currentPage.selection) {
      if (node.type == "TEXT")
        figma.ui.postMessage({ width: node.width, text: node.characters, fontWeight: node.fontWeight, selectedRange: figma.currentPage.selectedTextRange?.node.characters.substring(figma.currentPage.selectedTextRange.start, figma.currentPage.selectedTextRange.end) })
    }

  figma.ui.onmessage = msg => {

    console.log(msg.result)

    for (const node of figma.currentPage.selection) {
      if (node.type == "TEXT")
        node.characters = msg.result
    }

 //   figma.closePlugin();
  }

  // figma.closePlugin();




} else {


  figma.showUI(__html__);

  for (const node of figma.currentPage.selection) {
    if (node.type == "TEXT")
      figma.ui.postMessage({ width: node.width, text: node.characters })
  }

  figma.ui.onmessage = msg => {
    console.log(msg)
    figma.closePlugin();

  }
};
