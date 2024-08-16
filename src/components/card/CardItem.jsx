import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  incrementQuantity,
  decrementQuantity,
  closeModal,
} from "../../services/cartItemSlice";
import styled from "styled-components";
import closeIcons from "../../assets/images/closeIcons.png";
import cartImg from "../../assets/images/Group 117.png";
import buttonIcons from "../../assets/images/Group.svg";
import rightIconsButton from "../../assets/images/Group.svg";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate tax (5% of total)
  const tax = Math.round(totalPrice * 0.05);

  return (
    <>
      <CartBackdrop onClick={() => dispatch(closeModal())} />
      <CartContainer>
        <LogoCartAdd>
          <H1StyledText>
            В корзине
            <SpanCounterStyled> {cart.length} товара</SpanCounterStyled>
          </H1StyledText>
          <ButtonClose onClick={() => dispatch(closeModal())}>
            <img src={closeIcons} alt="close icons" />
          </ButtonClose>
        </LogoCartAdd>
        {cart.length === 0 ? (
          <CardNone>
            <ImgCoropka src={cartImg} alt="img" />
            <h1>Корзина пустая</h1>
            <p>Добавьте хотя бы одну пиццу, чтобы совершить заказ</p>
            <button>
              <ImgNazad src={buttonIcons} alt="" />
              Вернуться назад
            </button>
          </CardNone>
        ) : (
          cart.map((item) => (
            <CartItem key={item.id}>
              <img
                style={{ width: "65px", height: "65px" }}
                src={item.img}
                alt=""
              />
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ButtonContainer>
                  <div>
                    <ButtonMinusStyled
                      onClick={() => dispatch(decrementQuantity(item.id))}
                    >
                      -
                    </ButtonMinusStyled>
                    <SpanCounter>{item.quantity}</SpanCounter>
                    <ButtonPlusStyled
                      onClick={() => dispatch(incrementQuantity(item.id))}
                    >
                      +
                    </ButtonPlusStyled>
                  </div>
                  <div>
                    <span>{item.price * item.quantity}₽</span>
                  </div>
                </ButtonContainer>
                <ButtonRemoveStyled
                  onClick={() => dispatch(removeItem(item.id))}
                >
                  Удалить
                </ButtonRemoveStyled>
              </div>
            </CartItem>
          ))
        )}
        {cart.length > 0 && (
          <TotalTaxContainer>
            <TotalContainerStyled>
              <h1>Итого:</h1>
              <h4 />
              <span>{totalPrice}₽</span>
            </TotalContainerStyled>
            <TaxContainerStyled>
              <h1>Налог 5%:</h1>
              <h4 />
              <span>{tax}₽ </span>
            </TaxContainerStyled>
            <PlaceAnOrderButton>
              Оформить заказ <img src={rightIconsButton} alt="" />
            </PlaceAnOrderButton>
          </TotalTaxContainer>
        )}
      </CartContainer>
    </>
  );
};

export default Cart;

// Your styled-components here...

const CartBackdrop = styled.div`
  background: rgba(0, 0, 0, 0.6);
  position: fixed; /* Changed to fixed for full screen coverage */
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw; /* Full viewport width */
  height: 100vh; /* Full viewport height */
  z-index: 999; /* Ensure it sits above other content */
`;

// Styled Components
const CartContainer = styled.div`
  width: 395px;
  height: 100vh; /* Сделать контейнер высотой на весь экран */
  max-height: 100vh; /* Ограничить максимальную высоту */
  background: rgba(244, 241, 238, 1);
  position: fixed;
  top: 0;
  right: 0;
  overflow-y: auto; /* Добавить вертикальную прокрутку, если контент превышает высоту контейнера */
  padding: 20px;
  z-index: 1000;
`;

