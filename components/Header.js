import CloneComponent from "../clone.js";

const Header = props => {
  return new CloneComponent(props)
    .markup(app => app.create("h1", {}, { isClicked: props.isClicked }))
    .mounted();
};

export default Header;
