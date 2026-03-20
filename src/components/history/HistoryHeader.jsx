import React from 'react'
import ExportToCVSButton from '../ExportCVSButton'

function HistoryHeader({ filter, historyList }) {
  return (
    <section className="flex justify-between items-center mb-4 max-w-md mx-auto w-full">
      <h2 className="text-white text-xl font-bold">Historial</h2>
      <ExportToCVSButton filter={filter} historyList={historyList} />
    </section>
  )
}

export default HistoryHeader