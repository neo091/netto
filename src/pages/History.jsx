import Footer from "../components/Footer"
import Header from "../components/Header"
import ExportToCVSButton from "../components/ExportCVSButton"
import Paginador from "../components/Paginador"
import SkeletonHistoryItem from "../components/SkeletonHistoryItem"
import HistoryList from "../components/HistoryList"
import Layout from "../layouts/Layout"
import FilterSection from "../components/history/FilterSection"
import SummarySection from "../components/history/SummarySection"
import { useHistory } from "../hooks/useHistory"
import { useConfig } from "../context/config/useConfig"
import HistoryHeader from "../components/history/HistoryHeader"
import HistoryContent from "../components/history/HistoryContent"
import HistoryPagination from "../components/history/HistoryPagination"

const History = () => {

  const { currency } = useConfig()

  const history = useHistory()

  return (
    <>
      <Layout>
        <Header backspace />
        <div className="flex-1 flex flex-col gap-2 py-2">
          <SummarySection stats={history.stats} filter={history.filter} />
          <HistoryHeader filter={history.filter} historyList={history.historyList} />
          <FilterSection onChange={history.changeFilter} filter={history.filter} />
          <HistoryContent
            currency={currency}
            handleDelete={history.handleDelete}
            historyList={history.historyList}
            loading={history.loading}
          />
          <HistoryPagination {...history} />
        </div>
        <Footer />
      </Layout>
    </>
  )
}

export default History
