import { ComponentType, FC, SVGProps } from "react";
import {
  NavIcon,
  NavItemContainer,
  NavLinkStyled,
  NavText,
} from "./NavItemStyledComponents";

export interface INavItem {
  navigateTo: string;
  text: string;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
  className?: string;
  onClickHandler?: () => void;
}

export interface NavItemProps extends INavItem {
  isExpanded: boolean;
  isLinkActive: (path: string) => boolean;
}

export interface IClientStyling {
  thumbnail: string;
  logo: string;
}

const Navitem: FC<NavItemProps> = ({
  navigateTo,
  text,
  Icon,
  isExpanded,
  isLinkActive,
  onClickHandler,
}) => {
  const isLinkActivated = isLinkActive(navigateTo);

  return (
    <div onClick={onClickHandler} data-testid={`${text}-navlink`}>
      <NavLinkStyled
        data-tooltip-id="navlink"
        data-tooltip-content={text}
        to={navigateTo}
        data-testid={text}
        end
      >
        <NavItemContainer $isLinkActive={isLinkActivated}>
          <NavIcon>
            {Icon && (
              <Icon
                stroke={
                  isLinkActivated ? "var(--primary-200, #177BA6)" : undefined
                }
                fill={
                  isLinkActivated ? "var(--primary-200, #177BA6)" : undefined
                }
              ></Icon>
            )}
          </NavIcon>
          <NavText $isExpanded={isExpanded} $isActive={isLinkActivated}>
            {text}
          </NavText>
        </NavItemContainer>
      </NavLinkStyled>
    </div>
  );
};

export default Navitem;
