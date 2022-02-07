/* import { processUrlImage } from '../../utils/ProcessData'
import { convertD } from '../../utils/ConvertDate'
import { urlAvatar } from '../../utils/Constant' */


type TypeEnum =
  | 'img'
  | 'date'
  | 'time'
  | 'a'
  | 'textColor'
  | 'textArea'
  | 'list'
  | 'img'

export interface Datatype {
  key: string
  name: string
  type?: TypeEnum
  color?: string
}
interface Props {
  a: Datatype
  head: Datatype
}

const DataType = ({ a, head }: Props) => {
  switch (a.type) {
    /* case 'img':
      return (
        <img
          src={processUrlImage(head[a.key] ? head[a.key] : urlAvatar, 50)}
          alt="avatar"
        />
      ) */
    case 'a':
      if (head[a.key] === 'N/A') {
        return <div>{head[a.key]}</div>
      } else {
        return (
          <a href={head[a.key]} target="_blank" rel="noopener noreferrer">
            Abrir Archivo
          </a>
        )
      }
    case 'textColor':
      return (
        <div className="TableDefault__textColor">
          <h4
            style={{
              background: `${a.color![head[a.key]]}`,
              color: a.color![head[a.key]] ? '' : 'var(--black)',
            }}
          >
            {head[a.key]}
          </h4>
        </div>
      )
    /* case 'date':
      return <div>{head[a.key] ? convertDate(head[a.key], 'LL') : '--'}</div>

    case 'time':
      return <div>{head[a.key] ? convertDate(head[a.key], 'LT') : '--'}</div>

    case 'levelOption':
      return <div>{head[a.key] ? optionLevel[head[a.key]] : '--'}</div> */

    case 'textArea':
      if (head[a.key]) {
        return (
          <div>
            {head[a.key].substring(0, 100) +
              `${head[a.key].length > 100 ? '...' : ''} `}
          </div>
        )
      } else {
        return <div>--</div>
      }
    case 'list':
      if (head[a.key]) {
        const list = head[a.key].split('; ')
        return (
          <div>
            {list.map((item: any, index: number) => (
              <div
                key={index}
                style={{
                  marginBottom: '5px',
                  border: '1px solid gray',
                  borderRadius: '5px',
                  padding: '2px 5px',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        )
      } else {
        return <div>--</div>
      }
    default:
      return <div>{head[a.key] ? head[a.key] : '--'}</div>
  }
}

export default DataType
