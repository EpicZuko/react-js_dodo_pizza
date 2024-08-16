import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, decrementQuantity } from "../../services/cartItemSlice";
import styled from "styled-components";
import cardAdd from "../../assets/images/cardAdd.png";

export const cardData = [
  {
    id: 1,
    img: 'https://media.dodostatic.net/image/r:584x584/11EEF31088C14DF784152A1FF79438F2.avif',
    title: "Диабло",
    description:
      "Острая чоризо, острый перец халапеньо, соус барбекю, митболы, томаты, сладкий перец, красный лук, моцарелла",
    price: 456,
  },
  {
    id: 2,
    img: 'https://media.dodostatic.net/image/r:292x292/11EE7D60109D7D49BF0AC5BCAD0F9679.avif',
    title: "Креветки со сладким чили",
    description:
      "Креветки, ананасы, соус сладкий чили, сладкий перец, моцарелла, соус альфредо",
    price: 545,
  },
  {
    id: 3,
    img: 'https://media.dodostatic.net/image/r:292x292/11EE7D601DD7A15C85B8F38026F12402.avif',
    title: "Баварская",
    description:
      "Охотничьи колбаски, маринованные огурчики, красный лук, томаты, горчичный соус, моцарелла, томатный соус",
    price: 495,
  },
  {
    id: 4,
    img: 'https://media.dodostatic.net/image/r:584x584/11EEF31088C14DF784152A1FF79438F2.avif',
    title: "Чикен Бомбони",
    description:
      "Куриные кусочки в панировке, сладкий перчик, сыры чеддер, пармезан и моцарелла, красный лук, соусы сладкий чили и альфредо",
    price: 456,
  },
  {
    id: 5,
    img: 'https://media.dodostatic.net/image/r:292x292/11EE7D60177073018C580C07B2F34917.avif',
    title: "Сырная ",
    description: "Моцарелла, смесь сыров чеддер и пармезан, соус альфредо",
    price: 456,
  },
  {
    id: 6,
    img: 'https://media.dodostatic.net/image/r:292x292/11EE7D6007F1524DA2ED9C24D3C57ACE.avif',
    title: "Ветчина и сыр",
    description:
      "Ветчина из цыпленка, увеличенная порция моцареллы, соус альфредо",
    price: 295,
  },
  {
    id: 7,
    img: "https://media.dodostatic.net/image/r:292x292/11EE7D5FFFEF64678F36FEAF9DE80589.avif",
    title: "Двойной цыпленок ",
    description: "Двойная порция цыпленка, моцарелла, соус альфредо",
    price: 395,
  },
  {
    id: 8,
    img: 'https://media.dodostatic.net/image/r:292x292/11EEC6DEEF2A8314A75E734E42048301.avif',
    title: "Маргарита",
    description:
      "Увеличенная порция моцареллы, томаты, итальянские травы, томатный соус",
    price: 395,
  },
  {
    id: 9,
    img: 'https://media.dodostatic.net/image/r:292x292/11EF02374C703B36BEFB978E377346A2.avif',
    title: "Кебаб Пицца",
    description:
      "Донерное мясо из говядины, моцарелла, томаты, красный лук, соленые огурчики, соус ранч, томатный соус",
    price: 456,
  },
  {
    id: 10,
    img: 'https://media.dodostatic.net/image/r:292x292/11EE7D5FF78033BC90CAA234BEC0CD26.avif',
    title: "Песто",
    description:
      "Цыпленок, моцарелла, кубики брынзы, томаты, соус песто, соус альфредо",
    price: 495,
  },
  {
    id: 11,
    img: 'https://media.dodostatic.net/image/r:292x292/11EF02374C703B36BEFB978E377346A2.avif',
    title: "Кебаб Пицца",
    description:
      "Донерное мясо из говядины, моцарелла, томаты, красный лук, соленые огурчики, соус ранч, томатный соус",
    price: 456,
  },
  {
    id: 12,
    img: 'https://media.dodostatic.net/image/r:292x292/11EE7D5FF78033BC90CAA234BEC0CD26.avif',
    title: "Песто",
    description:
      "Цыпленок, моцарелла, кубики брынзы, томаты, соус песто, соус альфредо",
    price: 495,
  },
];

