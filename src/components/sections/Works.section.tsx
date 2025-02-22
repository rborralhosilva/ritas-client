import { useRef } from "react";
import { Work } from "../../../types/Work";
import { useFetchData } from "../../hooks/useFetch";
import { useDraggable } from "react-use-draggable-scroll";
import WorkCard from "../WorkCard";
import Works from "../../pages/Works";
import SectionModal from "../SectionModal";

export default function WorksSecContent() {
  const { data } = useFetchData<Work[]>("works?unique=true");

  const limitedData = data?.slice(0, 10) || [];
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  return (
    <div
      className="position-relative d-flex flex-nowrap w-100 h-100"
      {...events}
      ref={ref}
      style={{
        overflowX: "scroll",
        scrollbarWidth: "none",
        cursor: "auto",
        userSelect: "none",
      }}
    >
      <SectionModal path="#works">
        <Works data={data} />
      </SectionModal>
      {limitedData.map(
        (work) =>
          work.general.published && <WorkCard key={work.id} work={work} />
      )}
    </div>
  );
}
