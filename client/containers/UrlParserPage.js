import React from 'react'
import UrlForm from '../components/UrlForm'
import UrlMetaInfo from '../components/UrlMetaInfo'

import { girdle } from '../utils/index'

const styles = girdle({
  linkParserContainer: {
    width: '50%',
    height: '50%',
    margin: 'auto',
    backgroundColor: '#ddd',
    borderRadius: '5px'
  }
})


export default function UrlParserPage() {

  return (
    <div {...styles.linkParserContainer()}>
      <div>
        <UrlForm/>
      </div>
      <div>
        <UrlMetaInfo/>
      </div>
    </div>
  )

}
