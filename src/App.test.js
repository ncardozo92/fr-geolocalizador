import { render, fireEvent, waitFor, screen, findByText } from '@testing-library/react';
import axios from 'axios';
import App from './App';

let axiosMock;

beforeEach(() => {
  axiosMock = jest.spyOn(axios, "get");
});

test("Consultamos exitosamente una IP", async () => {

  const container = render(<App/>).container;
  
  const ipInput = container.querySelector("#ip");
  const submitButton = container.querySelector("#submit"); 

  axiosMock.mockImplementation(() => Promise.resolve({
    "status": 200,
    "data": {
      "ip": "127.0.0.1",
      "country_code": "BR",
      "country_name": "Brasil",
      "distance": 2046,
      "languages": [
          {
              "code": "pt",
              "name": "Portuguese"
          }
      ],
      "date": "2021-11-01T21:11:27.297290700"
    }
  }));

  ipInput.setAttribute("value", "127.0.0.1");
  fireEvent(ipInput, new InputEvent("change"));
  fireEvent(submitButton, new MouseEvent("click"));

  await waitFor(() => {
    expect(axiosMock).toHaveBeenCalled();
  });

  const ipLabel = await screen.findByText("IP: 127.0.0.1");
  const dateLabel = await screen.findByText("Fecha: 2021-11-01T21:11:27.297290700");
  const countryLabel = await screen.findByText("País: Brasil, ISO code: BR");
  const distanceLabel = await screen.findByText("Distancia entre Buenos Aires (aprox.): 2046");
  
  expect(ipLabel).toBeInTheDocument();
  expect(dateLabel).toBeInTheDocument();
  expect(countryLabel).toBeInTheDocument();
  expect(distanceLabel).toBeInTheDocument();
});

test("Consultamos la ip pero recibimos un status code 502", async () =>{

  const container = render(<App/>).container;
  
  const ipInput = container.querySelector("#ip");
  const submitButton = container.querySelector("#submit"); 

  axiosMock.mockImplementation(() => Promise.resolve({status: 502}));

  ipInput.setAttribute("value", "127.0.0.1");
  fireEvent(ipInput, new InputEvent("change"));
  fireEvent(submitButton, new MouseEvent("click"));

  await waitFor(() => {
    expect(axiosMock).toHaveBeenCalled();
  });

  const alert = await screen.findByRole("alert");
  expect(alert).toBeInTheDocument();
});

