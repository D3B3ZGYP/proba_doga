import { QuestionManager } from "./classes/QuestionManager.js";
import { NavigationBar } from "./classes/NavigationBar.js";
import { Table } from "./classes/Table.js";
import data from "./data.json" with {type: "json"}
import { FormController } from "./classes/FormController.js";

const navbar = new NavigationBar("navbar")
navbar.appendTo(document.body)
const manager = new QuestionManager(data.questions)

const table = new Table("table", manager, data.tableHeader)
navbar.addViewElement("Táblázat", table)
manager.getAllElement()

const form = new FormController("form", manager, data.formFieldList)
navbar.addViewElement("Form", form)

navbar.navigate("table")