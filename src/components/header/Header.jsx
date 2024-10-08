import React, { useState } from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import logoUser from "../../assets/images/logoUser.png";
import logoBasket from "../../assets/images/logoBasket.svg";
import logosearchIcons from "../../assets/images/logosearchIcons.png";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../services/cartItemSlice";
import { cardData } from "../card/Card"; // Assuming this is where your card data is stored
import Card from "../card/Card"; // Component to display the cards

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter card data based on search query
  const filteredCards = cardData.filter((card) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle modal open
  const handleOpenModal = () => {
    dispatch(openModal());
  };

  return (
    <>
      <HeaderStyled>
        <ContainerLogoNextPizzaDivStyled>
          <div>
            <ImgStyledLogo src={logo} alt="logo" />
          </div>
          <div>
            <H1StyledText>NEXT PIZZA</H1StyledText>
            <PStyledText>вкусней уже некуда</PStyledText>
          </div>
        </ContainerLogoNextPizzaDivStyled>

        <ContainerStyledInput>
          <SearchLogoIconsStyled src={logosearchIcons} alt="search" />
          <InputStyled
            type="search"
            placeholder="Поиск пиццы..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </ContainerStyledInput>

        <ButtonContainerStyled>
          <ButtonStyledLogin>
            <img src={logoUser} alt="logo user" />
            Войти
          </ButtonStyledLogin>
          <ButtonStyledBasket onClick={handleOpenModal}>
            <img src={logoBasket} alt="logo basket" />
            {cart.length > 0 && (
              <BasketQuantityStyled>{cart.length}</BasketQuantityStyled>
            )}
          </ButtonStyledBasket>
        </ButtonContainerStyled>
      </HeaderStyled>

      <Card filteredCards={filteredCards} />
    </>
  );
};

export default Header;

const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 42px;
  border-bottom: 1px solid rgba(237, 237, 237, 1);
`;
const ContainerLogoNextPizzaDivStyled = styled.div`
  display: flex;
  align-items: center;
`;
const ImgStyledLogo = styled.img`
  width: 35px;
  height: 35px;
`;
const H1StyledText = styled.h1`
  height: 33px;
  font-family: Nunito;
  font-size: 24px;
  font-weight: 900;
  line-height: 32.74px;
  letter-spacing: 0.01em;
  text-align: left;
  padding: 0 0 0 15px;
  margin: 0;
`;
const PStyledText = styled.p`
  font-family: Nunito;
  font-size: 16px;
  font-weight: 400;
  line-height: 21.82px;
  text-align: left;
  padding: 0 40px 0 15px;
`;
const ContainerStyledInput = styled.div`
  position: relative;
  width: fit-content;
`;
const InputStyled = styled.input`
  width: 764px;
  height: 50px;
  border-radius: 15px;
  padding: 17px 17px 17px 48px;
  border: none;
  outline: none;
  background: rgba(249, 249, 249, 1);
  font-family: Nunito;
  font-size: 16px;
  font-weight: 400;
  line-height: 21.82px;
  text-align: left;
  margin: 0 66px 0 0;
`;
const SearchLogoIconsStyled = styled.img`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  pointer-events: none;
`;
const ButtonContainerStyled = styled.div`
  display: flex;
  gap: 15px;
`;
const ButtonStyledLogin = styled.button`
  display: flex;
  gap: 7px;
  justify-content: center;
  align-items: center;
  width: 110px;
  height: 50px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(254, 95, 0, 1);
  font-family: Nunito;
  font-size: 16px;
  font-weight: 600;
  line-height: 21.82px;
  text-align: center;
  color: rgba(254, 95, 0, 1);
  cursor: pointer;
  &:hover {
    background: rgba(55, 55, 55, 1);
  }
`;
const ButtonStyledBasket = styled.button`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(254, 95, 0, 1);
  cursor: pointer;
  &:hover {
    background: rgba(55, 55, 55, 1);
  }
`;
const BasketQuantityStyled = styled.span`
  position: absolute;
  top: -10px;
  right: -10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgba(254, 95, 0, 1);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Nunito;
  font-size: 14px;
  font-weight: 600;
`;
