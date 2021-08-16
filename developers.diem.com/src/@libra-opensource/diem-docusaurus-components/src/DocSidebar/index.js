import React, { useState, useCallback } from "react";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useLockBodyScroll from "@theme/hooks/useLockBodyScroll";
import Link from "@docusaurus/Link";
import SearchBar from "./SearchBar";
import isInternalUrl from "@docusaurus/isInternalUrl";

import scrollToTop from "../utils/scrollToTop";
import WithBackgroundImage from "../WithBackgroundImage";

import classnames from "classnames";
import styles from "./styles.module.css";

const MOBILE_TOGGLE_SIZE = 24;

const getClasses = (classNames = []) =>
  classNames.map((c) =>
    typeof c === "object" && c.global ? c.name : styles[c]
  );

function DocSidebarItem({
  theme = "primary",
  item,
  onItemClick,
  collapsible,
  ...props
}) {
  const { customProps = {}, items, label, type } = item;
  const {
    classNames,
    containerClassNames,
    fragmentIdentifier,
    icon,
    iconHover,
    iconDark,
    iconDarkHover,
    iconClasses,
    noLink,
    theme: itemTheme = theme,
  } = customProps;
  const [collapsed, setCollapsed] = useState(item.collapsed);
  const [prevCollapsedProp, setPreviousCollapsedProp] = useState(null);
  const sidebarLabel = customProps.sidebarLabel
    ? customProps.sidebarLabel
    : label;
  const href = fragmentIdentifier
    ? `${item.href}#${fragmentIdentifier}`
    : item.href;
  let ItemTag;

  // If the collapsing state from props changed, probably a navigation event
  // occurred. Overwrite the component's collapsed state with the props'
  // collapsed value.
  if (item.collapsed !== prevCollapsedProp) {
    setPreviousCollapsedProp(item.collapsed);
    setCollapsed(item.collapsed);
  }

  const handleItemClick = useCallback((e) => {
    e.preventDefault();
    e.target.blur();
    setCollapsed((state) => !state);
  });

  switch (type) {
    case "category":
      ItemTag = noLink ? "span" : "a";

      return (
        items.length > 0 && (
          <WithBackgroundImage
            className={classnames(
              styles.menuListItem,
              styles.listItem,
              styles.category,
              ...getClasses(iconClasses),
              {
                "menu__list-item--collapsed": collapsed,
                [styles.withBackgroundImage]: icon,
              }
            )}
            key={sidebarLabel}
            tag="li"
            imageDark={iconDark}
            imageDarkHover={iconDarkHover}
            imageLight={icon}
            imageLightHover={iconHover}
          >
            <ul
              className={classnames(styles.menuList, ...getClasses(classNames))}
            >
              <li className={styles.categoryTitle}>
                <ItemTag
                  className={classnames(styles.menuLink, {
                    "menu__link--sublist": collapsible,
                    "menu__link--active": collapsible && !item.collapsed,
                  })}
                  onClick={collapsible ? handleItemClick : undefined}
                  {...props}
                >
                  {sidebarLabel}
                </ItemTag>
              </li>
              {items.map((childItem) => (
                <DocSidebarItem
                  key={childItem.label}
                  item={childItem}
                  onItemClick={onItemClick}
                  collapsible={collapsible}
                  theme={itemTheme}
                />
              ))}
            </ul>
          </WithBackgroundImage>
        )
      );

    case "link":
    default:
      ItemTag = noLink ? "span" : Link;
      let linkProps = {};
      if (isInternalUrl(href) && !noLink) {
        linkProps = {
          isNavLink: true,
          activeClassName: styles.active,
          exact: true,
          onClick: onItemClick,
        };
      } else if (!noLink) {
        linkProps = {
          target: "_blank",
          rel: "noreferrer noopener",
        };
      }

      return (
        <li
          className={classnames(
            "menu__list-item",
            styles.listItem,
            ...getClasses(classNames)
          )}
          key={sidebarLabel}
        >
          <WithBackgroundImage
            className={classnames(styles.menuLink, ...getClasses(iconClasses), {
              [styles.withBackgroundImage]: icon,
            })}
            imageDark={iconDark}
            imageDarkHover={iconDarkHover}
            imageLight={icon}
            imageLightHover={iconHover}
            tag={ItemTag}
            to={href}
            {...linkProps}
            {...props}
          >
            <span>{sidebarLabel}</span>
          </WithBackgroundImage>
        </li>
      );
  }
}

