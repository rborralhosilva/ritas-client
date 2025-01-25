import { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export default function Menu() {
  const [activeSection, setActiveSection] = useState<string>("");
  const location = useLocation();

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

  return (
    <div
      id="menu"
      className="position-fixed end-0 top-50 translate-middle-y m-2 z-3"
    >
      <ListGroup variant="rita">
        <ListGroupItem active={activeSection === "home"}>
          <Link to="/">Home</Link>
        </ListGroupItem>
        <ListGroupItem active={activeSection === "bio"}>
          <Link to="bio">Bio</Link>
        </ListGroupItem>
        <ListGroupItem active={activeSection === "works"}>
          <Link to="works">Works</Link>
        </ListGroupItem>
        <ListGroupItem active={activeSection === "contact"}>
          <Link to="contact">Contact</Link>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
