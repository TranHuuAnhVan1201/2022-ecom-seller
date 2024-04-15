import PropTypes from 'prop-types'
import React from 'react'
import { Helmet } from 'react-helmet'

// const metaDecorator = require("../../data/metaDecorator.json");
// var hostname = "https://seller.newee.asia";

var metaDecorator = {
  hostname: 'https://seller.newee.asia',
  twitterUsername: '@neweeasia',
}
const MetaDecorator = ({ title, description, imageUrl, imageAlt, imageUri }) => (
  <Helmet>
    <title>{title}</title>
    <meta property="og:title" content={title} />
    <meta name="description" content={description} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={imageUri || metaDecorator.hostname + imageUrl} />
    <meta
      property="og:url"
      content={
        imageUri || metaDecorator.hostname + window.location.pathname + window.location.search
      }
    />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image:alt" content={imageAlt} />
    <meta name="twitter:site" content={metaDecorator.twitterUsername} />
  </Helmet>
)

MetaDecorator.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
}

export default MetaDecorator
