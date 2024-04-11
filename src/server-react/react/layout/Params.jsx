import React from 'react';
import Link from '../components/ui/Link';

import './_params.scss';

const Params = ({ cg, lb, newItem }) => {
  const analitics = () => {
    const socket = new WebSocket("ws://localhost:3000/analitics");

    socket.addEventListener("open", (event) => {
      socket.send("Соединение с сервером установлено!");
    });

    socket.addEventListener("message", (event) => {
      console.log("Сообщение от сервера: ", event.data);

      const mes = JSON.parse(event.data);

      if (mes.type === 'end') socket.close();
    });

    socket.addEventListener("close", (event) => {
      console.log("Соединение с сервером закрыто!");
    });
  }

  const scraping = () => {
    const socket = new WebSocket("ws://localhost:3000/scraping");

    socket.addEventListener("open", (event) => {
      socket.send("Соединение с сервером установлено!");
    });

    socket.addEventListener("message", (event) => {
      console.log("Сообщение от сервера: ", event.data);

      const mes = JSON.parse(event.data);

      if (mes.type === 'end') socket.close();
    });

    socket.addEventListener("close", (event) => {
      console.log("Соединение с сервером закрыто!");
    });
  }

  return (
    <section className="params">
      <div className="h2">Запросы по конкретным магазинам:</div>

      <div className="params-nav">
        <b>Запрос для читай-города: </b>
        {
          cg.map((link, idx) => {
            return <Link
              { ...link }
              key = { idx }
            />
          })
        }
      </div>
      <div className="params-nav">
        <b>Запрос для лабирита: </b>
        {
          lb.map((link, idx) => {
            return <Link
              { ...link }
              key = { idx }
            />
          })
        }
      </div>
      <div className="params-nav">
        <h2>Новые товары:</h2>
        <b>
          <Link
            url="/new"
            title="Новые товары по всем запросам"
          />
        </b>
        {
          newItem.map((link, idx) => {
            return <Link
              { ...link }
              key = { idx }
            />
          })
        }
      </div>
      
      <button onClick = { scraping }>
        Скрапинг интернет-магазинов
      </button>
      <button onClick = { analitics }>
        Анализировать
      </button>
    </section>
  )
}

export default Params;