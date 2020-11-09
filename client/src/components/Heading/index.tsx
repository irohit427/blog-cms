import React from 'react'

const Heading = (props: any) => {
  const { text, size, weight} = props;
  const style = {
    fontSize: size+'px',
    fontWeight: weight,
  }

  return (
    <div className="heading">
      <p style={style}>{text}</p>
    </div>
  )
}

export default Heading;
