import { QuestionManager } from "./classes/QuestionManager.js";
import { NavigationBar } from "./classes/NavigationBar.js";
import { Table } from "./classes/Table.js";
import data from "./data.json" with {type: "json"}

const navbar = new NavigationBar("navbar")
navbar.appendTo(document.body)
const manager = new QuestionManager(data.questions)
const table = new Table("table", manager, data.tableHeader)
table.appendTo(navbar.div)
navbar.addViewElement("Táblázat", table)
navbar.navigate("table")

manager.getAllElement()