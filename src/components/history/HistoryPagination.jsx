import Paginador from '../Paginador'

function HistoryPagination(props) {
  return (
    <section className="p-4 max-w-md mx-auto w-full">
      {/* Paginador Mejorado */}
      {!props.loading && props.totalCount > props.itemsPerPage && (
        <Paginador
          page={props.page}
          totalPages={props.totalPages}
          prevPage={props.prevPage}
          nextPage={props.nextPage}
        />
      )}
    </section>
  )
}

export default HistoryPagination