const Card = ({ filteredCards }) => {
  console.log(filteredCards);
  const dispatch = useDispatch();
  const counts = useSelector((state) =>
    state.cart.items.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {})
  );

  const handleAddToCart = (item) => {
    dispatch(addItem(item));
  };

  const handleDecrease = (item) => {
    dispatch(decrementQuantity(item.id));
  };

  return (
    <CardContainer>
      {filteredCards.length > 0 ? (
        filteredCards?.map((elem) => (
          <CardItem key={elem.id}>
            <CardImgStyled src={elem.img} alt={elem.title} />
            <H1StyledText>{elem.title}</H1StyledText>
            <TextStyled>{elem.description}</TextStyled>
            <PriceOrButtonContainer>
              <PriceStyled>
                от
                <PriceSpanStyled> {elem.price}₽</PriceSpanStyled>
              </PriceStyled>
              {counts[elem.id] > 0 ? (
                <div>
                  <ButtonMinusStyled onClick={() => handleDecrease(elem)}>
                    -
                  </ButtonMinusStyled>
                  <SpanCounter>{counts[elem.id]}</SpanCounter>
                  <ButtonPlusStyled onClick={() => handleAddToCart(elem)}>
                    +
                  </ButtonPlusStyled>
                </div>
              ) : (
                <ButtonStyled onClick={() => handleAddToCart(elem)}>
                  <img src={cardAdd} alt="Add" /> Добавить
                </ButtonStyled>
              )}
            </PriceOrButtonContainer>
          </CardItem>
        ))
      ) : (
        <p>пока что такие пиццы нет</p>
      )}
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  width: 79.58%;
  padding: 66px 0 0 0;
  flex-wrap: wrap;
`;

const CardItem = styled.div`
  text-align: center;
`;

const CardImgStyled = styled.img`
  width: 211px;
  height: 212px;
  border-radius: 15px;
`;

const H1StyledText = styled.h1`
  /* width: 83px; */
  height: 30px;
  font-family: Nunito;
  font-size: 22px;
  font-weight: 700;
  line-height: 30.01px;
  color: rgba(0, 0, 0, 1);
  padding: 15px 0 34px 0;
  text-align: left;
`;

const TextStyled = styled.p`
  width: 285px;
  height: 63px;
  font-family: Nunito;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  text-align: left;
`;

const PriceStyled = styled.h3`
  width: 79px;
  height: 27px;
  font-family: Nunito;
  font-size: 20px;
  font-weight: 400;
  line-height: 27.28px;
`;

const PriceOrButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 81px;
  padding: 13px 0 0 0;
`;

const PriceSpanStyled = styled.span`
  font-family: Nunito;
  font-size: 20px;
  font-weight: 700;
  color: rgba(0, 0, 0, 1);
`;

const ButtonStyled = styled.button`
  width: 125px;
  height: 42px;
  border-radius: 15px;
  font-family: Nunito;
  font-size: 15px;
  font-weight: 600;
  background: rgba(255, 250, 244, 1);
  color: rgba(254, 95, 0, 1);
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;

const ButtonMinusStyled = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(254, 95, 0, 1);
  font-size: 20px;
  color: rgba(254, 95, 0, 1);
  margin: 0 10px 0 0;
  &:active {
    color: #fff;
    background: rgba(254, 95, 0, 1);
  }
`;
const SpanCounter = styled.span`
  width: 12px;
  height: 27px;
  font-family: Nunito;
  font-size: 20px;
  font-weight: 700;
  line-height: 27.28px;
  text-align: left;
  color: rgba(0, 0, 0, 1);
  margin: 0 15px 0 0;
`;
const ButtonPlusStyled = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(254, 95, 0, 1);
  font-size: 20px;
  color: rgba(254, 95, 0, 1);
  &:active {
    color: #fff;
    background: rgba(254, 95, 0, 1);
  }
`;
