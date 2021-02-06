import CloneComponent, { useProp } from "./clone.js";
import Header from "./components/Header.js";

const App = () => {
  let count = 0;

  const headerProps = useProp({
    isClicked: false
  });

  return new CloneComponent()
    .markup(() => (
      <div class="main">
        <Header props={headerProps} />
        {{ button: <button>Change header title</button> }}
        <p>{{ counter: 0 }}</p>
      </div>
    ))
    .mounted(app => {
      setInterval(() => {
        app.counter = count++;
      }, 100);

      app.button.onclick = () => {
        headerProps.isClicked = !headerProps.isClicked;
      };
    });
};

export default App;
