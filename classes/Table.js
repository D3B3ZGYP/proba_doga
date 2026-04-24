import { ViewElement } from "./ViewElement.js";
import { createTable, clearTbodyAndHandleEmptyList, createRowForTbody, createTextTableCell, createEditTableCell } from "./../gomszab.js"
import { QuestionManager } from "./QuestionManager.js";

class Table extends ViewElement{
    /**
     * @type {QuestionManager}
     */
    #manager

    /**
     * 
     * @param {string} id 
     * @param {QuestionManager} manager 
     * @param {string[]} headerString 
     */
    constructor(id, manager, headerString){
        super(id)
        this.#manager = manager

        const tbody = createTable(headerString, this.div)
        tbody.id = "tbody"

        this.#manager.renderCallback = (list) => {
            clearTbodyAndHandleEmptyList(tbody, list)

            for (const i of list){
                const tr = createRowForTbody(tbody)

                createTextTableCell(i.question, tr)
                createTextTableCell(i.answers[0], tr)
                createTextTableCell(i.answers[1], tr)
                createTextTableCell(i.answers[2], tr)
                createTextTableCell(i.answers[3], tr)
                createTextTableCell(i.rightAnswer, tr)
            }
        }
    }
}

export {Table}