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
        this.#viewElementList = []

        this.div.id = "navbar"
        this.#buttonBar = this.div.appendChild(document.createElement("div"))
        this.#buttonBar.classList.add("buttonbar")
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
            for (const i of this.#buttonBar.children)
                if (i == button)
                    i.classList.add("active")
                else
                    i.classList.remove("active")

            this.#viewContainer.innerHTML = ""
            this.#viewContainer.appendChild(view.div)

            if (view.activateCallback)
                view.activateCallback()
        })

        this.#viewElementList.push(view)
    }

    navigate(id){
        document.getElementById("button_" + id).click()
    }
}

export {NavigationBar}