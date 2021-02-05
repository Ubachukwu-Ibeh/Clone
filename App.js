import CloneComponent, { useProp } from "./clone.js";
import Header from "./components/Header.js";

const App = () => {
  let clicked = false;
  let count = 0;

  const props = useProp({
    isClicked: "Beans is good"
  });

  return new CloneComponent()
    .markup(app =>
      app.create(
        "div",
        { class: "main" },
        { header: Header(props) },
        {
          button: app.create("button", {}, "Change Header title")
        },
        app.create("p", {}, { counter: 0 })
      )
    )
    .mounted(app => {
      setInterval(() => {
        app.counter = count++;
      }, 100);

      app.button.onclick = () => {
        clicked = !clicked;
        props.isClicked = clicked ? "The food is great" : "Beans is good";
      };
    });
};

export default App;
