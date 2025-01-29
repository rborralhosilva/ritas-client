import { ProfileSchema } from "@jakubkanna/labguy-front-schema";
import { useFetchData } from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "react-bootstrap-icons";
import SectionModal from "../SectionModal";

export default function BioSec() {
  const { data } = useFetchData<ProfileSchema>("profile/1");

  if (!data) return null;

  const { statement } = data;
  const maxLength = 150;

  // Convert HTML to plain text using a DOM parser
  const convertHtmlToText = (html: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const textStatement = statement ? convertHtmlToText(statement) : "";

  // Truncate text
  const truncatedStatement =
    textStatement.length > maxLength
      ? `${textStatement.slice(0, maxLength)}...`
      : textStatement;

  //

  return (
    <div>
      <SectionModal />
      <div id="Statement" className="text-center fs-2">
        <p>{truncatedStatement}</p>
        <Link to={"#bio"} className="fs-4 mt-5">
          Read more <ArrowUpRight />
        </Link>
      </div>
    </div>
  );
}
