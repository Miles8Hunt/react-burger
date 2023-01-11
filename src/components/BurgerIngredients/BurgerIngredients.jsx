import React, { useEffect } from 'react';
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsItem from '../IngredientsItem/IngredientsItem';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { mergeRefs } from 'react-merge-refs';

function BurgerIngredients() {

  const ingredients = useSelector(state => state.burgerIngredientsReducer.ingredients)

  const [current, setCurrent] = React.useState("bun");

  const bun = React.useRef(null);
  const sauce = React.useRef(null);
  const main = React.useRef(null);

  const bunScroll = (id) => {
    setCurrent(id);
    bun.current.scrollIntoView({ behavior: "smooth" })
  }
  const sauceScroll = (id) => {
    setCurrent(id);
    sauce.current.scrollIntoView({ behavior: "smooth" })
  } 
  const mainScroll = (id) => {
    setCurrent(id);
    main.current.scrollIntoView({ behavior: "smooth" })
  }


	const [bunRef, bunInView] = useInView({
		threshold: 0.1
	});
	const [sauceRef, sauceInView] = useInView({
		threshold: 0.1
	});
	const [mainRef, mainInView] = useInView({
		threshold: 0.1
	});

	const handleIngredientScroll = () => {
		switch (true) {
			case bunInView:
				setCurrent('bun');
				break;
			case sauceInView:
				setCurrent('sauce');
				break;
			case mainInView:
				setCurrent('main');
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		handleIngredientScroll();
	}, [bunInView, sauceInView, mainInView]);

  return (
    <section className={`${styles.section} mr-10`}>

      <h1 className={`text text_type_main-large mt-10 mb-5`}>Соберите бургер</h1>
      <div className={styles.switcher}>
					<Tab value="bun" active={current === "bun"} onClick={bunScroll}>
						Булки
					</Tab>
					<Tab value="sauce"
						active={current === "sauce"}
						onClick={sauceScroll}
					>
						Соусы
					</Tab>
					<Tab
						value="main"
						active={current === "main"}
						onClick={mainScroll}
					>
						Начинки
					</Tab>
      </div>

      <div className={styles.ingredients}>
        <h2 ref={mergeRefs([bun, bunRef])} className="text text_type_main-medium">Булки</h2> 
        <ul className={`${styles.container} mt-6 ml-4 mb-10 mr-2`}>
          {
            ingredients.map((ingredient) => {
              if(ingredient.type === 'bun')
              return (
                <IngredientsItem key={ingredient._id} ingredient={ingredient} />   
              )
            })
          }
        </ul>

        <h2 ref={mergeRefs([sauce, sauceRef])} className="text text_type_main-medium">Соусы</h2>
        <ul className={`${styles.container} mt-6 ml-4 mb-10 mr-2`}>
          {
            ingredients.map((ingredient) => {
              if(ingredient.type === 'sauce')
              return (
                <IngredientsItem key={ingredient._id} ingredient={ingredient} /> 
              )
            })
          }
        </ul>

        <h2 ref={mergeRefs([main, mainRef])} className="text text_type_main-medium">Начинки</h2>
        <ul className={`${styles.container} mt-6 ml-4 mb-10 mr-2`}> 
          {
            ingredients.map((ingredient) => {
              if(ingredient.type === 'main')
              return (
                <IngredientsItem key={ingredient._id} ingredient={ingredient} /> 
              ) 
            })
          }
        </ul>
      </div>

    </section>
  )
}

export default BurgerIngredients
