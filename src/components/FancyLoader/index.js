import React from 'react'
import styles from './styles.css'

export default class FancyLoader extends React.Component {
  render() {
    const { num = 1 } = this.props
    return (
      <div className="loader">
        <div className="loader__bar" />
        {Array(num - 1)
          .fill()
          .filter(Boolean)
          .map((_, index) => {
            return <div key={index} className={`loader__bar loader__bar--delay-${index}`} />
          })}
      </div>
    )
  }
}
