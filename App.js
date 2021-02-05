import CloneComponent, { createData } from "./clone.js";
import Header from "./components/Header.js";

const App = () => {
  let count = 0;

  const headerProps = createData({
    isClicked: false,
    addNewText: false
  });

  return new CloneComponent()
    .markup(app =>
      app.create(
        "div",
        { class: "main" },
        { header: Header(headerProps) },
        {
          button: app.create("button", {}, "Change Header title")
        },
        app.create("p", {}, { counter: 0 })
      )
    )
    .mounted(app => {
      setInterval(() => {
        headerProps.addNewText = !(count % 2) ? true : false;
        app.counter = count++;
      }, 100);

      app.button.onclick = () => {
        headerProps.isClicked = !headerProps.isClicked;
      };
    });
};

export default App;
