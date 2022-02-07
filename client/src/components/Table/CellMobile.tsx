import DataType from './DataType'
import { validateArray } from '../../utils/validation'
import { Datatype } from './DataType'
interface Props {
  cell: Datatype
  id: number
  HandleActivate: (id: number, cell: Datatype) => void
  header: Datatype[]
  activate: number | null
}
const CellMobile = ({ cell, id, HandleActivate, header, activate }: Props) => {
  return (
    <>
      <div className="TableDefault__container">
        <div
          onClick={() => HandleActivate(id, cell)}
          className={`TableDefault__cell ${
            activate === id ? 'TableDefault__cell-activate' : ''
          }`}
        >
          {validateArray(header)
            ? header.map((a, i) => {
                return (
                  <div className="TableDefault__column" key={i}>
                    <h2 className="TableDefault__head">{a.name}</h2>
                    <DataType a={a} key={i} head={cell} />
                  </div>
                )
              })
            : null}
        </div>
      </div>
      <hr />
    </>
  )
}

export default CellMobile
