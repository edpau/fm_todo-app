import ThemeToggle from "../ThemeToggle/ThemeToggle";

export default function Header({ title }) {
  return (
    <header className="mx-auto max-w-[541px] pl-[0.125rem] text-[1.6rem] font-bold leading-none tracking-[0.75rem]">
      <div className="flex justify-between">
        <h1 className="text-heading text- md:text-[2.5rem]">{title.toUpperCase()}</h1>
        <ThemeToggle />
      </div>
    </header>
  );
}
