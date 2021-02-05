import CloneComponent, { useData } from "../clone.js";

const Header = props => {
  return new CloneComponent(props)
    .markup(app => app.create("h1", {}, { text: "" }, { status: "Happy" }))
    .mounted(app => {
      app.data = useData({
        isClicked(val) {
          app.status = val ? "Sad" : "Happy";
        },
        addNewText(val) {
          app.text = val ? "Brown" : "Blue";
        }
      });
    });
};

export default Header;
