import { useState, useEffect, useContext } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import useIsMobile from "../../hooks/useIsMobile";
import MenuMobile from "./MenuMobile";
import { GeneralContext } from "../../contexts/GeneralContext";
import { UrlSchema } from "@jakubkanna/labguy-front-schema";
export interface MenuItem {
  to: string;
  label: string;
  id: string;
  blank?: boolean;
}

export default function Menu() {
  const [activeSection, setActiveSection] = useState<string>("");
  const location = useLocation();
  const isMobile = useIsMobile();
  const { preferences } = useContext(GeneralContext);

  useEffect(() => {
    const options = {
      rootMargin: "0px", // Trigger when the section is in the viewport
      threshold: 0.5, // 50% of the section should be visible
    };

    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Set the active section based on the section's id
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    // Get all the sections to observe
    const sections = document.querySelectorAll("section");

    // Start observing each section
    sections.forEach((section) => observer.observe(section));

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, [location.pathname]); // Trigger when location.pathname changes (on route change)

  useEffect(() => {
    // Set the active section based on the current pathname on initial load
    if (location.pathname === "/") {
      setActiveSection("home");
    } else if (location.pathname === "/works") {
      setActiveSection("works");
    } else if (location.pathname === "/bio") {
      setActiveSection("bio");
    } else if (location.pathname === "/contact") {
      setActiveSection("contact");
    }
  }, [location.pathname]); // Dependency on location.pathname to set active section on route change

  if (!preferences) return;

  const { homepage_urls } = preferences;

  const dynamicItems: MenuItem[] = (homepage_urls as UrlSchema[]).map(
    (url) => ({
      to: url.url,
      label: url.title,
      id: url.title.toLowerCase().replace(/\s+/g, "-"),
      blank: true,
    })
  );

  const menuItems: MenuItem[] = [
    { to: "/#home", label: "Home", id: "home" },
    { to: "/#bio", label: "Bio", id: "bio" },
    { to: "/#works", label: "Works", id: "works" },
    { to: "/#contact", label: "Contact", id: "contact" },
    ...dynamicItems,
  ];

  return isMobile ? (
    <MenuMobile activeSection={activeSection} items={menuItems} />
  ) : (
    <div
      id="menu"
      className={"position-fixed end-0 top-50 translate-middle-y m-2 z-3"}
    >
      <ListGroup variant="rita">
        {menuItems.map((item) => (
          <ListGroupItem key={item.id} active={activeSection === item.id}>
            <Link to={item.to} target={item.blank ? "_blank" : ""}>
              {item.label}
            </Link>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
