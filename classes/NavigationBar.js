import { ViewElement } from "./ViewElement.js"
import { createButton } from "./../gomszab.js"

class NavigationBar extends ViewElement{
    /**
     * @type {ViewElement[]}
     */
    #viewElementList
    /**
     * @type {HTMLDivElement}
     */
    #buttonBar
    /**
     * @type {HTMLDivElement}
     */
    #viewContainer

    constructor(id){
        super(id)

        this.#buttonBar = this.div.appendChild(document.createElement("div"))
        this.#viewContainer = this.div.appendChild(document.createElement("div"))
    }

    /**
     * 
     * @param {string} label 
     * @param {ViewElement} view 
     */
    addViewElement(label, view){
        const button = this.#buttonBar.appendChild(createButton({label, id: "button_" + view.id}))
        button.addEventListener("click", () => {
            button.classList.add("activate")
            this.#viewContainer.innerHTML = view
        })

        this.#viewElementList.push(view)
    }

    navigate(id){
        document.getElementById("button_" + id).click()
    }
}