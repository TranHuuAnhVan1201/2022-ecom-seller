import React from 'react'
import { Helmet } from 'react-helmet'

const metaDecorator = require('./metaDecorator.json')

const MetaDecorator = ({ description, title, imageUrl, imageAlt }) => {
  // console.log(imageUrl)
  return (
    <Helmet>
      <title>{title || 'Newee - Home'}</title>
      <meta name="robots" content="all" data-rh="true" />
      <meta property="og:title" content={title || 'Newee - Home 4'} data-react-helmet="true" />
      <meta property="title" content={title || 'Newee - Home 4'} data-react-helmet="true" />
      <meta
        property="og:description"
        content={description || 'Newee - Best Products for your pet'}
        data-react-helmet="true"
      />
      <meta
        property="og:image"
        content={imageUrl || 'https://api.newee.asia:8001/Photos/Product/637637952221201153.jpg'}
        data-react-helmet="true"
      />
      <meta property="og:url" content="https://testseller.newee.asia" />
      <meta property="og:site_name" content="Newee - Home - site-name" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="article" />

      <meta name="title" content={title || 'Newee - Home 4'} />
      <meta
        name="description"
        content={description || 'Newee - Best Products for your pet 123'}
        data-react-helmet="true"
      />
    </Helmet>
  )
}

export default MetaDecorator
