import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';

let axiosMock;

beforeEach(() => {
  axiosMock = jest.spyOn(axios, "get");
});

test("Consultamos exitosamente una IP",() => {

  const container = render(<App/>).container;
  
  const ipInput = container.querySelector("#ip");
  const submitButton = container.querySelector("#submit"); 

  axiosMock.mockImplementation(() => Promise.resolve({
    "status": 200,
    "data": {
      "ip": "127.0.0.1",
      "country_code": "BR",
      "country_name": "Brasil",
      "distance": 2046.0,
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

  waitFor(() => {
    expect(axiosMock).toHaveBeenCalled();
    expect(container.querySelector(".results")).toBeInTheDocument();
    expect(container.querySelector(".ip")).toBeInTheDocument();
    expect(container.querySelector(".date")).toBeInTheDocument();
    expect(container.querySelector(".country")).toBeInTheDocument();
    expect(container.querySelector(".distance")).toBeInTheDocument();
    expect(container.querySelector(".language").length).toBe(1);
    expect(container.querySelector("ErrorAlert")).not.toBeInTheDocument();
  });
  
});

test("Consultamos la ip pero recibimos un status code 502",() =>{

  const container = render(<App/>).container;
  
  const ipInput = container.querySelector("#ip");
  const submitButton = container.querySelector("#submit"); 

  axiosMock.mockImplementation(() => Promise.resolve({status: 502}));

  ipInput.setAttribute("value", "127.0.0.1");
  fireEvent(ipInput, new InputEvent("change"));
  fireEvent(submitButton, new MouseEvent("click"));

  waitFor(() => {
    expect(axiosMock).toHaveBeenCalled();
    expect(container.querySelector("ErrorAlert")).toBeInTheDocument();
  });
});

