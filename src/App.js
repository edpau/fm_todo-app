import Todo from "./components/Todo/Todo";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="bg-hero-mobile--light dark:bg-hero-mobile--dark min-h-screen bg-contain bg-no-repeat px-6 pt-12 bg-background">
      <Header title={"Todo"} />
      <Todo />
    </div>
  );
}

export default App;
