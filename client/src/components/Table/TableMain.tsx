import './TableDefault.css'
import { useState } from 'react'

import CellMobile from './CellMobile'
import DataType from './DataType'
import { validateArray } from '../../utils/validation'
import { Datatype } from './DataType'
import { useWindowDimensions } from '../../hooks/useWindowsDimentions'
interface Props {
  header: Datatype[]
  reload: () => void
  main: []
  handleInfo: (index: number, us: any) => void
  keyOrder: string
}
const TableMain = ({
  header,
  main,
  handleInfo,
  reload,
  keyOrder = '',
}: Props) => {
  const {
    windowDimensions: { width },
  } = useWindowDimensions()
  const gridTable = { gridTemplate: `auto / repeat(${header.length}, 1fr)` }
  const [activate, setactivate] = useState<number | null>(null)
  const limitSize = 425
  function HandleActivate(index: number, us: any) {
    setactivate(index)
    if (handleInfo) {
      handleInfo(us, reload)
    }
  }
  function TableFordesk() {
    return (
      <>
        <div className="TableDefault__header" style={gridTable}>
          {validateArray(header)
            ? header.map((a, i) => (
                <h2 key={i} className="TableDefault__head">
                  {a.name}
                </h2>
              ))
            : null}
        </div>
        <div className="TableDefault__main">
          {validateArray(main)
            ? main
                .sort((a, b) => a[keyOrder] - b[keyOrder])
                .map((head, i) => (
                  <div
                    key={i}
                    style={gridTable}
                    onClick={() => HandleActivate(i, head)}
                    className={`TableDefault__cell ${
                      activate === i ? 'TableDefault__cell-activate' : ''
                    }`}
                  >
                    {validateArray(header)
                      ? header.map((a, i) => (
                          <>
                            <DataType a={a} key={i} head={head} />
                          </>
                        ))
                      : null}
                  </div>
                ))
            : null}
        </div>
      </>
    )
  }

  function TableForMobile() {
    return (
      <>
        {validateArray(main)
          ? main.map((head, i) => {
              return (
                <CellMobile
                  key={i}
                  id={i}
                  cell={head}
                  header={header}
                  HandleActivate={HandleActivate}
                  activate={activate}
                />
              )
            })
          : null}
      </>
    )
  }
  return (
    <div className="TableDefault">
      {width > limitSize ? <TableFordesk /> : <TableForMobile />}
    </div>
  )
}
export default TableMain
