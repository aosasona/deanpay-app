import Head from 'next/head'

const Meta = ({ title, keywords, desc }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta name="description" content={desc}/>
      <meta name="keywords" content={keywords}/>
      <link rel="icon" type="image/x-icon" href="/img/favicon.png"/>

     <meta property="og:type" content="website"/>
     <meta property="og:url" content="https://app.deanpay.com"/>
     <meta property="og:title" content={title}/>
     <meta property="og:description" content={desc}/>
     <meta property="og:image" content="/img/Dark.png"/>

     <meta property="twitter:card" content="summary_large_image"/>
     <meta property="twitter:url" content="https://app.deanpay.com"/>
     <meta property="twitter:title" content={title}/>
     <meta property="twitter:description" content={desc}/>
     <meta property="twitter:image" content="/img/Dark.png"/>

     <meta property="og:site_name" content="DeanPay"/>
     <meta property="og:site" content="https://app.deanpay.com"/>
     <meta property="og:title" content={title}/>
     <meta property="og:description" content={desc}/>
     <meta property="og:image" content="/img/Dark.png"/>
     <meta property="og:url" content="https://deanpay.com" />
      <title>{title}</title>
    </Head>
  )
}

Meta.defaultProps = {
  title : "DeanPay - 1.5% Cashback On Every Purchase!",
  keywords : "deanpay, deanpay, buy, airtime, dean, pay, dean pay, wallet, ayodeji, osasona",
  desc :"Purchase mobile data and airtime easily"
}

export default Meta