import PropTypes from "prop-types";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-test">
        Treat yourself to your favorite culinary delights right here, with a
        myriad of options to satisfy your cravings. From savory classics to
        innovative creations, our menu offers something for every palate,
        ensuring a delightful dining experience tailored just for you.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              key={index}
              className="explore-menu-list-item"
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt=""
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

// Define propTypes for the ExploreMenu component
ExploreMenu.propTypes = {
  category: PropTypes.string.isRequired, // Category should be a string and required
  setCategory: PropTypes.func.isRequired, // setCategory should be a function and required
};

export default ExploreMenu;