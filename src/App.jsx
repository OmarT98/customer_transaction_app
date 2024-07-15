import TransactionList from "./components/TransactionList";
import TransactionChart from "./components/TransactionChart";

function App() {
  return (
    <div className="App">
      <h1 className="text-4xl m-4 grid justify-items-center">
        Customer and Transaction App
      </h1>
      <TransactionList />
      <TransactionChart />
    </div>
  );
}

export default App;