const H1StyledText = styled.h1`
  font-family: Nunito;
  font-size: 20px;
  font-weight: 400;
  line-height: 27.28px;
  text-align: left;
`;
const SpanCounterStyled = styled.span`
  font-family: Nunito;
  font-size: 20px;
  font-weight: 700;
  line-height: 27.28px;
  text-align: left;
  color: rgba(0, 0, 0, 1);
`;
const LogoCartAdd = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* padding: 21px 21px 26px 20px; */
`;
const ButtonClose = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;
const CartItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  width: 350px;
  height: auto;
  background: rgba(255, 255, 255, 1);
  padding: 10px 0px 10px 20px;
  h3 {
    font-family: Nunito;
    font-size: 16px;
    font-weight: 700;
    line-height: 21.82px;
    text-align: left;
    color: rgba(0, 0, 0, 1);
    padding: 20px 0 0 24px;
  }
  p {
    font-family: Nunito;
    font-size: 14px;
    font-weight: 400;
    line-height: 19.1px;
    text-align: left;
    padding: 20px 0 0 24px;
  }
  span {
    font-family: Nunito;
    font-size: 16px;
    font-weight: 700;
    line-height: 21.82px;
    text-align: right;
    color: rgba(0, 0, 0, 1);
  }
  img {
    display: flex;
    align-items: center;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 100px;
  margin: 10px 0 10px 22px;
`;
const ButtonMinusStyled = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(254, 95, 0, 1);
  font-size: 18px;
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
  font-size: 18px;
  font-weight: 700;
  line-height: 27.28px;
  text-align: left;
  color: rgba(0, 0, 0, 1);
  margin: 0 15px 0 0;
`;
const ButtonPlusStyled = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(254, 95, 0, 1);
  font-size: 18px;
  color: rgba(254, 95, 0, 1);
  &:active {
    color: #fff;
    background: rgba(254, 95, 0, 1);
  }
`;
const ButtonRemoveStyled = styled.button`
  background: none;
  border: none;
  color: rgba(254, 95, 0, 1);
  font-family: Nunito;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  padding: 10px 0;
  margin-top: 10px;
  transition: color 0.3s ease;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin: 0 0 0 200px;
  &:hover {
    color: rgba(200, 50, 0, 1);
  }

  &:active {
    color: rgba(150, 0, 0, 1);
  }
`;
const CardNone = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 200px 0 0 0;
  /* img {
    width: 120px;
    height: 120px;
  } */
  h1 {
    width: 165px;
    height: 30px;
    font-family: Nunito;
    font-size: 22px;
    font-weight: 600;
    line-height: 30.01px;
    text-align: left;
    margin: 0 0 6px 0;
  }
  p {
    width: 285px;
    height: 48px;
    font-family: Nunito;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    text-align: center;
    margin: 0 0 37px 0;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    width: 230px;
    height: 55px;
    border-radius: 18px;
    font-family: Nunito;
    font-size: 16px;
    font-weight: 700;
    line-height: 21.82px;
    text-align: center;
    background: rgba(254, 95, 0, 1);
    color: rgba(255, 255, 255, 1);
    border: none;
    cursor: pointer;
  }
`;
const ImgNazad = styled.img`
  width: 13.71px;
  height: 11.99px;
`;
const ImgCoropka = styled.img`
  width: 120px;
  height: 120px;
`;
const TotalContainerStyled = styled.div`
  display: flex;
  align-items: center;
  h1 {
    font-family: Nunito;
    font-size: 16px;
    font-weight: 400;
    line-height: 21.82px;
    text-align: left;
    color: rgba(0, 0, 0, 1);
  }
  h4 {
    border-bottom: 1px dashed rgba(223, 223, 223, 1);
    width: 195px;
    height: 1px;
    text-align: bottom;
    margin: 0 12px 0 12px;
    padding: 10px 0 0 0;
  }
  span {
    font-family: Nunito;
    font-size: 18px;
    font-weight: 700;
    line-height: 24.55px;
    text-align: right;
    color: rgba(0, 0, 0, 1);
  }
`;
const TotalTaxContainer = styled.div`
  width: 340px;
  height: 207px;
  padding: 10px 15px 10px 15px;
  margin: 0;
  background: rgba(255, 255, 255, 1);
`;
const TaxContainerStyled = styled.div`
  display: flex;
  align-items: center;
  h1 {
    font-family: Nunito;
    font-size: 16px;
    font-weight: 400;
    line-height: 21.82px;
    text-align: left;
    color: rgba(0, 0, 0, 1);
  }
  h4 {
    border-bottom: 1px dashed rgba(223, 223, 223, 1);
    width: 195px;
    height: 1px;
    text-align: bottom;
    margin: 0 12px 0 12px;
    padding: 10px 0 0 0;
  }
  span {
    font-family: Nunito;
    font-size: 18px;
    font-weight: 700;
    line-height: 24.55px;
    text-align: right;
    color: rgba(0, 0, 0, 1);
  }
`;
const PlaceAnOrderButton = styled.button`
  width: 325px;
  height: 55px;
  border-radius: 18px;
  font-family: Nunito;
  font-size: 16px;
  font-weight: 700;
  line-height: 21.82px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
  border: none;
  gap: 40px;
  background: rgba(254, 95, 0, 1);
  margin: 21px 0 0 0;
`;
