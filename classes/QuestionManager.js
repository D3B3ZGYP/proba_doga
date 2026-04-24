/**
 * @typedef {{question: string, answer1: string, answer2: string, answer3: string, answer4: string, rightAnswer: string}} QuestionType
 * 
 * @callback RenderCallback
 * @param {Question[]} list
 * @returns {void}
 * 
 * @callback ImportResultCallback
 * @param {string} message
 * @returns {void}
 * 
 * * @callback AddStatusCallback
 * @param {string} message
 * @returns {void}
 */

class QuestionManager{
    /**
     * @type {Question[]}
     */
    #questionList
    /**
     * @type {RenderCallback}
     */
    #renderCallback
    /**
     * @type {AddStatusCallback}
     */
    #addStatusCallback
    /**
     * @type {ImportResultCallback}
     */
    #importResultCallback

    /**
     * @param {RenderCallback} value
     */
    set renderCallback(value){
        this.#renderCallback = value
    }

    /**
     * @param {AddStatusCallback} value
     */
    set addStatusCallback(value){
        this.#addStatusCallback = value
    }

    /**
     * 
     * @param {QuestionType[]?} questions 
     */
    constructor(questions){
        this.#questionList = []

        if (!questions || questions.length == 0) return

        for (const i of questions){
            const question = this.#createQuestion(i)
            this.#questionList.push(question)
        }
    }

    /**
     * 
     * @returns {void}
     */
    getAllElement(){
        this.#renderCallback(this.#questionList)
    }

    /**
     * 
     * @param {QuestionType} questionType
     * @returns {Question}
     */
    #createQuestion(questionType){
        const question = new Question()
        question.answers = [questionType.answer1, questionType.answer2, questionType.answer3, questionType.answer4]
        question.question = questionType.question
        question.rightAnswer = questionType.rightAnswer
        question.id = this.#questionList.length

        return question
    }

    /**
     * 
     * @param {QuestionType} questionType
     * @returns {void}
     */
    addElement(questionType){
        const question = this.#createQuestion(questionType)

        if (question.validate()){
            this.#questionList.push(question)
            this.#addStatusCallback("Sikeres hozzáadás!")
        } else {
            this.#addStatusCallback("Hibás hozzáadás!")
        }
    }

    /**
     * 
     * @param {QuestionType[]} questions 
     * @returns {void}
     */
    addElementList(questions){
        for (const i of questions)
            this.#questionList.push(this.#createQuestion(i))
    }

    /**
     * 
     * @returns {string}
     */
    getExportContent(){

    }
}

class Question{
    /**
     * @type {string}
     */
    #id
    /**
     * @type {string}
     */
    #question
    /**
     * @type {string[]}
     */
    #answers
    /**
     * @type {string}
     */
    #rightAnswer

    get id(){
        return this.#id
    }

    /**
     * @param {string} value
     */
    set id(value){
        this.#id = value
    }

    get question(){
        return this.#question
    }

    /**
     * @param {string} value
     */
    set question(value){
        this.#question = value
    }

    get answers(){
        return this.#answers
    }

    /**
     * @param {string[]} value
     */
    set answers(value){
        this.#answers = value
    }

    get rightAnswer(){
        return this.#rightAnswer
    }

    /**
     * @param {string} value
     */
    set rightAnswer(value){
        this.#rightAnswer = value
    }

    validate(){
        return this.#question && this.#rightAnswer && this.#answers[0] && this.#answers[1] && this.#answers[2] && this.#answers[3]
    }
}

export {QuestionManager}