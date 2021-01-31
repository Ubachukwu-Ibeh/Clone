import CloneComponent from "./clone.js";
import Header from "./components/Header.js";

const App = () => {
  let isClicked = false;

  return new CloneComponent()
    .markUp(app =>
      app.create(
        "div",
        {},
        { header: Header(isClicked) },
        {
          button: app.create("button", {}, "Change Header title")
        }
      )
    )
    .mounted(app => {
      app.button.onclick = () => {
        isClicked = !isClicked;
        app.header = Header(isClicked);
      };
    });
};
export default App;
