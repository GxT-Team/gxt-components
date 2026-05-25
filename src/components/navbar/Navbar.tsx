import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useRef,
  FC,
} from "react";
import Avatar, { UserObj } from "../avatar/Avatar";
import { Navitem } from "../navitem";
import { INavItem } from "../navitem/Navitem";
import {
  FooterContent,
  Header,
  HeaderContainer,
  LeadingContent,
  NavList,
  Sidebar,
} from "./NavbarStyledComponents";

export interface NavbarProps {
  footerLinks: INavItem[];
  contentLinks: INavItem[];
  setShowAvatarMenu: Dispatch<SetStateAction<boolean>>;
  showAvatarMenu: boolean;
  clientStyling: ClientStyling;
  user: UserObj;
  isLinkActive: (path: string) => boolean;
  expansionTime?: number;
}

export interface ClientStyling {
  thumbnail: string;
  logo: string;
}

const Navbar: FC<NavbarProps> = ({
  footerLinks,
  contentLinks,
  setShowAvatarMenu,
  showAvatarMenu,
  clientStyling,
  user,
  isLinkActive,
  expansionTime = 300,
}) => {
  const { thumbnail, logo } = clientStyling;

  const [isExpanded, setIsExpanded] = useState(false);
  const [isTimeOutExpanded, setIsTimeOutExpanded] = useState(false);

  const timeoutId = useRef<ReturnType<typeof setTimeout>>();

  const handleMouseEnter = () => setIsTimeOutExpanded(true);

  const handleMouseLeave = () => setIsTimeOutExpanded(false);

  useEffect(() => {
    timeoutId.current = setTimeout(() => {
      setIsExpanded(isTimeOutExpanded);
    }, expansionTime);

    return () => {
      clearTimeout(timeoutId.current);
      timeoutId.current = undefined;
    };
  }, [isTimeOutExpanded]);

  const avatarIcon = (
    <span>
      <Avatar
        size="small"
        onClickHandler={() => setShowAvatarMenu(!showAvatarMenu)}
        user={user}
        isExpanded={isExpanded}
      />
    </span>
  );

  return (
    <Sidebar
      $isExpanded={isExpanded}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid="sidebar"
    >
      <LeadingContent $isExpanded={isExpanded}>
        <HeaderContainer $isExpanded={isExpanded}>
          <Header
            src={isExpanded ? logo : thumbnail}
            alt="company logo"
            data-testid="logo"
            $isExpanded={isExpanded}
          />
        </HeaderContainer>
        <NavList $isExpanded={isExpanded}>
          {contentLinks.map((link) => (
            <Navitem
              key={link.text}
              navigateTo={link.navigateTo}
              text={link.text}
              Icon={link.Icon}
              isExpanded={isExpanded}
              isLinkActive={isLinkActive}
              onClickHandler={link.onClickHandler}
            />
          ))}
        </NavList>
      </LeadingContent>
      <FooterContent>
        {footerLinks.map((link) => (
          <Navitem
            key={link.text}
            navigateTo={link.navigateTo}
            text={link.text}
            Icon={link.Icon}
            isExpanded={isExpanded}
            isLinkActive={isLinkActive}
            onClickHandler={link.onClickHandler}
          />
        ))}
        {avatarIcon}
      </FooterContent>
    </Sidebar>
  );
};

export default Navbar;
