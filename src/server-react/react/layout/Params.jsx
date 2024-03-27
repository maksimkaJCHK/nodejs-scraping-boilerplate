import React from 'react';
import Link from '../components/ui/Link';

import './_params.scss';

const Params = ({ cg, lb, newItem }) => {
  return (
    <section className="params">
      <div className="h2">Запросы по конкретным магазинам:</div>

      <div className="params-nav">
        <b>Запрос для читай-города: </b>
        {
          cg.map((link, idx) => {
            return <Link { ...link } key = { idx } />
          })
        }
      </div>
      <div className="params-nav">
        <b>Запрос для лабирита: </b>
        {
          lb.map((link, idx) => {
            return <Link { ...link } key = { idx } />
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
            return <Link { ...link } key = { idx } />
          })
        }
      </div>
    </section>
  )
}

export default Params;