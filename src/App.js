import Todo from "./components/Todo/Todo";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="md:bg-bg-desk min-h-screen bg-background bg-hero-mobile--light bg-bg-mobile bg-no-repeat px-6 pt-12 dark:bg-hero-mobile--dark md:bg-hero-desktop--light md:dark:bg-hero-desktop--dark">
      <Header title={"Todo"} />
      <Todo />
    </div>
  );
}

export default App;
