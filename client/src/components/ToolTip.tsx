import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import 'tippy.js/animations/scale.css'
interface Props {
  children: any
  content: string
  interactive?: boolean
  /* trigger */
  placement?:'top'|'bottom'|'left'|'right'
}
const ToolTip = ({
  children,
  content,
  interactive = false,
  /* trigger, */
  placement,
}: Props) => {
  return (
    <Tippy
      animation="scale"
      /* trigger={trigger ? trigger : 'mouseenter focus'} */
      placement={placement ? placement : 'top'}
      interactive={interactive ? true : false}
      
      content={
        <span
          style={{
            fontSize: '1.2rem',
            /* fontWeight: '500', */
            color: 'var(--primary-color)',
            
          }}
        >
          {content}
        </span>
      }
      theme="light"
    >
      {children}
    </Tippy>
  )
}

export default ToolTip
