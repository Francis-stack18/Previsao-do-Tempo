import { useState } from "react";

function App() {
  const [city, setCity] = useState("São Paulo");
  const [weatherForecast, setWeatherForecast] = useState(null);
  const handleChange = (e) => {
    setCity(e.target.value);
    console.log("sda");
  };
  const handleSearch = (e) => {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=878f2e29c7e34e2faf4124924232202&q=${city}&lang=pt`
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        setWeatherForecast(data);
      });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-5">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2649/2649783.png"
          width="45px"
          height="45px"
          className="ms-4 p-1"
        />
        <a className="navbar-brand text-white" href="#top">
          Previsão do tempo
        </a>
      </nav>

      <main className="container">
        <div className="shadow p-5 mb-5 bg-body-tertiary rounded">
          <h1>Verifique agora a previsão do tempo da sua cidade</h1>
          <p className="lead">
            Digite o nome da sua cidade abaixo e em seguida clique em pesquisar
          </p>
          <div className="row mb-4">
            <div className="col-md-6">
              <input
                onChange={handleChange}
                className="form-control"
                value={city}
              />
            </div>
          </div>
          <div>
            <button
              className="btn btn-lg border border-secondary border-2 animate-animated animate-bounce"
              onClick={handleSearch}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/58/58427.png"
                width="23px"
                height="23px"
                className="me-1"
              ></img>
              Pesquisar
            </button>
          </div>
          {weatherForecast ? (
            <div>
              <div className="mt-4 d-flex align-items-center">
                <div>
                  <img
                    className="img-fluid p-2"
                    src={weatherForecast.current.condition.icon}
                  />
                </div>
                <div>
                  <h3>
                    O dia se econtra hoje:{" "}
                    {weatherForecast.current.condition.text}
                  </h3>
                  <p className="lead">
                    Temperatura: {weatherForecast.current.temp_c}°C
                  </p>
                  <p>Atualizado em: {weatherForecast.current.last_updated}</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default App;
