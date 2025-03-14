import {
  ImageRefSchema,
  ThreedRef,
  VideoRefSchema,
} from "@jakubkanna/labguy-front-schema";
import dayjs from "dayjs";
import { Project } from "../../types/Project";

export type MediaRef = ImageRefSchema | VideoRefSchema | ThreedRef | null;

function isVideo(media: MediaRef | null): media is VideoRefSchema {
  return media?.mediaType === "VIDEO";
}
function isImage(media: MediaRef | null): media is ImageRefSchema {
  return media?.mediaType === "IMAGE";
}
function is3d(media: MediaRef | null): media is ThreedRef {
  return media?.mediaType === "THREE_D";
}
function isUpcoming(project: Project) {
  if (!project.start_date) return true;

  const currentDate = new Date();

  const { year = 0, month = 0, day = 0, time = "00:00" } = project.start_date;

  const [hours, minutes] = time.split(":").map(Number);

  const projectStartDate = new Date(year, month, day, hours || 0, minutes || 0);

  return projectStartDate > currentDate;
}

function isCurrent(project: Project) {
  // Ensure project.start_date is defined
  if (!project.start_date) return false;

  const currentDate = new Date();

  const { year = 0, month = 0, day = 0 } = project.start_date;

  // Create a date object for the project's start date
  const projectStartDate = new Date(year, month, day);

  // Get the current year and month
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Check if the project is happening in the current month and year
  return (
    projectStartDate.getFullYear() === currentYear &&
    projectStartDate.getMonth() === currentMonth
  );
}

function parseDate(dateObj: { [k: string]: unknown } | null | undefined) {
  if (!dateObj) return "";

  const { year, month, day, time } = dateObj;

  return `${
    day
      ? dayjs()
          .set("date", day as number)
          .format("dddd") + ", "
      : ""
  }
  ${
    month
      ? dayjs()
          .set("month", month as number)
          .format("MMMM")
      : ""
  } ${year ? year : ""}${time ? ", " + time : ""}`;
}

const isLastItem = (index: number, arrayLength: number) =>
  index === arrayLength - 1;

let usedColors: string[] = [];

const getRitasColor = () => {
  const colors = ["#6D9AF1", "#7FD9E0", "#7F7EB0", "#DCDAE6", "#CBD0BC"];

  // Filter out the last 5 used colors
  const availableColors = colors.filter((color) => !usedColors.includes(color));

  // If no colors are available, reset the usedColors and allow all colors to be used again
  if (availableColors.length === 0) {
    usedColors = []; // Reset the used colors
    availableColors.push(...colors); // Reintroduce all colors back to availableColors
  }

  // Pick a random color from the available options
  const randomIndex = Math.floor(Math.random() * availableColors.length);
  const selectedColor = availableColors[randomIndex];

  // Add the selected color to the usedColors array
  usedColors.push(selectedColor);

  // Keep only the last 5 used colors
  if (usedColors.length > 5) {
    usedColors.shift(); // Remove the oldest used color
  }

  return selectedColor;
};

export {
  isVideo,
  isImage,
  isUpcoming,
  isCurrent,
  parseDate,
  is3d,
  isLastItem,
  getRitasColor,
};
