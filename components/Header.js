import CloneComponent from "../clone.js";

const Header = isClicked =>
  new CloneComponent()
    .markUp(app =>
      app.create(
        "h1",
        {},
        { title: isClicked ? "Beans is good" : "The food was great" }
      )
    )
    .mounted();

export default Header;
