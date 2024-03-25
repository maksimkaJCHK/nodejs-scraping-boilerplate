import React from 'react';
import Link from '../components/ui/Link';

const Params = ({ ch, lb, newItem }) => {
  return (
    <section className="params">
      <div className="h2">Запросы по конкретным магазинам:</div>

      <div className="params-nav">
        <b>Запрос для читай-города: </b>
        {
          ch.map((link) => {
            return <Link { ...link } />
          })
        }
      </div>
      <div className="params-nav">
        <b>Запрос для лабирита: </b>
        {
          lb.map((link) => {
            return <Link { ...link } />
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
          newItem.map((link) => {
            return <Link { ...link } />
          })
        }
      </div>
    </section>
  )
}

export default Params;