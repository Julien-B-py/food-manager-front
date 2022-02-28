import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import { gsap } from "gsap";

const FoodCategory = ({ category, children, foods }) => {
  // Create a new array containing only food items that match current prop category
  const foodFromCategory = foods.filter((food) => food.category === category);

  const [visibility, setVisibility] = useState(true);
  const categoryRef = useRef();
  const q = gsap.utils.selector(categoryRef);

  // store the timeline in a ref.
  const tl = useRef();

  useEffect(() => {
    tl.current = gsap
      .timeline()
      .to(
        q(".foodList"),
        {
          height: 0
        },
        0
      )
      .to(q(".dropdown-icon"), { rotation: -180 }, 0);
  }, []);

  useEffect(() => {
    // toggle the direction of our timeline
    tl.current.reversed(visibility);
  }, [visibility]);

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  return (
    <div className="category" ref={categoryRef}>
      <div className="category-header" onClick={toggleVisibility}>
        <h1>{category}</h1>
        <div className="category-end">
          <h5>{foodFromCategory.length}</h5>
          <i className="fas fa-chevron-circle-up dropdown-icon"></i>
        </div>
      </div>
      <div className="foodList">{children}</div>
    </div>
  );
};

FoodCategory.propTypes = {
  category: PropTypes.string,
  foods: PropTypes.array
};

export default FoodCategory;
