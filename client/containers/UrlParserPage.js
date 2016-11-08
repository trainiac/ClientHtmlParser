import React from 'react'
import UrlForm from '../components/UrlForm'
import UrlMetaInfo from '../components/UrlMetaInfo'

import { girdle } from '../utils/index'

const styles = girdle({
  linkParserContainer: {
    width: '80%',
    minWidth: 200,
    minHeight: '50%',
    margin: '50px auto'
  }
})


export default function UrlParserPage() {

  return (
    <div {...styles.linkParserContainer()}>
      <UrlForm/>
      <UrlMetaInfo/>
    </div>
  )

}
