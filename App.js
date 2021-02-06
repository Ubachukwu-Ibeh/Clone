import CloneComponent, { useProp, useStyle } from "./clone.js";
import Header from "./components/Header.js";

const App = () => {
  let count = 0;

  const headerProps = useProp({
    isClicked: false
  });

  return new CloneComponent()
    .markup(app =>
      app.create(
        "div",
        { class: "main" },
        Header(headerProps),
        {
          button: app.create("button", {}, "Change Header title")
        },
        app.create("p", { _counterStyles: "red" }, { counter: 0 })
      )
    )
    .mounted(app => {
      // setInterval(() => {
      //   app.counter = count++;
      // }, 100);

      app.button.onclick = () => {
        headerProps.isClicked = !headerProps.isClicked;
        if (headerProps.isClicked) {
          useStyle._counterStyles = {
            fontWeight: "200",
            fontSize: "20pt",
            color: "green"
          };
        } else {
          useStyle._counterStyles = "red";
        }
      };
    });
};

export default App;
