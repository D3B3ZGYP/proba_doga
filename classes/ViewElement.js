/**
 * @callback ActivateCallback
 * @returns {void}
 */

class ViewElement{
    /**
     * @type {string}
     */
    #id
    /**
     * @type {HTMLDivElement}
     */
    #div
    /**
     * @type {ActivateCallback}
     */
    #activateCallback

    get id(){
        return this.#id
    }

    get div(){
        return this.#div
    }

    /**
     * @param {ActivateCallback} value
     */
    set activateCallback(value){
        this.#activateCallback = value
    }

    /**
     * 
     * @param {string} id 
     */
    constructor(id){
        this.#id = id
        this.#div = document.createElement("div")
    }

    /**
     * 
     * @param {HTMLElement} parent 
     */
    appendTo(parent){
        parent.appendChild(this.#div)
    }

    navigate(){
        if (this.#activateCallback)
            this.#activateCallback()
    }
}

export {ViewElement}