import CloneComponent from "../clone.js";

const Header = props => {
  return new CloneComponent(props)
    .markup(app => app.create("h1", {}, { status: "Happy" }))
    .mounted(app => {
      app.useProp({
        isClicked(val) {
          app.status = val ? "Sad" : "Happy";
        }
      });
    });
};

export default Header;
