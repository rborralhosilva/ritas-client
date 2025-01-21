interface SectionProps {
  id: string;
  children?: React.ReactNode;
}

export default function Section({ id, children }: SectionProps) {
  return <section id={id}>{children}</section>;
}
