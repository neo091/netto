import HistoryList from '../HistoryList'
import SkeletonHistoryItem from '../SkeletonHistoryItem'

function HistoryContent({ historyList, handleDelete, currency, loading }) {

  if (loading) return <HistoryLoading />

  if (historyList.length === 0) return <HistoryEmpty />


  return (
    <section className="max-w-md mx-auto w-full space-y-2">
      <HistoryList
        historyList={historyList}
        handleDelete={handleDelete}
        currency={currency}
      />
    </section>
  )
}

const HistoryEmpty = () => {
  return (
    <section className="max-w-md mx-auto w-full space-y-2">
      <div className="text-center text-gray-500 py-20 bg-gray-800/20 rounded-3xl border border-dashed border-gray-700">
        <p>No hay viajes registrados</p>
      </div>
    </section>

  )
}

const HistoryLoading = () => {
  return (
    <section className="max-w-md mx-auto w-full space-y-2">
      {
        Array.from({ length: 3 }).map((_, i) => (
          <SkeletonHistoryItem key={i} />))
      }
    </section>
  )

}
export default HistoryContent