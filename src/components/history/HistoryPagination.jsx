import { useEffect, useCallback } from 'react'
import Paginador from '../Paginador'

function HistoryPagination(props) {
  const { page, totalPages, goPage, prevPage, nextPage } = props

  // Manejar cambios en totalPages
  useEffect(() => {
    // Si no hay páginas, ir a página 0
    if (totalPages <= 0) {
      if (page !== 0) {
        goPage(0)
      }
      return
    }

    // Si la página actual es mayor o igual al total de páginas
    if (page >= totalPages) {
      const lastPage = totalPages - 1
      goPage(lastPage)
    }
  }, [totalPages, page, goPage])

  // Si no hay páginas, no mostrar el paginador
  if (totalPages <= 0) {
    return null
  }

  return (
    <section className="p-4 max-w-md mx-auto w-full">
      <Paginador
        page={page}
        totalPages={totalPages}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </section>
  )
}

export default HistoryPagination