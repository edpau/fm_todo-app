
import ThemeToggle from "../ThemeToggle/ThemeToggle";

export default function Header({ title }) {
  return (
    <header className="font-bold text-[1.6rem] tracking-[0.75rem] pl-[0.125rem] flex justify-between leading-none ">
      <h1 className="text-heading">{title.toUpperCase()}</h1>
      <ThemeToggle />
    </header>
  );
}