// Calculate the category collapsing state when a page navigation occurs.
// We want to automatically expand the categories which contains the current page.
function mutateSidebarCollapsingState(item, path) {
  const { items, href, type } = item;
  switch (type) {
    case "category": {
      const anyChildItemsActive =
        items
          .map((childItem) => mutateSidebarCollapsingState(childItem, path))
          .filter((val) => val).length > 0;
      // eslint-disable-next-line no-param-reassign
      item.collapsed = !anyChildItemsActive;
      return anyChildItemsActive;
    }

    case "link":
    default:
      return href === path;
  }
}

function DocSidebar(props) {
  const [showResponsiveSidebar, setShowResponsiveSidebar] = useState(false);
  const [isSearchBarExpanded, setIsSearchBarExpanded] = useState(false);
  const {
    siteConfig: {
      themeConfig: { navbar: { title, hideOnScroll = false } = {} },
    } = {},
    isClient,
  } = useDocusaurusContext();

  const { sidebar, path, sidebar: currentSidebar, sidebarCollapsible } = props;

  useLockBodyScroll(showResponsiveSidebar);

  if (!currentSidebar) {
    return null;
  }

  const sidebarData = sidebar;

  if (!sidebarData) {
    throw new Error(
      `Cannot find the sidebar "${currentSidebar}" in the sidebar config!`
    );
  }

  if (sidebarCollapsible) {
    sidebarData.forEach((sidebarItem) =>
      mutateSidebarCollapsingState(sidebarItem, path)
    );
  }

  return (
    <nav
      aria-label="intra-site navigation"
      className={styles.sidebar}
      id="intra-site-navigation"
    >
      <div
        className={classnames("menu", "menu--responsive", styles.menu, {
          "menu--show": showResponsiveSidebar,
        })}
      >
        <button
          aria-label={showResponsiveSidebar ? "Close Menu" : "Open Menu"}
          aria-haspopup="true"
          className="button button--secondary button--sm menu__button"
          type="button"
          onClick={() => {
            setShowResponsiveSidebar(!showResponsiveSidebar);
          }}
        >
          {showResponsiveSidebar ? (
            <span
              className={classnames(
                styles.sidebarMenuIcon,
                styles.sidebarMenuCloseIcon
              )}
            >
              &times;
            </span>
          ) : (
            <svg
              aria-label="Menu"
              className={styles.sidebarMenuIcon}
              xmlns="http://www.w3.org/2000/svg"
              height={MOBILE_TOGGLE_SIZE}
              width={MOBILE_TOGGLE_SIZE}
              viewBox="0 0 32 32"
              role="img"
              focusable="false"
            >
              <title>Menu</title>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="2"
                d="M4 7h22M4 15h22M4 23h22"
              />
            </svg>
          )}
        </button>
        <ul className={classnames(styles.menuList, styles.topLevel)}>
          <SearchBar
            handleSearchBarToggle={setIsSearchBarExpanded}
            isSearchBarExpanded={isSearchBarExpanded}
          />
          {sidebarData.map((item) => (
            <DocSidebarItem
              key={item.label}
              item={item}
              onItemClick={(e) => {
                e.target.blur();
                scrollToTop();
                setShowResponsiveSidebar(false);
              }}
              collapsible={sidebarCollapsible}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default DocSidebar;
