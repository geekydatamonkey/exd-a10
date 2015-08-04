/**
* This function traverses a DOM (sub)tree and executes
*  a given function on each Element and Text node
* it visits.
*
* Author: Douglas Crockford
* Source: http://www.javascriptcookbook.com/article/Traversing-DOM-subtrees-with-a-recursive-walk-the-DOM-function/
*
* @example
* Process all Text nodes on the page
*
*  walkTheDOM(document.body, function (node) {
*    if (node.nodeType === 3) { // Is it a Text node?
*        var text = node.data.trim();
*
*       // Does it have non white-space text content?
*       if (text.length > 0) { 
*             // process text
*         }
*     }
* });
*
*/

'use strict';

export default function walkTheDOM(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        walkTheDOM(node, func);
        node = node.nextSibling;
    }
}

