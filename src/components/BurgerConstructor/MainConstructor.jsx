import React from 'react';
import styles from './BurgerConstructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { CONSTRUCTOR_DELETE, CONSTRUCTOR_REORDER } from '../../services/actions/burgerConstructor';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';


function MainConstructor ({ingredient, index}) {

	const dispatch = useDispatch();
  const ref = React.useRef(null)
  const id = ingredient._id;

  const moveIngredient = (dragIndex, hoverIndex) => {
    dispatch({
      type: CONSTRUCTOR_REORDER,
      dragIndex, hoverIndex
    })
  };

  const [{ handlerId }, drop] = useDrop({
    accept: 'constructorCard',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
			if (!ref.current) {
				return
	    }
      const dragIndex = item.index;
	    const hoverIndex = index;
		  if (dragIndex === hoverIndex) {
			  return;
		  };

		  const hoverBoundingRect = ref.current?.getBoundingClientRect();
		  const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
		  const clientOffset = monitor.getClientOffset();
		  const hoverClientY = clientOffset.y - hoverBoundingRect.top;

		  if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
		  	return;
		  };

		  if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			  return;
		  };

		  moveIngredient(dragIndex, hoverIndex);

		  item.index = hoverIndex;
    },
  });

	const [{ isDragging }, drag] = useDrag({
    type: 'constructorCard',
    item: () => {
      	return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

	const handleDeleteItem = () => {
		dispatch({
			type: CONSTRUCTOR_DELETE,
			payload: ingredient.key
		})
	};

  return (
    <li className={`${styles.item} mb-4`} key={ingredient._id} ref={ref} style={{opacity}}>
      <div className={styles.dragIcon}>
        <DragIcon type="primary" />
      </div>                                        
      <ConstructorElement
        text={ingredient.name}
        thumbnail={ingredient.image_mobile}
        price={ingredient.price}
        handleClose={handleDeleteItem}
      />
    </li>
  );
};


export default MainConstructor;

